import { Schema, model } from 'mongoose'

const PublicationSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: [50, 'Title cannot exceed 50 characters']
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category ID is required']
        },
        text: {
            type: String,
            required: [true, 'Text is required'],
            maxLength: [200, 'Text cannot exceed 200 characters']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

export default model('Publication', PublicationSchema)