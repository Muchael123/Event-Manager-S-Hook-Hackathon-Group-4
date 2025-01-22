import cloudinary from "./cloudinaryConfig.js";
export default async function DeleteAsset (AssetId) {
    cloudinary.uploader.destroy(AssetId, (error, result) => {
        if (error) {
          console.error('Error deleting asset:', error);
        } else {
          console.log('Asset deleted successfully:', result);
        }
      });
}