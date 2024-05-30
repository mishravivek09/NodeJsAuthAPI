## Social Media Post API
Welcome to the Social Media Post API! This API allows you to perform CRUD operations like create, retrieve, update, add comment on posts, like posts, and delete posts from database. It provides authentication mechanisms to ensure the security of user data and interactions.

### Features
Authentication: Secure authentication mechanism using JWT (JSON Web Tokens) to protect user data and interactions.
Create Post: Create new posts.
Retrieve Post: Retrieve posts from database.
Update Post: Update existing posts by their id's.
Delete Post: Delete posts from database by id's.
Post Comment: Add comment on posts by their id's.
Post Like: Like post by posts id's.
Error Handling: Comprehensive error handling to provide meaningful feedback to API consumers.
### Getting Started
To get started with the Social Media Post API, follow these steps:

Clone the repository: `git clone https://github.com/mishravivek09/NodeJsAuthAPI.git`
Install dependencies: npm install
Configure environment variables:
Create a .env file based on the provided .env.example.
Update the variables with your environment-specific values.
Start the server: npm start
The API will be accessible at `http://localhost:8080`
Authentication
This API uses JWT (JSON Web Tokens) for authentication. To authenticate, include the JWT token in the Authorization header of your requests.


### Error Handling
The API handles errors gracefully and returns appropriate HTTP status codes along with error messages in the response body.
