import jwt from 'jsonwebtoken'
const datetime = require('node-datetime')

export const createActivateToken = (user: object) => {
   return jwt.sign(user, `${process.env.ACTIVATE_TOKEN_SECRET}`, { expiresIn: '5m'})
}

export const createAccessToken = (user: object) => {
    return jwt.sign(user, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1h'})
}

export const createRefreshToken = (user: object) => {
    return jwt.sign(user, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '7d'})
}

// mpesa password
export const generatePassword = () => {
   const formated = datetime.create().format('YmdHMS')
   const newPassword = `${process.env.SHORT_CODE}`+ `${process.env.PASS_KEY}`+ formated
   const encodedPassword = Buffer.from(newPassword).toString('base64')
   
   return encodedPassword
}