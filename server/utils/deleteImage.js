import fs from 'fs';
import path from 'path';

export const deleteImage = (imagePath) => {
   try {
      const localPath = imagePath.replace(/^.*\/uploads/, 'uploads'); // keep only local path
      fs.unlinkSync(path.join(process.cwd(), localPath));
   } catch (error) {
      console.error('Image deletion failed:', error.message);
   }
};
