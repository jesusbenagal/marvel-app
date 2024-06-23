# Marvel App

Marvel App built with React 18 and the Marvel API.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Run Tests](#run-tests)
- [E2E Tests](#e2e-tests)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a React application that utilizes the Marvel API to display information about Marvel characters, comics, and more. 

## Features

- Browse Marvel characters
- View character details
- Search for specific characters

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/jesusbenagal/marvel-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd marvel-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add the following environment variables:
    ```bash
    VITE_MARVEL_API_PUBLIC_KEY=YOUR_PUBLIC_KEY
    VITE_MARVEL_API_PRIVATE_KEY=YOUR_PRIVATE_KEY
    ```
    Replace `YOUR_PUBLIC_KEY` and `YOUR_PRIVATE_KEY` with your own Marvel API keys.


## Usage

1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open your browser and visit `http://localhost:3000`

## Technologies Used

- React 18
- TypeScript
- Vite
- Marvel API
- useSWR
- React Spinners
- useHooksTS
- Vitest + @testing-library/react
- Playwright

## Run Tests

To run tests, run the following command:
```bash
npm run test
```

To run tests with coverage:
```bash
npm run test:coverage
```


To run tests in watch mode:
```bash
npm run test:watch
```

To run tests in ui mode:
```bash
npm run test:ui
```

## E2E Tests
To run E2E tests, run the following command for the first time:
```bash
npx playwright install
```

and then run the application with:
```bash
npm run dev
```

For running e2e tests, use the following command:
```bash
npm run test:e2e
```

For running in UI Mode:
```bash
npm run test:e2e:ui
```

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License.