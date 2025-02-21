import Category from './category.model.js'
import Publication from '../publication/publication.model.js'

export const createCategory = async(req, res) => {
    try {
        const { title, description } = req.body
        const category = new Category({ title, description})

        const existingCategory = await Category.findOne({ title: title })

        if(existingCategory){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Category with this name already exists'
                }
            )
        }

        await category.save()

        return res.send(
            {
                success: true,
                message: 'Category created successfully',
                category
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

export const getCategories = async(req, res) => {
    try {
        const categories = await Category.find()
        .populate(
            {
                path: 'publication',
                select: '_id title text',
                match: { status: 'true' }
            }
        )

        return res.send(
            {
                success: true,
                message: 'Categories found',
                categories
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

export const updateCategory = async(req, res) => {
    try {
        const { idCategory } = req.params
        const { title, description } = req.body

        const updatedCategory = await Category.findByIdAndUpdate(
            idCategory,
            {
                title,
                description
            },
            {
                new: true
            }   
        )

        if(!updatedCategory){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Category updated successfully',
                updatedCategory
            }
        )
    } catch (err) {
        console.error(err)
    }
}

export const deleteCategory = async(req, res) => {
    try {
        const { idCategory } = req.params
        const category = await Category.findById(idCategory)
        

        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            })
        }

        let defaultCategory = await Category.findOne({ title: 'Default' })
        
        if (!defaultCategory) {
            defaultCategory = new Category({ name: 'Default', description: 'Default category', publication: [] })
            await defaultCategory.save()
        }
        
        const publicationInCategory = await Publication.find({ category: idCategory })
        
        if (publicationInCategory.length > 0) {

            await Publication.updateMany({ category: idCategory }, { category: defaultCategory._id })

            const publicationsId = publicationInCategory.map(publication => publication._id)
            defaultCategory.publication.push(...publicationsId)
            await defaultCategory.save()
        }
        
        await Category.findByIdAndDelete(idCategory)
        
        res.send({
            success: true,
            message: 'Category deleted successfully',
            PublicationReassigned: publicationInCategory.length
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: true
            }
        )
    }
}