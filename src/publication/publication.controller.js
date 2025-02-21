import Publication from './publication.model.js'
import Category from '../category/category.model.js'

export const getPublications = async(req, res) => {
    try {
        const publications = await Publication.find({ status: true })
        .populate(
            {
                path: 'category',
                select: 'title description -_id'
            }
        ).populate(
            {
                path: 'user',
                select: 'username -_id'
            }
        )

        return res.send(
            {
                success: true,
                message: 'Publications found',
                publications
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

export const createPublication = async(req, res) =>{
    try {
        const { title, category, text } = req.body
        const user = req.user.id
        
        const existingCategory = await Category.findById(category)
        if (!existingCategory) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        const publication = new Publication({ title, category, text, user})

        await publication.save()

        existingCategory.publication.push(publication._id)
        await existingCategory.save()

        const populatedPublication = await Publication.findById(publication._id)
            .populate({
                path: 'category',
                select: '_id title description'
            })
            .populate({
                path: 'user',
                select: '_id name surname username email'
            })

        return res.send(
            {
                success: true,
                message: 'Publication created',
                populatedPublication
            }
        )
    } catch (err) {
        console.error(err)
        res.status(500).send(
            {
                success: false,
                message: 'General error'
            }
        )
    }
}

export const updatePublication = async (req, res) => {
    try {
        const { idPublication } = req.params
        const { title, category, text } = req.body
        const user = req.user.id

        const existingPublication = await Publication.findById(idPublication)

        if (!existingPublication) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found'
                }
            )
        }

        if (!existingPublication.status) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'Cannot update a deleted publication'
                }
            )
        }

        if (existingPublication.user.toString() !== user.toString()) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'You can only edit your publications'
                }
            )
        }

        if (category) {
            const existingCategory = await Category.findById(category)

            if (!existingCategory) {
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Category not found'
                    }
                )
            }
        }

        const updatedPublication = await Publication.findByIdAndUpdate(
            idPublication,
            { 
                title, 
                category,
                 text 
            },
            { 
                new: true 
            }
        )

        if (category && category.toString() !== existingPublication.category.toString()) {
            await Category.findByIdAndUpdate(existingPublication.category, {
                $pull: { publication: idPublication }
            })
        
            await Category.findByIdAndUpdate(category, {
                $push: { publication: updatedPublication._id }
            })
        }

        const populatedPublication = await Publication.findById(updatedPublication._id)
            .populate(
                {
                    path: 'category',
                    select: '-_id title description'
                }
            )
            .populate(
                {
                    path: 'user',
                    select: '-_id username'
                }
            )

        return res.send(
            {
                success: true,
                message: 'Publication updated successfully',
                publication: populatedPublication
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send({
                success: false,
                message: 'General error'
            }
        )
    }
}

export const deletePublication = async (req, res) => {
    try {
        const { idPublication } = req.params
        const user = req.user.id

        const existingPublication = await Publication.findById(idPublication)

        if (!existingPublication) {
            return res.status(404).send({
                success: false,
                message: 'Publication not found'
            })
        }

        if (!existingPublication.status) {
            return res.status(400).send({
                success: false,
                message: 'Publication is already deleted'
            })
        }

        if (existingPublication.user.toString() !== user.toString()) {
            return res.status(403).send({
                success: false,
                message: 'You can only delete your publications'
            })
        }

        existingPublication.status = false
        await existingPublication.save()

        return res.send(
            {
                success: true,
                message: 'Publication deleted successfully',
                existingPublication
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