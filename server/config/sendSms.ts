
const credentials = {
    apiKey: `${process.env.SMS_API_KEY}`,
    username: `${process.env.SMS_USERNAME}`
}

const AfricaStalking = require('africastalking')(credentials)
const sms = AfricaStalking.SMS

export const sendSms = async (phone: string, name: string) => {
    try {
        
        const options = {
            to: `+${phone}`, 
            message: `Dear ${name}, Thank you for your purchase, We sincerely appreciate your business and hope you come back soon`
       }

       const response = await sms.send(options)

       console.log(response)
    } catch (error: any) {
        console.log(error)
    }
  
}