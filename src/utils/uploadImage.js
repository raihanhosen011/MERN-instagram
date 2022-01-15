// UPLOAD IMAGE FUNCTION
async function uploadImage(images){
  const imgArray = []

  for (const item of images) {
    const form = new FormData()
    form.append('file', item) 

    form.append("upload_preset", "oiezp3ym")
    form.append("cloud_name","raihan-dev")

    const res = await fetch("https://api.cloudinary.com/v1_1/raihan-dev/image/upload",{method:"post",body: form})
    const data = await res.json()

    imgArray.push({ public_id:data.public_id, url: data.secure_url })
  }

  return imgArray
}

export { uploadImage }

