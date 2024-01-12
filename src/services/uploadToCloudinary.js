const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET


export const uploadToCloudinary = async file => {
  const uploadData = new FormData()
  uploadData.append("file",file)
  uploadData.append('cloud-name', cloud_name)
  uploadData.append('upload_preset', upload_preset)
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
    method: 'post',
    body: uploadData
  })
  const data = await res.json()
  return data
}