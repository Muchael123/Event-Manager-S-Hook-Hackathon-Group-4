# API Documentation - Authentication

## Overview

This document provides details about the authentication endpoints for the Event-Manager-S-Hook-Hackathon-Group-4 API. The API allows users to register, log in, and perform basic authentication-related operations.

---

## Base URL
`event-manager-g4.vercel.app/api/v1`

## Endpoints

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
Here's the markdown code for the **User Registration** section with the responses included:

```markdown
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

  