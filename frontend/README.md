# WeSync Frontend


Welcome to the frontend of WeSync, a social networking platform that allows users to connect with friends and the world around them. This project is built using React and integrates with a Flask backend.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)

## Installation

To get started with the frontend, follow these steps:

1. Clone the repository:

   ```sh
   git clone ${repo}
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

## Usage

To run the frontend application locally, use the following command:

```sh
npm start
```

This will start the development server and open the application in your default web browser. The app will be available at `http://localhost:3000`.

## Project Structure

The project structure is organized as follows:

```
frontend/
├── public/
│   ├── index.html
│   └── assets/
│       └── dist/
│           └── css/
│               └── bootstrap.min.css
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── custom-styles.css
│   ├── components/
│   │   ├── errors/
│   │   │   └── NotFound.js
│   │   ├── PrivateRoute.js
│   │   └── SideBar.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Profile.js
│   │   ├── SignIn.js
│   │   ├── SignUp.js
│   │   ├── Feed.js
│   │   ├── NewPost.js
│   │   ├── NewComment.js
│   │   ├── Comments.js
│   │   ├── Followers.js
│   │   ├── Following.js
│   │   ├── Users.js
│   │   ├── SearchUsers.js
│   │   └── UpdateProfile.js
│   ├── utils/
│   │   └── api.js
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Available Scripts

In the project directory, you can run the following scripts:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run eject`

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Dependencies

The project relies on the following main dependencies:

- `axios`: ^1.7.7
- `bootstrap`: ^5.3.3
- `react-router-dom`: ^6.26.2
- `react-scripts`: ^5.0.1 (dev dependency)

For a complete list of dependencies, refer to the `package.json` file.
