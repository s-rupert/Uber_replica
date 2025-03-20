# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user in the system. It validates the input data, hashes the password, and creates a new user record in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

### Method
`POST`

### Request Body
The request body must be in JSON format and include the following fields:

| Field              | Type   | Required | Description                              |
|--------------------|--------|----------|------------------------------------------|
| `fullname.firstname` | String | Yes      | The first name of the user (min 3 characters). |
| `fullname.lastname`  | String | Yes      | The last name of the user (min 3 characters).  |
| `email`             | String | Yes      | A valid email address.                   |
| `password`          | String | Yes      | A password with at least 6 characters.   |

### Validation Rules
- `fullname.firstname`: Must be at least 3 characters long.
- `fullname.lastname`: Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

### Response

#### Success (201 Created)
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "_id": "USER_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Error message describing the validation issue",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

### Example Request
```bash
POST /users/register HTTP/1.1
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1c2e4b5d6c2a1b8e4f123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

---

## Endpoint: `/users/login`

### Description
This endpoint is used to authenticate a user. It validates the input data, checks the email and password, and returns a JSON Web Token (JWT) if the credentials are valid.

### Method
`POST`

### Request Body
The request body must be in JSON format and include the following fields:

| Field      | Type   | Required | Description                              |
|------------|--------|----------|------------------------------------------|
| `email`    | String | Yes      | A valid email address.                   |
| `password` | String | Yes      | A password with at least 6 characters.   |

### Validation Rules
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

### Response

#### Success (200 OK)
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "_id": "USER_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Error message describing the validation issue",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Invalid email or password"
}
```

### Example Request
```bash
POST /users/login HTTP/1.1
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1c2e4b5d6c2a1b8e4f123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

---

## Endpoint: `/users/profile`

### Description
This endpoint is used to retrieve the profile of the authenticated user. The user must be logged in and provide a valid JWT token.

### Method
`GET`

### Headers
| Header            | Type   | Required | Description                              |
|-------------------|--------|----------|------------------------------------------|
| `Authorization`   | String | Yes      | A valid JWT token in the format `Bearer <token>`. |

### Response
```json
{
    "fullname": {
        "firstname": "John",
    "lastname": "Doe"
  },
  "_id": "64f1c2e4b5d6c2a1b8e4f123",
  "email": "johndoe@example.com"
}
```

#### Success (200 OK)
```json
{
  "_id": "USER_ID",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com"
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```

### Example Request
```bash
GET /users/profile HTTP/1.1
Authorization: Bearer JWT_TOKEN
```

### Example Response
```json
{
  "_id": "64f1c2e4b5d6c2a1b8e4f123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com"
}
```

---

## Endpoint: `/users/logout`

### Description
This endpoint is used to log out the authenticated user. It clears the JWT token from cookies and blacklists the token to prevent reuse.

### Method
`GET`

### Headers
| Header            | Type   | Required | Description                              |
|-------------------|--------|----------|------------------------------------------|
| `Authorization`   | String | Yes      | A valid JWT token in the format `Bearer <token>`. |



#### Success (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

#### Error (401 Unauthorized)
```json
{
  "message": "Unauthorized"
}
```

### Example Request
```bash
GET /users/logout HTTP/1.1
Authorization: Bearer JWT_TOKEN
```

### Example Response
```json
{
  "message": "Logged out successfully"
}
```
