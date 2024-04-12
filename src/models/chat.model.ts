import mongoose, { Schema } from "mongoose";
import { UsersSchema } from "./users.model";

export const ChatSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    required: true,
    validate: {
      validator: function (this: mongoose.SchemaType, value: any) {
        // Verificar si es un array y si todos los elementos son ObjectIds
        if (!Array.isArray(value)) {
          return mongoose.Types.ObjectId.isValid(value);
        }
        return value.every((v: any) => {
          return mongoose.Types.ObjectId.isValid(v);
        });
      },
      message: (props: any) => `${props.value} no es un array válido de ObjectIds`
    }
  },
  text: {
    type: String,
    required: true
  },
  file: {
    type: String
  },
  destination_type: {
    type: String,
    required: true,
    enum: ["USER", "GROUP"]
  }
}, {
  timestamps: true
});


ChatSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
})

export const ChatModel = mongoose.model('Chat', ChatSchema)
const UserModel = mongoose.model('User', UsersSchema)