import { OAuth2Client } from 'google-auth-library'
const nodeMailer = require('nodemailer')
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const CLIENT_ID = `${process.env.CLIENT_ID}`
const CLIENT_SECRET = `${process.env.CLIENT_SECRET}`
const REFRESH_TOKEN = `${process.env.REFRESH_TOKEN}`
const SENDER_EMAIL = `${process.env.SENDER_EMAIL}`
 
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN)

const sendEmail = async(to: string, subject: string, msg: string) => {
    try {
        oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

        const accessToken = await oauth2Client.getAccessToken()

        const smtpTransport = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                user: SENDER_EMAIL,
                accessToken,
                OAUTH_PLAYGROUND
            }
        })

        const mailOptions = {
            from: SENDER_EMAIL,
            to: to,
            subject: subject,
            html: msg
        }

        const result = await smtpTransport.sendMail(mailOptions)

        console.log('Mail sent..')
       
        return result

    } catch (error: any) {
        console.log(error)
    }
}

export default sendEmail