import axios from "axios"
import { Images } from "./TypeScript"


export const validImage = (file: File) => {
    if(!file){
        return ({ msg: 'No file has been uploaded'})
    }

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg'){
        return ({ msg: 'File format is not supported!'})
    }

    if(file.size > 1024 * 1024 * 5){
        return ({ msg: 'The file is too large'})
    }

}

export const imageUpload = async(images: File[]) => {
  try {
    let imageArr: Images[] = []
    for(const item of images){
        let formData = new FormData()

        formData.append('file', item)
        formData.append('upload_preset','m7w4riez')
        formData.append('cloud_name', 'duzm9in6w')

        const res = await axios.post('https://api.cloudinary.com/v1_1/duzm9in6w/image/upload', formData)
        imageArr.push({ url: res.data.secure_url, public_id: res.data.public_id})
     }

     return imageArr

  } catch (error: any) {
      console.log(error)
  }
        
}