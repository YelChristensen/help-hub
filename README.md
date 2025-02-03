# Good Life Sorted Challenge App

This is a MERN stack application that utilizes MongoDB, Express, React, and Node.js. The application is structured into a backend and a frontend, each with its own configuration and dependencies.

## Project Structure

```
good-life-sorted-technical-challenge
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── app.js
│   │   └── config
│   ├── package.json
│   └── .env
├── frontend
│   ├── components
│   │   ├── ButtonsContainer.js
│   │   ├── Header.js
│   │   ├── ListOpportunities.js
│   │   ├── LoadingSpinner.js
│   │   ├── Opportunity.js
│   │   └── SomeComponent.js
│   ├── pages
│   │   ├── _app.js
│   │   ├── index.js
│   ├── styles
│   │   ├── App.css
│   │   ├── pages
│   │   │   └── Index.module.css
│   │   ├── components
│   │   │   ├── ButtonsContainer.module.css
│   │   │   ├── Shared.module.css
│   ├── api
│   │   ├── axiosInstance.js
│   │   └── opportunities.js
│   ├── package.json
│   └── .env.local
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/help-hub.git
   cd help-hub
   ```

2. Install dependencies for the backend:

   ```sh
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:

   ```sh
   cd ../frontend
   npm install
   ```

4. Install dependencies for the root:
   ```sh
   cd ..
   npm install
   ```

## Running the Application Locally

1. Start the backend and frontend servers concurrently:

npm run dev

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Demo

https://hub-help-app-a62238e0c7ce.herokuapp.com/

## License

This project is licensed under the ISC License.
