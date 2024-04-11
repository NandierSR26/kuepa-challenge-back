import mongoose, {Schema} from "mongoose";

const ChatSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    file: {
      type: String
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