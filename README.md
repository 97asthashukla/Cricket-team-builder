# Cricket Team Builder API

This is a RESTful API for a fantasy cricket team builder that allows users to create and manage their fantasy teams.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cricket-team-builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   - The application uses SQLite and will create a `development.sqlite` file in the project root.
   - Run migrations and seeders:
     ```bash
     npx sequelize-cli db:migrate
     npx sequelize-cli db:seed:all
     ```

4. **Start the server:**
   ```bash
   npm start
   ```
   The server will be running on `http://localhost:3000`.

## API Documentation

### Swagger UI
Access the API documentation and test endpoints directly in your browser at:
`http://localhost:3000/api-docs`

To authorize requests in Swagger UI:
1. Click on the "Authorize" button (usually a lock icon) at the top right of the page.
2. In the dialog box, enter your JWT obtained from the `/auth/login` endpoint in the format `Bearer YOUR_TOKEN_HERE`.
3. Click "Authorize" and then "Close". Your token will now be used for all subsequent authenticated requests.

### Authentication

- **JWT (JSON Web Tokens)** are used for authentication.
- Include the token in the `Authorization` header for protected endpoints: `Authorization: Bearer <your-jwt-token>`.

### Endpoints

#### `POST /auth/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: `201 Created` with user details.

#### `POST /auth/login`
- **Description**: Logs in a user and returns a JWT.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK` with a JWT.

#### `POST /teams`
- **Description**: Creates a new fantasy team.
- **Authentication**: Required.
- **Request Body**:
  ```json
  {
    "name": "My Fantasy Team",
    "players": [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
    ]
  }
  ```
- **Response**: `201 Created` with team details.

#### `PUT /teams/:id`
- **Description**: Updates an existing fantasy team.
- **Authentication**: Required.
- **Request Body**:
  ```json
  {
    "name": "My Updated Team",
    "players": [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
    ]
  }
  ```
- **Response**: `200 OK` with team details.

#### `GET /teams`
- **Description**: Retrieves all teams for the logged-in user.
- **Authentication**: Required.
- **Response**: `200 OK` with a list of teams.

#### `GET /teams/:id`
- **Description**: Retrieves the details of a specific team.
- **Authentication**: Required.
- **Response**: `200 OK` with team details.

#### `POST /players`
- **Description**: Creates a new player.
- **Authentication**: Required.
- **Request Body**:
  ```json
  {
    "name": "New Player",
    "role": "Batsman",
    "cost": 10
  }
  ```
- **Response**: `201 Created` with player details.

#### `GET /players`
- **Description**: Retrieves all players.
- **Authentication**: Required.
- **Response**: `200 OK` with a list of players.
