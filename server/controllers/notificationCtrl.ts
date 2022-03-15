import { Response} from 'express'
import Notifications from '../models/notifcationModel'
import mongoose from 'mongoose'
import { IReqAuth } from '../config/interface'

const notificationCtrl = {
   getUserNotifications: async(req: IReqAuth, res: Response) => {
       try {

          const notification = await Notifications.find({ id: req.params.id}).populate('user','-password').sort('-createdAt')

          return res.status(200).json({ notification })

       } catch (error: any) {
           return res.status(500).json({ msg: error.message})
       }
   }
}

export default notificationCtrl