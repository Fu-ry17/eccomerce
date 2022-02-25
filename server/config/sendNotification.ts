import webPush from 'web-push'

webPush.setVapidDetails('mailto:fusamiles@gmail.com', `${process.env.NOTIFICATION_PUBLIC_KEY}`, `${process.env.NOTIFICATION_PRIVATE_KEY}`)


// const sendNotification = (data: object, subscription: object) => {
//    try {
//       const payload = JSON.stringify(data)
//       webPush.sendNotification(subscription, payload)

//    } catch (error: any) {
//        console.log(error)
//    }
// }

// export default sendNotification