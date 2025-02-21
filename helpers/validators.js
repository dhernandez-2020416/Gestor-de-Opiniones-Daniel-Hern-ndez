import { body } from 'express-validator'
import { existUsername, existEmail, objectIdValid } from './db.validators.js'
import { validateErrors } from './validate.error.js'

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone()
        .isLength({min: 8, max: 8}),
    body('role', 'Role cannot be added')
        .not()
        .exists(),
    body('publications', 'ShoppingCarts cannot be added')
        .not()
        .exists(),
    body('comments', 'Comments cannot be added')
        .not()
        .exists(),
    body('status', 'Status cannot be added')
        .not()
        .exists(),
    validateErrors
]

export const loginValidator = [
    body('identifier', 'Identifier cannot be empty')
        .notEmpty(),
    body('password', 'Password cannot be empty')
        .notEmpty(),
    validateErrors
]

export const updateUserValidator = [
    body('name', 'Name cannot be empty')
        .optional()
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .optional()
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be change')
        .not()
        .exists(),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .optional()
        .notEmpty()
        .isMobilePhone()
        .isLength({min: 8, max: 8}),
    body('role', 'Role cannot be change')
        .not()
        .exists(),
    body('publications', 'Publications cannot be change')
        .not()
        .exists(),
    body('comments', 'Comments cannot be change')
        .not()
        .exists(),
    body('status', 'Status cannot be change')
        .not()
        .exists(),
    validateErrors
]

export const updatePasswordValidator = [
    body('oldPassword', 'OldPassword cannot be empty')
        .notEmpty(),
    body('newPassword', 'New password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong'),
    validateErrors
]

export const createCategoryValidator = [
    body('title', 'Title cannot be empty')
        .notEmpty(),
    body('description', 'Description cannot be empty')
        .notEmpty(),
    validateErrors
]

export const updateCategoryValidator = [
    body('title', 'Title cannot be empty')
        .optional()
        .notEmpty(),
    body('description', 'Description cannot be empty')
        .optional()
        .notEmpty(),
    validateErrors
]

export const createPublicationValidator = [
    body('title', 'Title cannot be empty')
        .notEmpty(),
    body('category', 'Category cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('text', 'Text cannot be empty')
        .notEmpty(),
    body('User', 'User cannot be added')
        .not()
        .exists(),
    body('status', 'Status cannot be added')
        .not()
        .exists(),
    body('comments', 'Comments cannot be added')
        .not()
        .exists(),
    body('createdAt', 'CreatedAt cannot be added')
        .not()
        .exists(),
    validateErrors
]

export const updatePublicationValidator = [
    body('title', 'Title cannot be empty')
        .optional()
        .notEmpty(),
    body('category', 'Category cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    body('text', 'Text cannot be empty')
        .optional()
        .notEmpty(),
    body('User', 'User cannot be change')
        .not()
        .exists(),
    body('status', 'Status cannot be change')
        .not()
        .exists(),
    body('comments', 'Comments cannot be change')
        .not()
        .exists(),
    body('createdAt', 'CreatedAt cannot be change')
        .not()
        .exists(),
    validateErrors
]

export const createCommentValidator = [
    body('title', 'Title cannot be empty')
        .notEmpty(),
    body('text', 'Text cannot be empty')
        .notEmpty(),
    body('status', 'Status cannot be added')
        .not()
        .exists(),
    body('publication', 'Publication cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('user', 'User cannot be added')
        .not()
        .exists(),
    body('createAt', 'CreateAt cannot be added')
        .not()
        .exists(),
    validateErrors
]

export const updateCommentValidator = [
    body('title', 'Title cannot be empty')
        .optional()
        .notEmpty(),
    body('text', 'Text cannot be empty')
        .optional()
        .notEmpty(),
    body('status', 'Status cannot be changed')
        .not()
        .exists(),
    body('publication', 'Publication cannot be changed')
        .not()
        .exists(),
    body('user', 'User cannot be changed')
        .not()
        .exists(),
    body('createAt', 'CreateAt cannot be changed')
        .not()
        .exists(),
    validateErrors
]