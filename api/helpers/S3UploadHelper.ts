import AWS from 'aws-sdk';

// Configure AWS S3 using environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

interface UploadResponse {
  url: string;
  key: string;
}

/**
 * Uploads a file to S3.
 * @param file - The file buffer and metadata to be uploaded.
 * @param folderName - The folder name in the S3 bucket.
 * @returns The S3 URL and key of the uploaded file.
 */
export const uploadToS3 = async (file: Express.Multer.File, folderName: string): Promise<UploadResponse> => {
  try {
    // Generate a unique file name for the S3 bucket
    const fileKey = `${folderName}/${Date.now()}_${file.originalname}`;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', // Set the file to be publicly readable, change if necessary
    };

    // Upload the file to S3
    const data = await s3.upload(params).promise();

    return { url: data.Location, key: data.Key };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Error uploading file to S3');
  }
};
