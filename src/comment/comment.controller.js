import Comment from './comment.model.js'
import Publication from '../publication/publication.model.js'

export const getComments = async (req, res) => {
    try {
        const idUser = req.user.id
        const comments = await Comment.find({ status: true, user: idUser })
            .populate({
                path: 'publication',
                select: '-_id title text',
                match: { status: true },
                populate: {
                    path: 'user',
                    select: 'username -_id'
                }
            })
            .populate({
                path: 'user',
                select: 'username -_id'
            })

        return res.send({
            success: true,
            message: 'Comments found',
            comments
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error'
        })
    }
}

export const createComment = async(req, res) =>{
    try {
        const user = req.user.id
        const { title, text, publication } = req.body

        const existingPublication = await Publication.findById(publication)
        
        if(!existingPublication){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found'
                }
            )
        }

        const comment = new Comment({ title, text, publication, user })

        await comment.save()

        const populatedComment = await Comment.findById(comment._id)
            .populate({
                path: 'publication',
                select: '-_id title text',
                populate: {
                    path: 'user',
                    select: 'username -_id'
                }
            })
            .populate({
                path: 'user',
                select: 'username -_id'
            })

        existingPublication.comments.push(comment._id)
        await existingPublication.save()    

        return res.send(
            {
                success: true,
                message: 'Comment created successfully',
                populatedComment
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error'
            }
        )
    }
}

export const updateComment = async(req, res) =>{
    try {
        const { idComment } = req.params
        const { title, text } = req.body
        const user = req.user.id
        
        const existingComment = await Comment.findById(idComment)

        if(!existingComment){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }

        if(!existingComment.status){
            return res.status(403).send(
                {
                    success: false,
                    message: 'Comment eliminated'
                }
            )
        }

        if(existingComment.user.toString() !== user.toString()){
            return res.status(403).send(
                {
                    success: false,
                    message: 'You can only edit your comments'
                }
            )
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            idComment,
            {
                title,
                text
            },
            {
                new: true
            }
        )

        const populatedComment = await Comment.findById(idComment)
            .populate({
                path: 'publication',
                select: '-_id title text',
                populate: {
                    path: 'user',
                    select: 'username -_id'
                }
            })
            .populate({
                path: 'user',
                select: 'username -_id'
            })

        return res.send(
            {
                success: true,
                message: 'Comment updated successfully',
                populatedComment
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: true,
                message: 'General error'
            }
        )
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { idComment } = req.params
        const user = req.user.id

        const existingComment = await Comment.findById(idComment)

        if (!existingComment) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }

        if (!existingComment.status) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'Comment is deleted'
                }
            )
        }

        if (existingComment.user.toString() !== user.toString()) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'You can only delete your comments'
                }
            )
        }

        existingComment.status = false
        await existingComment.save()

        return res.send(
            {
                success: true,
                message: 'Comment deleted successfully (status set to false)',
                comment: existingComment
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error'
            }
        )
    }
}