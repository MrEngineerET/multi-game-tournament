import mongoose, { Schema, Model, HydratedDocument } from "mongoose"
import bcrypt from "bcryptjs"
import validator from "validator"
import crypto from "crypto"

interface IUser {
  firstName: string
  lastName?: string
  email: string
  password?: string
  passwordConfirm?: string
  phone?: string
  images?: string[]
  role?: "admin" | "user"
  accountStatus?: "active" | "inactive"
  tournaments?: string[]
  createdAt?: Date
  updatedAt?: Date
  passwordChangedAt?: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
}
interface IUserMethods {
  correctPassword: (
    candidatePassword: string,
    userPassword: string,
  ) => Promise<boolean>
  changedPasswordAfter: (JWTTimestamp: number) => boolean
  createPasswordResetToken: () => string
}

type IUserModel = Model<IUser, any, IUserMethods>

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    firstName: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      lowercase: true,
      minlength: 3,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password
        },
        message: "Passwords are not the same!",
      },
    },
    phone: String,
    images: [String],
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    accountStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    tournaments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tournament",
      },
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true },
)

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next()

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)

  // Delete passwordConfirm field
  this.passwordConfirm = undefined
  next()
})

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next()
  this.passwordChangedAt = new Date(Date.now() - 1000)
  next()
})

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ accountStatus: { $ne: false } })
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000 + "", // adding a string might be a bad idea
      10,
    )

    return JWTTimestamp < changedTimestamp
  }

  // False means NOT changed
  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex")

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

export const User = mongoose.model<IUser, IUserModel>("User", userSchema)
export type UserType = HydratedDocument<IUser, IUserMethods>
