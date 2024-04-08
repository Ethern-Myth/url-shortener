# url-shortener

The URL Shortener Service is a web application designed to shorten long URLs into more manageable and shareable links. It offers an API that allows users to perform the following actions:

- **Shorten URLs:** Users can submit long URLs to the service, which generates a shortened version of the URL.
- **Retrieve Original URLs:** Users can access the original long URLs by providing the corresponding short ID.
- **View and Manage URLs:** Additional functionalities include retrieving all URLs stored in the service and removing URLs by their ID.

## Project Setup and Execution

1. **Setup:**
   - Ensure you have Node.js installed on your system.
   - If not already installed, install `pnpm` globally by running `npm install -g pnpm`.
   - Clone the project repository from GitHub.
   - Navigate to the project directory in your terminal.

2. **Running the Project:**
   - Run `pnpm install` to install dependencies.
   - Run `pnpm start` to start the server.
   - The server should now be running and accessible.
   - Swagger documentation can be accessed at `/swagger` endpoint.

## API Usage

### Endpoints and Request/Response Formats

1. **Base URL:**
   - The base URL for the API is determined by the server's address.

2. **Endpoints:**
   - **GET `/`:**
     - Description: Retrieves a message indicating the URL shortener service.
     - Request Format: No request parameters.
     - Response Format: JSON object with the message.

   - **GET `/:shortId`:**
     - Description: Redirects to the original URL using the provided short ID.
     - Request Format: `shortId` parameter in the URL.
     - Response Format: Redirects to the original URL if found, otherwise returns a JSON object with an error message.

   - **POST `/shorten`:**
     - Description: Shortens a provided URL.
     - Request Format: JSON object with the `originalUrl` parameter.
     - Response Format: JSON object with the original URL, shortened URL, and short ID if successful, otherwise returns a JSON object with an error message.

   - **DELETE `/:id`:**
     - Description: Removes a URL by its ID.
     - Request Format: `id` parameter in the URL.
     - Response Format: No content on successful deletion, otherwise returns a JSON object with an error message.

3. **Request/Response Formats:**
   - **Request Body:**
     - For `POST /shorten`, the request body should contain a JSON object with the `originalUrl` parameter, representing the URL to be shortened.

   - **Response Body:**
     - Responses are formatted as JSON objects.
     - Common fields in response objects include `originalUrl`, `shortenedUrl`, and `shortId`.
     - Error responses contain an `error` field indicating the reason for the error.

4. **Additional Notes:**
   - The API supports CORS headers for cross-origin requests.
   - Middleware is used for request processing, including body parsing, compression, and security headers.
   - The server can be configured for local testing or deployment on various environments by uncommenting relevant code blocks.

### Local Testing

- To test the server locally, uncomment the relevant code block in `src/api/index.ts`.
- Set the `PORT` environment variable as needed.
- Run `pnpm dev` to start the server locally.
- **Go to `localhost:PORT/swagger` to access swagger ui**

### Deployment

- For serverless deployment on platforms like Vercel, the `export default app` line in `src/api/index.ts` should be retained.
- Ensure proper configuration of environment variables like `HOST` and `LOCAL`, `env.sample` is provided with this code.
- Deployment on other environments like AWS, Google Cloud, or Azure may require adjustments based on the hosting platform's requirements.

### Author

Created and maintained by [Ethern Myth](https://github.com/Ethern-Myth)
