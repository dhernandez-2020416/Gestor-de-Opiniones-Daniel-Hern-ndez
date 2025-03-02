import { Router } from 'express'
import { validateJwt, verifyAdminRole } from '../../middlewares/validate.jwt.js'
import { createCategory, deleteCategory, getCategories, updateCategory } from './category.controller.js'
import { createCategoryValidator, updateCategoryValidator } from '../../helpers/validators.js'

const api = Router()

api.post(
    '/createCategory',
    [
        validateJwt,
        verifyAdminRole,
        createCategoryValidator
    ],
    createCategory
)

api.get(
    '/getCategory',
    [
        validateJwt,
        verifyAdminRole
    ],
    getCategories
)

api.put(
    '/updateCategory/:idCategory',
    [
        validateJwt,
        verifyAdminRole,
        updateCategoryValidator
    ],
    updateCategory
)

api.delete(
    '/deleteCategory/:idCategory',
    [
        validateJwt,
        verifyAdminRole
    ],
    deleteCategory
)

export default api