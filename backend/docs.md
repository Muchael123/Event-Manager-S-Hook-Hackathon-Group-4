

### 1. **User Registration**

- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user in the system.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "phone_no": "1234567890",
    "profile_img": "http://example.com/profile.jpg"
  }
  ```

- **Responses:**

  - **Success (201):**
    ```json
    {
      "message": "User successfully registered!"
    }
    ```
    - **Description:** The user was successfully registered. This indicates that the account was created, and the registration was successful.

  - **Conflict (409) - Email already exists:**
    ```json
    {
      "error": "User with this email already exists."
    }
    ```
    - **Description:** The email provided is already registered in the system. Please use a different email address.

  - **Bad Request (400) - Missing Fields:**
    ```json
    {
      "error": "Missing required fields. Please provide name, email, password."
    }
    ```
    - **Description:** The request is missing one or more required fields, such as the name, email, or password. Ensure that all fields are provided in the correct format.

  - **Internal Server Error (500):**
    ```json
    {
      "error": "An error occurred during registration. Please try again later."
    }
    ```
    - **Description:** An unexpected error occurred while processing the registration request.
  
 


### 2. **User Login**

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a token for future requests.
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```

- **Responses:**

  - **Success (200):**
    ```json
    {
      "message": "Login successful!",
      "user": "[Your user details]",
      "token": "your_jwt_token_here"
    }
    ```
    - **Description:** The user credentials were successfully authenticated, and a JWT token is returned for further use. This token should be included in the `Authorization` header for protected routes.

  - **Unauthorized (401) - Invalid Credentials:**
    ```json
    {
      "error": "Invalid email or password."
    }
    ```
    - **Description:** The email or password provided is incorrect. The user should ensure that both fields are correct.

  - **Bad Request (400) - Missing Fields:**
    ```json
    {
      "error": "Please provide both email and password."
    }
    ```
    - **Description:** The request is missing one or both of the required fields: email and password. Ensure both fields are provided.

  - **Internal Server Error (500):**
    ```json
    {
      "error": "An error occurred during login. Please try again later."
    }
    ```
    - **Description:** An unexpected error occurred while processing the login request. This is typically due to a server-side issue, and the user should try again later.

### 3. **Categories**

- **URL:** `/categories`
- **Method:** `GET`
- **Description:** Get a list of all categories.
- **No params are passed**
- **Responses:**

  - **Success (200):**
    ```json
    {
      "categories": ["list of all categories"	]
    }
    ```
  - **Not Found (404):**
    ```json
      {
        "message":"No categories found"
      }
    ```
  - **Server Error (500)**
    ```json
      {
        "message":"Error fetching categories. Please try again"
      }
    ```