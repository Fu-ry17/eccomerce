import { Request, Response } from "express"
import { IReqAuth, IUser } from "../config/interface"
import Users from "../models/userModel"
import bcrypt from 'bcrypt'
import sendEmail from "../config/sendEmail"
import { createAccessToken } from "../config/generateTokens"

const userCtrl = {
   updateUser: async(req: IReqAuth, res: Response) => {
        if(!req.user) return res.status(400).json({ msg: 'Invalid authoriation'})
        try {
            const { name, avatar } = req.body

            if(!name)
                return res.status(400).json({ msg: 'username is required'})

            if(!avatar) 
               return res.status(400).json({ msg: 'avatar is required'})
            
            await Users.findByIdAndUpdate(req.user.id, { name , avatar }, { new: true})
            return res.status(200).json({ msg: 'update success..'})

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
   },
   forgotPassword: async(req: IReqAuth, res: Response) => {
       try {
           const { account } = req.body
           const user: IUser = await Users.findOne({ account })

           if(!user) return res.status(400).json({ msg: 'no user was found!'})

           const accessToken = createAccessToken({id: user._id })

           let msg = `Thank you for choosing fury-eccomerce, \n
                      Click the following link to reset your account \n
                      ${process.env.BASE_URL}/reset/${accessToken}`

           sendEmail(account, 'Reset Password', msg)

           return res.status(200).json({ msg: 'follow the following link to activate your account!'})

       } catch (error: any) {
           return res.status(500).json({ msg: error.message })
       }
   },
   resetPassword: async(req: IReqAuth, res: Response) => {
    if(!req.user) return res.status(400).json({ msg: 'Invalid authoriation'})
    try {
        const { password } = req.body
        
        if(password.length < 8) 
           return res.status(400).json({ msg: 'password should be atleast 8 characters'})    
        // hash password
        const passHash = await bcrypt.hash(password, 12)
        
        await Users.findByIdAndUpdate(req.user.id, { password: passHash }, { new: true})
        return res.status(200).json({ msg: 'reset success..'})

    } catch (error: any) {
        return res.status(500).json({ msg: error.message })
    }
   },
   subscribe: async(req: IReqAuth, res: Response) => {
      if(!req.user) return res.status(400).json({ msg: 'Invalid authoriation'})
       try {
           const {subscription} = req.body
         
           console.log(subscription)
           
       } catch (error: any) {
          return res.status(500).json({ msg: error.message })
       }
   }
}

export default userCtrl