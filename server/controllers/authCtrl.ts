import { Request, Response } from 'express'
import { validateEmail } from '../config/valid'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import { createAccessToken, createActivateToken, createRefreshToken } from '../config/generateTokens'
import sendEmail from '../config/sendEmail'
import jwt from 'jsonwebtoken'
import { IDecodeToken, IUser } from '../config/interface'

const authCtrl = {
    register: async (req: Request, res: Response) =>{
        try {
            const { name, account, password} = req.body
            // checks 
            if(!name) 
               return res.status(400).json({ msg: 'username is required!'})

            if(!account) 
                return res.status(400).json({ msg: 'e-mail is required!'})
            
            if(!validateEmail(account))
               return res.status(400).json({ msg: 'enter a valid e-mail address!'})

            const check = await Users.findOne({ account })

            if(check)
               return res.status(400).json({ msg: 'the account is already in use!'})

            if(!password)
               return res.status(400).json({ msg: 'password is required!'})
            
            if(password.length < 8){
               return res.status(400).json({ msg: 'password should be atleast 8 characters!'})
            }

            // hash password
            const passHash = await bcrypt.hash(password, 12)

            // create user
            const newUser = {  name, account, password: passHash }

            const activateToken = createActivateToken({newUser})

            let msg = `Thank you for choosing fury-eccomerce, \n
                        Click the following link to activate your account \n
                        ${process.env.BASE_URL}/activate/${activateToken}`

            sendEmail(account, 'Verify your account', msg )

            return res.status(200).json({ msg: 'Register successful, Activate account to get started' })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    activate: async(req: Request, res: Response) =>{
        try {
            const { activateToken } = req.body

            if(!activateToken) return res.status(400).json({ msg: 'No activate token'})
            
            const decoded = <IDecodeToken>jwt.verify(activateToken, `${process.env.ACTIVATE_TOKEN_SECRET}`)

            const { newUser } = decoded

            if(!newUser) return res.status(500).json({ msg: 'An error occured unable to register'})
            // check if user already exists
            const check = await Users.findOne({ account: newUser.account})

            if(check) return res.status(400).json({ msg: 'The account has already been verified'})

            // create new user
            const user = new Users(newUser)

            await user.save()

            return res.status(200).json({ msg: 'Your account has been activated!', user })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    login: async(req: Request, res: Response) => {
        try {
            const { account, password } = req.body

            const user = await Users.findOne({ account })

            if(!user) return res.status(400).json({ msg: 'No user was found!'})

            loginUser(user, password, res)

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    refreshToken: async(req: Request, res: Response) => {
        try {
            const refreshToken = req.cookies.refreshToken
            if(!refreshToken) return res.status(400).json({ msg: 'invalid authoriation'})

            const decode = <IDecodeToken>jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`)
            if(!decode) return res.status(400).json({ msg: 'invalid authoriation'})

            const user = await Users.findById(decode.id).select('-password')
            if(!user) return res.status(400).json({ msg: 'no user was found!'})

            const accessToken = createAccessToken({ id: decode.id })
            return res.status(200).json({ accessToken, user })
      
        } catch (error: any) {
          return res.status(500).json({ msg: error.message })   
        }
    },
    logout: async(req: Request, res: Response) => {
        try {
            await res.clearCookie('refreshToken', { path: '/api/refreshToken'})
            return res.status(200).json({ msg: 'logout success..'})
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

// login user
const loginUser = async (user: IUser, password: string, res: Response) => {
       const passCheck = await bcrypt.compare(password, user.password)
       if(!passCheck) return res.status(400).json({ msg: 'Wrong password'})
        // generate tokens
       const accessToken = createAccessToken({id: user._id})
       const refreshToken = createRefreshToken({id: user._id})

       res.cookie('refreshToken', refreshToken, {
           httpOnly: true,
           maxAge: 7*24*60*60*1000,
           path: '/api/refreshToken'
       })
       
       return res.status(200).json({ msg: 'Login success...', accessToken , user: { ...user._doc, password: '' }})
}

export default authCtrl