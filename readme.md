# Image Processing Backend

This project is an asynchronous backend system designed to process image URLs provided in a CSV file. The system compresses the images to 50% of their original quality and stores the results in a MongoDB database. Users can upload CSV files, check the processing status, and receive updates via a webhook.

## Features

- **CSV File Upload**: Upload CSV files containing product information and image URLs.
- **Asynchronous Image Processing**: Process and compress images asynchronously using the `sharp` library.
- **MongoDB Integration**: Store product and image information using MongoDB and Mongoose.
- **Webhook Notifications**: Notify users via a webhook when image processing is complete.
- **REST API**: Check the status of image processing tasks through a RESTful API.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (using Mongoose)
- **Image Processing**: Sharp
- **File Uploads**: Multer
- **CSV Parsing**: csv-parser

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or above)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**:
```
   bash
   git clone https://github.com/yourusername/image-processing-backend.git
   cd image-processing-backend
```
2. **Install the dependencies**:

   ```bash
   npm install
  

3. **Set up environment variables**:
```
   Create a \`.env\` file in the root of the project and add the following:

   
   MONGODB_URI=mongodb://localhost:27017/image_processing
   PORT=3000
  ```

4. **Run the server**:

``` 
   node server.js
 ```

   The API will be available at ```http://localhost:3000\.```

## API Documentation

### 1. Upload CSV File

- **Endpoint**: \`POST /api/v1/images/upload\`
- **Description**: Upload a CSV file, validate its format, process image URLs, compress the images, and return a unique request ID.
- **Headers**:
  - Content-Type: multipart/form-data
- **Request Body** (form-data):
  - \`file\`: The CSV file to be uploaded (type: file).
- **Response**:

```  {
    "requestId": "b67a1d02-e33f-4893-a1d6-7c3f37e57e63"
  }
```

### 2. Check Processing Status

- **Endpoint**: \`GET /api/v1/images/status/:requestId\`
- **Description**: Check the status of a CSV processing request by providing the unique request ID.
- **URL Params**:
  - \`requestId\`: The unique ID returned by the upload endpoint.
- **Response**:

  **Pending Status**:

```
  {
    "status": "Pending",
    "data": null
  }
 ```

  **Completed Status**:
```
  {
    "status": "Completed",
    "data": {
      "requestId": "b67a1d02-e33f-4893-a1d6-7c3f37e57e63",
      "productName": "SKU1",
      "images": [
        {
          "inputUrl": "https://www.public-image-url1.jpg",
          "outputUrl": "/output/processed-image-url1.jpg"
        }
      ],
      "createdAt": "2024-08-30T08:00:00Z"
    }
  }
```

### 3. Webhook

- **Endpoint**: \`POST /api/v1/webhook\`
- **Description**: Webhook to receive notifications when image processing is complete.
- **Headers**:
  - \`Content-Type: application/json

- **Request Body**:
``` 
{
    "requestId": "b67a1d02-e33f-4893-a1d6-7c3f37e57e63",
    "status": "Completed"
  }
```

```- **Response**:

  {
    "message": "Webhook received"
  }
```

## Testing the API

You can use Postman or a similar tool to test the API endpoints. A Postman collection can be helpful for this purpose.

## Project Structure


```image-processing-backend/
├── config/              # Database connection
├── controllers/         # API endpoint logic
├── middleware/          # Custom middleware (async handler, error handling)
├── models/              # Mongoose models
├── routes/              # API routes
├── utils/               # Utility functions (CSV parser)
├── .env                 # Environment variables
├── app.js               # Express app configuration
├── server.js            # App entry point
└── README.md            # Project documentation
```

## Asynchronous Workers

The image processing is done asynchronously to prevent blocking the server when large CSV files or many images are processed. Each image URL is processed in parallel using the \`sharp\` library for compression.

## Future Enhancements

- **Redis for Job Queue Management**: Implement Redis to manage and scale image processing tasks effectively.
- **Retry Logic**: Add retry logic for failed image processing tasks.
- **Cloud Storage Integration**: Store processed images in cloud storage solutions like AWS S3 or Google Cloud Storage.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
