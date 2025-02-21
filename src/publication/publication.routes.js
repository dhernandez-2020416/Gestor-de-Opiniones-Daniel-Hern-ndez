import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { createPublication, getPublications, updatePublication, deletePublication } from './publication.controller.js'
import { createPublicationValidator, updatePublicationValidator } from '../../helpers/validators.js'

const api = Router()

api.get(
    '/getPublications',
    [
        validateJwt
    ],
    getPublications
)

api.post(
    '/createPublication',
    [
        validateJwt,
        createPublicationValidator
    ],
    createPublication
)

api.put(
    '/updatePublication/:idPublication',
    [
        validateJwt,
        updatePublicationValidator
    ],
    updatePublication
)

api.delete(
    '/deletePublication/:idPublication',
    [
        validateJwt
    ],
    deletePublication
)

export default api