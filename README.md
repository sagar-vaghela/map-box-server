# Node.js | Express.js | Error Handling

Node.js is a versatile, open-source, cross-platform JavaScript runtime environment. This project is an Express.js application configured with ESLint and Prettier for code linting and formatting

_Linters:_ ESLint and Prettier.

## Project structure

The app has the following structure:

`controller`, `middleware`, `routes` and `database`

- `controller`: Manages application logic and handles user requests.
- `middleware`: Acts as intermediaries for request and response processing.
- `routes`: Define endpoints and map them to controller functions.
- `database`: Manages persistent data storage and retrieval using Postgres.

### Tasks : What I done.

1. The blog Application was created using ExpressJs with Node.
2. Implemented server creation, database connection, controllers, routes, and middleware for error handling.
3. Added ESLint and Prettier for code linting.
4. App perform like below step,
   - Create server
     - The application creates an Express.js server.
   - Conncetion with db
     - Established a connection with the database located in the db/ directory.
   - controller
     - Implemented controllers for handling different aspects of the application logic.
   - Routes
     - Defined routes for the application.
     - Routes are implemented, and an index file manages the overall routing structure.
   - Middleware
     - Error Handling
     - Middleware is configured to handle errors in the application.
5. Setup ESLint for Code standardization.
6. Setup Prettier for Code format.
7. WriteTechnical documentation on README.md file for better understading.

### Notes

- Setup ESLint for Code standardization.
- Setup Prettier for Code format.

## Prerequisites

To set up the codebase and the required dependencies, simply run the following command.

```bash
$ npm i
```

## mapboxBackup

for database refer to this file 'mapboxBackup'

## Running the app

```bash
# development
$ npm run start

# production
$ npm run build && npm run start
```
