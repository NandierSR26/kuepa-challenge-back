import mongoose, { Schema } from 'mongoose';

const UsersSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  rol: {
    type: [String],
    default: ['STUDENT'],
    enum: ['STUDENT', 'MODERATOR']
  },
  online: {
    type: Boolean,
    default: false
  }
});

UsersSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.password;
  },
})

export const UserModel = mongoose.model('User', UsersSchema);