import { Router } from 'express'
import { validateJwt, verifyClientRole } from '../../middlewares/validate.jwt.js'
import { updatePassword, updateUser } from './user.controller.js'
import { updatePasswordValidator, updateUserValidator } from '../../helpers/validators.js'

const api = Router()

api.put(
    '/updateProfile',
    [
        validateJwt,
        verifyClientRole,
        updateUserValidator
    ],
    updateUser
)

api.put(
    '/updatePassword',
    [
        validateJwt,
        verifyClientRole,
        updatePasswordValidator
    ],
    updatePassword
)

export default api