import User from '../src/user/user.model.js'

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername){
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async(email)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail){
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existUserById = async (id) => {
    const user = await User.findOne({ _id: id, status: true })
    if (!user) {
        return false
    }
    return true
}