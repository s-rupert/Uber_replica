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

---

## Endpoint: `/captains/register`

### Description
This endpoint is used to register a new captain in the system. It validates the input data, hashes the password, and creates a new captain record in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the captain details.

### Method
`POST`

### Request Body
The request body must be in JSON format and include the following fields:

| Field                  | Type   | Required | Description                              |
|------------------------|--------|----------|------------------------------------------|
| `fullname.firstname`   | String | Yes      | The first name of the captain (min 3 characters). |
| `fullname.lastname`    | String | Yes      | The last name of the captain (min 3 characters).  |
| `email`                | String | Yes      | A valid email address.                   |
| `password`             | String | Yes      | A password with at least 6 characters.   |
| `vehicle.color`        | String | Yes      | The color of the vehicle (min 3 characters). |
| `vehicle.plate`        | String | Yes      | The plate number of the vehicle (min 3 characters). |
| `vehicle.capacity`     | Number | Yes      | The capacity of the vehicle (minimum 1). |
| `vehicle.vehicleType`  | String | Yes      | The type of the vehicle (`car` or `motorcycle`). |

### Validation Rules
- `fullname.firstname`: Must be at least 3 characters long.
- `fullname.lastname`: Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.
- `vehicle.color`: Must be at least 3 characters long.
- `vehicle.plate`: Must be at least 3 characters long.
- `vehicle.capacity`: Must be a number greater than or equal to 1.
- `vehicle.vehicleType`: Must be either `car` or `motorcycle`.

### Response

