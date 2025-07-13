# API Test Cases

## User Registration

### Successful Registration
**POST** `/auth/register`
**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
**Expected Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "user": {
    "email": "test@example.com",
    "_id": "60f8e2b2c4f8a0a8d0e8e8e8",
    "createdAt": "2021-07-22T12:00:00.000Z"
  }
}
```

### Invalid Email
**POST** `/auth/register`
**Request Body:**
```json
{
  "email": "invalid-email",
  "password": "password123"
}
```
**Expected Response:** `400 Bad Request`
```json
{
  "error": "\"email\" must be a valid email"
}
```

## User Login

### Successful Login
**POST** `/auth/login`
**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
**Expected Response:** `200 OK`
```json
{
  "token": "your-jwt-token"
}
```

### Invalid Credentials
**POST** `/auth/login`
**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "wrongpassword"
}
```
**Expected Response:** `401 Unauthorized`
```json
{
  "error": "Invalid credentials"
}
```

## Team Management

### Create Team - Successful
**POST** `/teams`
**Headers:** `Authorization: Bearer <your-jwt-token>`
**Request Body:**
```json
{
  "name": "My Awesome Team",
  "players": [
    {"name": "MS Dhoni", "role": "Wicket-Keeper", "cost": 15},
    {"name": "Virat Kohli", "role": "Batsman", "cost": 18},
    {"name": "Rohit Sharma", "role": "Batsman", "cost": 16},
    {"name": "KL Rahul", "role": "Batsman", "cost": 14},
    {"name": "Hardik Pandya", "role": "All-Rounder", "cost": 12},
    {"name": "Ravindra Jadeja", "role": "All-Rounder", "cost": 11},
    {"name": "Jasprit Bumrah", "role": "Bowler", "cost": 13},
    {"name": "Mohammed Shami", "role": "Bowler", "cost": 10},
    {"name": "Yuzvendra Chahal", "role": "Bowler", "cost": 9},
    {"name": "Bhuvneshwar Kumar", "role": "Bowler", "cost": 8},
    {"name": "Rishabh Pant", "role": "Wicket-Keeper", "cost": 13}
  ]
}
```
**Expected Response:** `201 Created`
```json
{
  "message": "Team created successfully",
  "team": {
    "_id": "60f8e2b2c4f8a0a8d0e8e8e9",
    "name": "My Awesome Team",
    "user": "60f8e2b2c4f8a0a8d0e8e8e8",
    "players": [...],
    "createdAt": "2021-07-22T12:00:00.000Z",
    "updatedAt": "2021-07-22T12:00:00.000Z"
  }
}
```

### Create Team - Budget Exceeded
**POST** `/teams`
**Headers:** `Authorization: Bearer <your-jwt-token>`
**Request Body:** (Total cost > 100)
**Expected Response:** `400 Bad Request`
```json
{
  "error": "Team budget exceeded. Maximum is 100 credits."
}
```

### Update Team - Successful
**PUT** `/teams/:id`
**Headers:** `Authorization: Bearer <your-jwt-token>`
**Request Body:**
```json
{
  "name": "My Updated Team",
  "players": [...]
}
```
**Expected Response:** `200 OK`
```json
{
  "message": "Team updated successfully",
  "team": { ... }
}
```

### Get Team - Successful
**GET** `/teams/:id`
**Headers:** `Authorization: Bearer <your-jwt-token>`
**Expected Response:** `200 OK`
```json
{
  "team": { ... }
}
```

### Get All Teams - Successful
**GET** `/teams`
**Headers:** `Authorization: Bearer <your-jwt-token>`
**Expected Response:** `200 OK`
```json
{
  "teams": [
    { ... },
    { ... }
  ]
}
