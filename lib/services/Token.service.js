import jwt from 'jsonwebtoken'

const JWT_AUTH = process.env.JWT_AUTH

export const generateToken = async(user)=>{
    const token = jwt.sign({userId:user._id},JWT_AUTH,{
        expiresIn:"30d"
    })
    return token
}

export const VerifyToken = async(token)=>{
    const verify = jwt.verify(token,JWT_AUTH)
    return verify
}