
import jwt from 'jsonwebtoken'
import { getUserById } from '../controller/user.js'
const isauthorzied = async(req,res,next) =>{
    if(req.header){
        try {
            let token = await req.headers["x-auth-token"]
            const decode = jwt.verify(token,process.env.SECURT_KEY)
            req.user = await getUserById(decode.id)
            next()
        } catch (err) {
            console.log(err)
        res.status(500).json({error:"Internal server auth"})
        }
    }
}

export { isauthorzied }