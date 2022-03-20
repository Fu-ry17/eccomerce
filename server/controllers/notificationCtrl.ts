import { Response} from 'express'
import Notifications from '../models/notifcationModel'
import mongoose from 'mongoose'
import { IReqAuth } from '../config/interface'

const notificationCtrl = {
   getUserNotifications: async(req: IReqAuth, res: Response) => {
      if(!req.user) return res.status(400).json({ msg: 'invalid authoriation'})
       try {
          const notification = await Notifications.find({ id: req.params.id}).populate('user','-password').sort('-createdAt')
          return res.status(200).json({ notification })

       } catch (error: any) {
           return res.status(500).json({ msg: error.message})
       }
   },
   readNotify: async(req: IReqAuth, res: Response) => {
    if(!req.user) return res.status(400).json({ msg: 'invalid authoriation'})
       try {
           const { read } = req.body
           await Notifications.findByIdAndUpdate(req.params.id, { read}, { new: true})

           return res.status(200).json({ msg: 'update success'})
       } catch (error: any) {
          return res.status(500).json({ msg: error.message})
       }
   },
   deleteNotify: async(req: IReqAuth, res: Response) => {
     if(!req.user) return res.status(400).json({ msg: 'invalid authoriation'})
       try {
           await Notifications.findByIdAndDelete(req.params.id)
           return res.status(200).json({ msg: 'delete success..'})

       } catch (error: any) {
          return res.status(500).json({ msg: error.message})
       }
   }
}

export default notificationCtrl