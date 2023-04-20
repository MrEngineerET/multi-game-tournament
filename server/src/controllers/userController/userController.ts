import multer from "multer"
import sharp from "sharp"
import { User, UserType } from "../../model/User"
import { AppError } from "../../utils/AppError"
import factory from "../handleFactory"
import { Request, Response, NextFunction } from "express"

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });
const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

const uploadUserPhoto = upload.single("photo")

interface ERequest extends Request {
  file: any
  user: UserType
}

const resizeUserPhoto = async (
  req: ERequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) return next()

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`)

    next()
  } catch (error) {
    next(error)
  }
}

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

const getMe = (req: ERequest, res: Response, next: NextFunction) => {
  req.params.id = req.user.id
  next()
}

const updateMe = async (req: ERequest, res: Response, next: NextFunction) => {
  try {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          "This route is not for password updates. Please use /updateMyPassword.",
          400,
        ),
      )
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody: any = filterObj(req.body, "firstName", "lastName")
    if (req.file) filteredBody.photo = req.file.filename

    console.log("filteredBody", filteredBody)
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      },
    )

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    })
  } catch (error) {
    next(error)
  }
}

const deleteMe = async (req: ERequest, res: Response, next: NextFunction) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { accountStatus: "inactive" })

    res.status(204).json({
      status: "success",
      data: null,
    })
  } catch (error) {
    next(error)
  }
}

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  })
}

const getUser = factory.getOne(User)
const getAllUsers = factory.getAll(User)

// Do NOT update passwords with this!
const updateUser = factory.updateOne(User)
const deleteUser = factory.deleteOne(User)

export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getMe,
  updateMe,
  deleteMe,
  uploadUserPhoto,
  resizeUserPhoto,
}
