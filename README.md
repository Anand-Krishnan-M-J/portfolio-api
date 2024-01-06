# My Portfolio Node API

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

This repository contains the backend code for my personal portfolio. The API was initially deployed on Heroku, and later migrated to AWS's free tier when Heroku's free tier was removed. However, due to the overhead of maintaining a database, the deployment was eventually dismantled.

## Technologies Used

- Node.js v16.14.0
- npm v8.3.1
- Docker
- PostgreSQL
- Express v4.18.1

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone git@github.com:Anand-Krishnan-M-J/portfolio-api.git
   cd portfolio-api.git
   npm install
   npm run dev
   ```
2. Run linting checks:
  ```bash
  npm run lint
  ```
3. Run the Application in Production
  ```
npm run build
npm start
