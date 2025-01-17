

### 1. **User Registration**

- **URL:** `/api/auth/register`
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