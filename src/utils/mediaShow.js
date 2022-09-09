import { postData } from './fetchData'
import { GLOBALTYPES } from '../redux/actions/globalTypes'

// =============== IMAGE SHOW =================
export function ImgShow(src, setImages, images){

   function handleClose(){
      const newImages = images.filter(img => img !== src)
      setImages(newImages)   
   }

    return (
       <div className="position-relative single-img" onClick={() => handleClose()} >
          <img src={URL.createObjectURL(src)} className='main-img' />
          <img src="/images/icons/error.png" className="position-absolute pointer close-img" />
       </div>
    )
}


// =============== VIDEO SHOW =================
export  function VideoShow(src, setImages, images){
   
   function handleClose(){
      const newImages = images.filter(img => img !== src)
      setImages(newImages)   
   }
   
    return (
      <div className="position-relative single-img" onClick={() => handleClose()} >
         <video controls autoplay src={URL.createObjectURL(src)} className='main-img' />
         <img src="/images/icons/error.png" className="position-absolute pointer close-img" />
      </div>       
    )
 }


// =============== ATTACHMENT SHOW =================
export  function attachmentShow(file, setAttachment, attachment){
   
   function handleClose(){
      const newAttachment = attachment.filter(img => img !== file)
      setAttachment(newAttachment)   
   }
   
   return (
     <div className="position-relative single-attachment mr-2"  >
        <div className="single-attachment-icon" > <img src="/images/icons/attached.png" /> </div>
        <p className="single-attachment-text" > {file.name} </p>
        <img src="/images/icons/error.png" className="position-absolute pointer close-img" onClick={() => handleClose()} />
     </div>       
    )
 }


// ====================== KB TO SHOW ====================
export function bytesToSize(bytes) {
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
   if (bytes === 0) return 'n/a'
   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
   if (i === 0) return `${bytes} ${sizes[i]})`
   return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}


// ==================== INCREASE FILE NAME ======================
export function increaseLength(name){
   let split = name.split('.');
   let filename = split[0];
   let extension = split[1];     

   if (filename.length > 10) {
      filename = filename.substring(0, 10);
   }

   return filename + '.' + extension;
} 