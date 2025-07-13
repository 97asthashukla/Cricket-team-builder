# API Test Cases

This document outlines the API endpoints, their expected payloads, and full responses for the Cricket Team Builder application.

## 1. User Authentication

### 1.1 User Registration

**Endpoint:** `POST /auth/register`

**Description:** Registers a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**Successful Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Error Response - Invalid Email Format (400 Bad Request):**
```json
{
  "error": "\"email\" must be a valid email"
}
```

**Error Response - Email Already Exists (400 Bad Request):**
```json
{
  "error": "Validation error"
}
```

### 1.2 User Login

**Endpoint:** `POST /auth/login`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**Successful Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3ODg4NjQwMCwiZXhwIjoxNjc4ODkwMDAwfQ.someRandomJwtToken"
}
```

**Error Response - Invalid Credentials (401 Unauthorized):**
```json
{
  "error": "Invalid credentials"
}
```

## 2. Player Management

### 2.1 Create Player

**Endpoint:** `POST /players`
**Headers:** `Authorization: Bearer <your-jwt-token>`

**Description:** Creates a new player. Requires authentication.

**Request Body:**
```json
{
  "name": "New Player",
  "role": "Batsman",
  "cost": 10
}
```

**Successful Response (201 Created):**
```json
{
  "message": "Player created successfully",
  "player": {
    "id": 1,
    "name": "New Player",
    "role": "Batsman",
    "cost": 10,
    "createdAt": "2025-07-13T12:00:00.000Z",
    "updatedAt": "2025-07-13T12:00:00.000Z"
  }
}
```

**Error Response - Validation Error (400 Bad Request):**
```json
{
  "error": "\"name\" is required"
}
```

### 2.2 Get All Players

**Endpoint:** `GET /players`
**Headers:** `Authorization: Bearer <your-jwt-token>`

**Description:** Retrieves a list of all players. Requires authentication.

**Successful Response (200 OK):**
```json
{
  "players": [
    {
      "id": 1,
      "name": "Player One",
      "role": "Batsman",
      "cost": 10,
      "createdAt": "2025-07-13T12:00:00.000Z",
      "updatedAt": "2025-07-13T12:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Player Two",
      "role": "Bowler",
      "cost": 8,
      "createdAt": "2025-07-13T12:00:00.000Z",
      "updatedAt": "2025-07-13T12:00:00.000Z"
    }
  ]
}
```

## 3. Team Management

### 3.1 Create Team

**Endpoint:** `POST /teams`
**Headers:** `Authorization: Bearer <your-jwt-token>`

**Description:** Creates a new team with selected players. Requires authentication.

**Request Body:**
```json
{
  "name": "My Dream Team",
  "players": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
}
```

**Successful Response (201 Created):**
```json
{
  "id": 1,
  "name": "My Dream Team",
  "userId": 1,
  "createdAt": "2025-07-13T12:00:00.000Z",
  "updatedAt": "2025-07-13T12:00:00.000Z",
  "players": [
    {
      "id": 1,
      "name": "Player One",
      "role": "Batsman",
      "cost": 10,
      "createdAt": "2025-07-13T12:00:00.000Z",
      "updatedAt": "2025-07-13T12:00:00.000Z"
    }
    // ... more player objects
  ]
}
```

**Error Response - One or More Players Not Found (400 Bad Request):**
```json
{
  "error": "One or more players not found."
}
```

**Error Response - Team Validation Failed (400 Bad Request):**
```json
{
  "error": "A team must have at least 1 wicket-keeper."
}
```

**Error Response - Team Budget Exceeded (400 Bad Request):**
```json
{
  "error": "Team budget exceeded. Maximum is 100 credits."
}
```

### 3.2 Update Team

**Endpoint:** `PUT /teams/:id`
**Headers:** `Authorization: Bearer <your-jwt-token>`

**Description:** Updates an existing team. Requires authentication and ownership.

**Request Body:**
```json
{
  "name": "My Updated Team",
  "players": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
}
```

**Successful Response (200 OK):**
```json
{
  "id": 1,
  "name": "My Updated Team",
  "userId": 1,
  "createdAt": "2025-07-13T12:00:00.000Z",
  "updatedAt": "2025-07-13T12:00:00.000Z",
  "players": [
    {
      "id": 1,
      "name": "Player One",
      "role": "Batsman",
      "cost": 10,
      "createdAt": "2025-07-13T12:00:00.000Z",
      "updatedAt": "2025-07-13T12:00:00.000Z"
    }
    // ... more player objects
  ]
}
```

**Error Response - Team Not Found (404 Not Found):**
```json
{
  "error": "Team not found"
}
```

**Error Response - Validation/Players Not Found (400 Bad Request):**
```json
{
  "error": "One or more players not found."
}
```
*(Can also be team validation errors like budget or role count)*

### 3.3 Get Team by ID

**Endpoint:** `GET /teams/:id`
**Headers:** `Authorization: Bearer <your-jwt-token>`

**Description:** Retrieves a specific team by its ID. Requires authentication and ownership.

**Successful Response (200 OK):**
```json
{
  "team": {
    "id": 1,
    "name": "My Dream Team",
    "userId": 1,
    "createdAt": "2025-07-13T12:00:00.000Z",
    "updatedAt": "2025-07-13T12:00:00.000Z",
    "players": [
      {
        "id": 1,
        "name": "Player One",
        "role": "Batsman",
        "cost": 10,
        "createdAt": "2025-07-13T12:00:00.000Z",
        "updatedAt": "2025-07-13T12:00:00.000Z"
      }
      // ... all 11 player objects
    ]
  }
}
```

**Error Response - Team Not Found (404 Not Found):**
```json
{
  "error": "Team not found"
}
```

### 3.4 Get All Teams

**Endpoint:** `GET /teams`
**Headers:** `Authorization: Bearer <your-jwt-token>`

**Description:** Retrieves a list of all teams owned by the authenticated user. Requires authentication.

**Successful Response (200 OK):**
```json
{
  "teams": [
    {
      "id": 1,
      "name": "My Dream Team",
      "userId": 1,
      "createdAt": "2025-07-13T12:00:00.000Z",
      "updatedAt": "2025-07-13T12:00:00.000Z",
      "players": [
        {
          "id": 1,
          "name": "Player One",
          "role": "Batsman",
          "cost": 10,
          "createdAt": "2025-07-13T12:00:00.000Z",
          "updatedAt": "2025-07-13T12:00:00.000Z"
        }
        // ... all 11 player objects for this team
      ]
    },
    {
      "id": 2,
      "name": "Another Team",
      "userId": 1,
      "createdAt": "2025-07-13T12:05:00.000Z",
      "updatedAt": "2025-07-13T12:05:00.000Z",
      "players": [] // Can be empty if no players added yet
    }
  ]
}
