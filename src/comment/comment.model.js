import { Schema, model } from 'mongoose'

const CommentSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: [50, 'Title cannot exceed 50 characters']
        },
        text: {
            type: String,
            required: [true, 'Text is required'],
            maxLength: [200, 'Text cannot exceed 200 characters']
        },
        status: {
            type: Boolean,
            default: true
        },
        publication: {
            type: Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, 'Publication is required']
        },
        user : {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

export default model('Comment', CommentSchema)