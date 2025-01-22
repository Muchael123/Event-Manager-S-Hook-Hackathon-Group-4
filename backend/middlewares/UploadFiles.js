import Cloudinary from "../lib/cloudinaryConfig.js";

export default async function  UploadImage (req, res, next) {
    const file = req.files[0];
    if (!file) {
        return res.status(400).send("Please upload an image");
    }
    console.log("file recieved...")
    const ImageBuffer = file?.buffer?.toString("base64");
    const  result = await Cloudinary.uploader.upload(`data:${file?.mimetype};base64,${ImageBuffer}`,{
        folder: 'event-manager/events',
    });
    console.log(result);
    if (!result) {
        return res.status(500).send("Failed to upload image");
    }
    console.log(result)
    req.body.image_url = result.secure_url;
    req.body.image_public_id = result.public_id;
    
    console.log(req.body.image_url);
    next();
    }