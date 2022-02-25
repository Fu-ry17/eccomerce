import { Response} from 'express'
import Notifications from '../models/notifcationModel'
import mongoose from 'mongoose'
import { IReqAuth } from '../config/interface'

const notificationCtrl = {
   getUserNotifications: async(req: IReqAuth, res: Response) => {
       try {
          const Data = await Notifications.aggregate([
              {
                  $facet: {
                      totalData: [
                          { $match: { user: new mongoose.Types.ObjectId(req.params.id)}},
                           // lookup user
                           {
                               $lookup: {
                                   from: "users",
                                   let: { user_id: "$user"},
                                   pipeline: [
                                      { $match: { $expr: { $eq: ["$_id", "$$user_id" ] }}},
                                      { $project: { password: 0 }}
                                   ],
                                   as: "user"
                               }
                           },
                           // array -> object
                           { $unwind: "$user"},
                           // sort 
                           { $sort: {"createdAt": -1 }}
                      ],
                      totalCount: [
                        { $match: { user: new mongoose.Types.ObjectId(req.params.id)}},
                        { $count: 'count'}
                      ]
                  }
              },
              {
                $project: {
                    count: { $arrayElemAt: [ "$totalCount.count", 0] },
                    totalData: 1
                }
              }
          ]) 

          const notification = Data[0].totalData
          const total = Data[0].totalCount

          return res.status(200).json({ notification, total })

       } catch (error: any) {
           return res.status(500).json({ msg: error.message})
       }
   }
}

export default notificationCtrl