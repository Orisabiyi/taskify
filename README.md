# Taskify API Documentation

**Taskify** is a task management API built using **NodeJS**, **MongoDB** and **Express** which the main technology stack. This API allow users to create, manage, update and delete tasks, providing an efficient way to organize daily activities.

**Current Version:** 1.0.0

## Major Prerequisities

- Node.Js (version 16.x or higher)
- MongoDB (locally or the cloud database)
- Thunder Client or any API testing tool

## Installation and Setup

1. Clone the repository directly from my github
   or Fork the repo and clone

2. Install the dependencies using `pnpm install`

3. Set up environment variables using by creating a `.env` file with the following details.

```env
PORT = 3000
DB_URL = mongodb_url
JWT_SECRET = <generated string>
JWT_REFRESH_TOKEN = <generated string>
```

4. Start the server using `pnpm run dev`

The API will run at `http://localhost:<PORT>`.

5. **Authentication**

Taskify API uses **JWT** (JSON Web Token) for authentication. To access certain routes such as the route for creating tasks, updating tasks etc, you need to provide a valid token in the request header.

6. **Endpoints Overview**

```
| Method  | Endpoint              | Description
| --------------------------------------------------------------
| POST    | /api/v1/auth/register |
| --------------------------------------------------------------
| POST    | /api/v1/auth/login    |
| --------------------------------------------------------------
|
```
