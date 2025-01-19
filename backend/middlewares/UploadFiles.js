import cloudinary from "../lib/cloudinaryConfig.js";

export default async function  UploadImage (req, res, next) {
    if (req.files && req.files.length > 0) {
        let image_url = '';
        for (const file of req.files) {
          const imageBuffer = file.buffer.toString("base64");
          const result = await cloudinary.uploader.upload(
            `data:${file?.mimetype};base64,${imageBuffer}`,
            { folder: "event-manager/events" }
          );
          const thumbnailUrl = cloudinary.url(result.public_id, {
            width: 150,
            height: 150,
            crop: "thumb",
            gravity: "center",
            quality: "auto",
            fetch_format: "auto",
          });
  
          images.push({
            url: result.secure_url,
            publicId: result.public_id,
            thumbnailUrl,
          });
        }
        updates.images = image_url;
      }
      if(image_url){
        req.body.image = image_url;
      }
    }