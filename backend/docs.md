### N/B. **Base URL - https://event-manager-g4.vercel.app**
## Routes
- [Routes](#routes)
  - [1. **User Registration**](#1-user-registration)
  - [2. **User Login**](#2-user-login)
  - [3. **Categories**](#3-categories)
  - [4. **Events**](#4-events)

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
### 4. **Events**
- **URL:** `/categories`
- **Method:** `GET, POst`
- **Description:** Get a list of all categories. It can also be used to add an event
- #### i. `GET Method`
    - **Description:** Get a list of all or one categories. It uses pagination and limit as a parameter.
    - - **Request params:**
      ```json
      {
        <!-- All of these are optional -->
        "page":"Number default = 1",
         "limit " : "Number Default=5",
         "categories": "comma separated string"
      }
      ```
      - **example**
        `http://localhost:3001/api/v1/events?page=1&limit=5&categories=Conferences, Hackathons` - You can replace the url with the base URL
    - **RESPONSES**
       - **Success (200):**
        ```json
        {
          "events": ["list of all events according to params"	]
        }
        ```
      - **Not Found (404):**
        ```json
          {
            "message": "No events found"
          }
        ```
- #### ii. `POST Method`
  - **Description:** Add an event
  -  **Request headers:**
     ```js
     Authorization: '[Your_access_token]'
     ```
  - **Request body**
    ```json
      {
      "title": "Tech Conference 2025",
      "description": "A major tech event bringing together industry leaders to discuss the future of technology.",
      "event_date": "2025-05-20",
      "event_time": "09:00:00",
      "duration": 1,
      "location": "Nairobi Convention Center, Nairobi, Kenya",
      "image_url": "https://example.com/event-image.jpg",
      "category": ["Conferences", "Technology"],
      "max_attendees": 500,
      "ticket_price": 1500.00,
      "is_featured": true,
      "current_attendees": 20
    }
     ```
  - **Responses**
    - **201 - created successfully**
    ```
      {
      "message": "Event created successfully",
      "event": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 8,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 0
      }
    }
    ```
    - **Server Error (500)**
    ```json
      {
        "message":"Error fetching categories. Please try again"
      }
    ```
    - **Acess Denied (409)**
      - This means that either you have no access token or its invalid
    ```json
      {
        "message":"Access denied"
      }
    ```
- **Edit Event**
  - Url `/event/edit`
  - Method `PATCH`
  - Headers - Authorization : `Your_Token`
  - body
    ```json
     "id" : "Id of the event (Required)",
     <!-- Any other key here -->
      "[key]": "[value]"
    ```
  - **example**
    ```json 
        {
        "title": "Tech Conference 2025",
        "description": "A major tech event bringing together industry leaders to discuss the future of technology.",
        "event_date": "2025-05-20",
        "id": 1,
        "is_featured": true
        }
     ```

  - Responses
    - 409 - Access denied (You have to find the auth token)
    - 404 - Event not found (Incase an invalid id was passed)
    - 500 - Server Error
    - 200 - Event updated successfully
    - **example**:
      ```json
            {
        "message": "Event created successfully",
        "event": {
          "fieldCount": 0,
          "affectedRows": 1,
          "insertId": 1,
          "info": "",
          "serverStatus": 2,
          "warningStatus": 0,
          "changedRows": 0
        }
      }
      ```
  - **Delete an Event**
    - URL - `/event/[event_id]`
    - Method - `DELETE`
    - Headers - Authorization : `Your_Token`
    - **responses**
      - 404 - Not found (The event id does noe exist on the database)
      - 500 - There was an error on the server side
      - 200 - successfully deleted the event
        ```json
          "message": "Event '${title}' deleted successfully"
          ```


      



    
