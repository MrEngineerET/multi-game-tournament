import { AppError } from "../../utils/AppError"
import { User } from "../../model/User"
import jwt, { JwtPayload } from "jsonwebtoken"
import crypto from "crypto"
import { Request, Response, NextFunction } from "express"
import { Email } from "../../utils/email"

export interface RequestWithUser extends Request {
  user: any
}

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id)

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  })

  // Remove password from output
  user.password = undefined

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  })
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      // passwordConfirm: req.body.passwordConfirm,
      accountStatus: "active",
    })

    createSendToken(newUser, 201, req, res)
  } catch (error) {
    next(error)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400))
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password")

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401))
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res)
  } catch (error) {
    next(error)
  }
}

const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({ status: "success" })
}

const protect = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1) Getting token and check of it's there
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt
    }

    if (!token) {
      return next(
        new AppError(
          "You are not logged in! Please log in to get access.",
          401,
        ),
      )
    }

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401,
        ),
      )
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          "User recently changed password! Please log in again.",
          401,
        ),
      )
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser
    res.locals.user = currentUser
    next()
  } catch (error) {
    next(error)
  }
}

// Only for rendered pages, no errors!
const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = jwt.verify(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      ) as JwtPayload

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id)
      if (!currentUser) {
        return next()
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next()
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser
      return next()
    } catch (err) {
      return next()
    }
  }
  next()
}

const restrictTo = (...roles) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      )
    }

    next()
  }
}

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return next(new AppError("There is no user with email address.", 404))
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    // 3) Send it to user's email
    try {
      const resetURL = `${req.protocol}://${req.get(
        "host",
      )}/api/v1/users/resetPassword/${resetToken}`
      await new Email(user, resetURL).sendPasswordReset()

      res.status(200).json({
        status: "success",
        message: "Token sent to email!",
      })
    } catch (err) {
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      await user.save({ validateBeforeSave: false })

      return next(
        new AppError(
          "There was an error sending the email. Try again later!",
          500,
        ),
      )
    }
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex")

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400))
    }
    user.password = req.body.password
    // user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, req, res)
  } catch (error) {
    next(error)
  }
}

const updatePassword = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select("+password")

    // 2) Check if POSTed current password is correct
    if (!req.body.passwordCurrent)
      return next(new AppError("Please provide your current password", 400))
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError("Your current password is wrong.", 401))
    }

    // 3) If so, update password
    user.password = req.body.password
    // user.passwordConfirm = req.body.passwordConfirm
    await user.save()
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    createSendToken(user, 200, req, res)
  } catch (error) {
    next(error)
  }
}

const googleAuth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const credential = req.body.credential
    const decodedData = jwt.decode(credential) as GoogleIdTokenPayload
    if (!decodedData) throw new Error("Invalid Token")
    // verify the request is from google
    if (decodedData.aud !== process.env.GOOGLE_CLIENT_ID)
      throw new Error("Invalid token")
    if (!decodedData.email_verified)
      throw new Error("Your email is not verified")

    const user = await User.findOne({ email: decodedData.email }).select(
      "+password",
    )
    let token
    if (!user) {
      const { email, email_verified, given_name, family_name, picture } =
        decodedData
      if (!email_verified) throw new Error("Unverified email address")
      const newUser = new User({
        firstName: given_name,
        lastName: family_name,
        email,
        images: [picture],
        accountStatus: "active",
      })
      await newUser.save()
      token = signToken(newUser._id)
    } else {
      if (user.password)
        throw new Error("Account is created using email and password")
      token = signToken(user._id)
    }
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    })
    res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`)
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/login?error=${error.message}`)
  }
}

export default {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  protect,
  isLoggedIn,
  restrictTo,
  updatePassword,
  googleAuth,
}

interface GoogleIdTokenPayload {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  at_hash?: string
  name?: string
  picture?: string
  given_name?: string
  family_name?: string
  iat: number
  exp: number
  locale?: string
  [key: string]: any
}