#### Success (201 Created)
```json
{
  "token": "JWT_TOKEN",
  "captain": {
    "_id": "CAPTAIN_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
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
POST /captains/register HTTP/1.1
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f1c2e4b5d6c2a1b8e4f123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## Endpoint: `/captains/login`

### Description
This endpoint is used to authenticate a captain. It validates the input data, checks the email and password, and returns a JSON Web Token (JWT) if the credentials are valid.

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
  "captain": {
    "_id": "CAPTAIN_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
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
POST /captains/login HTTP/1.1
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
  "captain": {
    "_id": "64f1c2e4b5d6c2a1b8e4f123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## Endpoint: `/captains/profile`

### Description
This endpoint is used to retrieve the profile of the authenticated captain. The captain must be logged in and provide a valid JWT token.

### Method
`GET`

### Headers
| Header            | Type   | Required | Description                              |
|-------------------|--------|----------|------------------------------------------|
| `Authorization`   | String | Yes      | A valid JWT token in the format `Bearer <token>`. |

### Response

#### Success (200 OK)
```json
{
  "_id": "CAPTAIN_ID",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
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
GET /captains/profile HTTP/1.1
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
  "email": "johndoe@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

## Endpoint: `/captains/logout`

### Description
This endpoint is used to log out the authenticated captain. It clears the JWT token from cookies and blacklists the token to prevent reuse.

### Method
`GET`

### Headers
| Header            | Type   | Required | Description                              |
|-------------------|--------|----------|------------------------------------------|
| `Authorization`   | String | Yes      | A valid JWT token in the format `Bearer <token>`. |

### Response

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
GET /captains/logout HTTP/1.1
Authorization: Bearer JWT_TOKEN
```

### Example Response
```json
{
  "message": "Logged out successfully"
}
```

---

## Endpoint: `/maps/get-coordinates`

### Description
This endpoint retrieves the geographical coordinates (latitude and longitude) for a given address.

### Method
`GET`

### Query Parameters
| Parameter | Type   | Required | Description                              |
|-----------|--------|----------|------------------------------------------|
| `address` | String | Yes      | The address to retrieve coordinates for (min 3 characters). |

### Validation Rules
- `address`: Must be a string with at least 3 characters.

### Response

#### Success (200 OK)
```json
{
  "coordinates": {
    "lat": 37.7749,
    "lng": -122.4194
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Error message describing the validation issue",
      "param": "address",
      "location": "query"
    }
  ]
}
```

#### Error (404 Not Found)
```json
{
  "message": "Failed to get coordinates"
}
```

### Example Request
```bash
GET /maps/get-coordinates?address=San%20Francisco HTTP/1.1
```

### Example Response
```json
{
  "coordinates": {
    "lat": 37.7749,
    "lng": -122.4194
  }
}
```

---

## Endpoint: `/maps/get-distance`

### Description
This endpoint calculates the distance and duration between two geographical locations.

### Method
`GET`

### Query Parameters
| Parameter      | Type   | Required | Description                              |
|----------------|--------|----------|------------------------------------------|
| `origin`       | String | Yes      | The starting location (min 3 characters). |
| `destination`  | String | Yes      | The destination location (min 3 characters). |

### Validation Rules
- `origin`: Must be a string with at least 3 characters.
- `destination`: Must be a string with at least 3 characters.

### Response

#### Success (200 OK)
```json
{
  "distance": {
    "distance": {
      "text": "10.5 km",
      "value": 10500
    },
    "duration": {
      "text": "15 mins",
      "value": 900
    }
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
      "location": "query"
    }
  ]
}
```

#### Error (500 Internal Server Error)
```json
{
  "message": "Failed to get distance"
}
```

### Example Request
```bash
GET /maps/get-distance?origin=New%20York&destination=Boston HTTP/1.1
```

### Example Response
```json
{
  "distance": {
    "distance": {
      "text": "10.5 km",
      "value": 10500
    },
    "duration": {
      "text": "15 mins",
      "value": 900
    }
  }
}
```

---

## Endpoint: `/maps/get-suggestions`

### Description
This endpoint provides autocomplete suggestions for a given input query.

### Method
`GET`

### Query Parameters
| Parameter | Type   | Required | Description                              |
|-----------|--------|----------|------------------------------------------|
| `input`   | String | Yes      | The input query for autocomplete suggestions (min 3 characters). |

### Validation Rules
- `input`: Must be a string with at least 3 characters.

### Response

#### Success (200 OK)
```json
{
  "suggestions": [
    {
      "description": "San Francisco, CA, USA",
      "place_id": "ChIJIQBpAG2ahYAR_6128GcTUEo"
    },
    {
      "description": "San Francisco International Airport (SFO), San Mateo County, CA, USA",
      "place_id": "ChIJVVVVV2J3j4ARzZ1iG8j4GmQ"
    }
  ]
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Error message describing the validation issue",
      "param": "input",
      "location": "query"
    }
  ]
}
```

#### Error (500 Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

### Example Request
```bash
GET /maps/get-suggestions?input=San%20Fran HTTP/1.1
```

### Example Response
```json
{
  "suggestions": [
    {
      "description": "San Francisco, CA, USA",
      "place_id": "ChIJIQBpAG2ahYAR_6128GcTUEo"
    },
    {
      "description": "San Francisco International Airport (SFO), San Mateo County, CA, USA",
      "place_id": "ChIJVVVVV2J3j4ARzZ1iG8j4GmQ"
    }
  ]
}
```

---

## Endpoint: `/rides/create`

### Description
This endpoint is used to create a new ride request. It calculates the fare based on the pickup and destination locations and assigns the ride to a user.

### Method
`POST`

### Request Body
The request body must be in JSON format and include the following fields:

| Field          | Type   | Required | Description                              |
|----------------|--------|----------|------------------------------------------|
| `pickup`       | String | Yes      | The pickup location (min 3 characters). |
| `destination`  | String | Yes      | The destination location (min 3 characters). |
| `vehicleType`  | String | Yes      | The type of vehicle (`car` or `motorcycle`). |

### Validation Rules
- `pickup`: Must be a string with at least 3 characters.
- `destination`: Must be a string with at least 3 characters.
- `vehicleType`: Must be either `car` or `motorcycle`.

### Response

#### Success (201 Created)
```json
{
  "_id": "RIDE_ID",
  "user": "USER_ID",
  "pickup": "Pickup Location",
  "destination": "Destination Location",
  "fare": 15.5,
  "status": "pending",
  "otp": "123456"
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

#### Error (500 Internal Server Error)
```json
{
  "message": "Failed to create ride",
  "error": "Detailed error message"
}
```

### Example Request
```bash
POST /rides/create HTTP/1.1
Content-Type: application/json
Authorization: Bearer JWT_TOKEN

{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

### Example Response
```json
{
  "_id": "64f1c2e4b5d6c2a1b8e4f123",
  "user": "64f1c2e4b5d6c2a1b8e4f124",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": 15.5,
  "status": "pending",
  "otp": "123456"
}
```

---

## Endpoint: `/rides/get-fare`

### Description
This endpoint calculates the estimated fare for a ride based on the pickup and destination locations.

### Method
`GET`

### Query Parameters
| Parameter      | Type   | Required | Description                              |
|----------------|--------|----------|------------------------------------------|
| `pickup`       | String | Yes      | The pickup location (min 3 characters). |
| `destination`  | String | Yes      | The destination location (min 3 characters). |

### Validation Rules
- `pickup`: Must be a string with at least 3 characters.
- `destination`: Must be a string with at least 3 characters.

### Response

#### Success (200 OK)
```json
{
  "car": 15.5,
  "motorcycle": 10.2
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Error message describing the validation issue",
      "param": "field_name",
      "location": "query"
    }
  ]
}
```

#### Error (500 Internal Server Error)
```json
{
  "message": "Failed to calculate fare"
}
```

### Example Request
```bash
GET /rides/get-fare?pickup=123%20Main%20St&destination=456%20Elm%20St HTTP/1.1
Authorization: Bearer JWT_TOKEN
```

### Example Response
```json
{
  "car": 15.5,
  "motorcycle": 10.2
}
```
