import { application, Router } from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { createComment, deleteComment, getComment, getComments, updateComment } from './comment.controller.js'
import { createCommentValidator, updateCommentValidator } from '../../helpers/validators.js'

const api = Router()

api.get(
    '/getComments',
    [
        validateJwt
    ],
    getComments
)

api.get(
    '/getComment/:idComment',
    [
        validateJwt
    ],
    getComment
)

api.post(
    '/createComment',
    [
        validateJwt,
        createCommentValidator
    ],
    createComment
)

api.put(
    '/updateComment/:idComment',
    [
        validateJwt,
        updateCommentValidator
    ],
    updateComment
)

api.delete(
    '/deleteComment/:idComment',
    [
        validateJwt
    ],
    deleteComment
)

export default api