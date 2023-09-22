# Redux Store for State Management

[![Deploy](https://www.herokucdn.com/deploy/button.svg)]()

## Description

This project is part of Challenge #22 - an extra credit assignment that involves refactoring an e-commerce platform to use Redux for global state management instead of the Context API. Redux is a popular library for managing complex state in React applications, and this challenge helps us practice integrating it into our application.

## Table of Contents
- [Installation](#installation)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Mock-Up](#mock-up)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Support](#support)
- [Credits](#credits)
- [Contributors](#contributors)

## Installation

To install and run this application, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the project's root directory and run `npm install` to install the necessary dependencies.
3. Run `npm start` to start the development server.

## User Story

As a senior engineer working on an e-commerce platform, I want my platform to use Redux to manage global state instead of the Context API so that my website's state management is taken out of the React ecosystem.

## Acceptance Criteria

- The e-commerce platform uses Redux to manage global state.
- The React front end accesses the Redux store using a Redux provider.
- The app determines changes to its global state by passing reducers to a Redux store.
- The app extracts state data from the Redux store instead of using the Context API.
- The app dispatches actions using Redux instead of the Context API.

## Mock-Up

This section reviews the web application's general appearance and functionality.

The following animation shows how a user can register using the Signup page and then navigate to the Products page:

![A user registers on the Signup page and then navigates to the Products page, which displays images and descriptions of products.](./Assets/22-state-homework-demo-01.gif)

The following animation shows how the user can select a category, choose a product, view details about it on the product page, and add and remove it from their shopping cart:

![The user selects a category, chooses a product, views details about it on the product page, and adds it to and removes it from their shopping cart.](./Assets/22-state-homework-demo-02.gif)

Finally, the user can check out by going to their shopping cart, as shown in the following animation:

![The user checks out by going to their shopping cart.](./Assets/22-state-homework-demo-03.gif)

## Getting Started

For instructions to add Redux to your application, refer to the [Redux Fundamentals basic tutorial](https://redux.js.org/basics/basic-tutorial). Note that the documentation will refer to additional packages that you'll need to complete this implementation.

Be sure to review ALL of the documentation, because there are newer methods that can make these tools much easier to implement. React has gone through several iterations; as such, some React-and-Redux tutorials will assume that you aren't using Hooks.

You'll use the Stripe API to process payments, which includes making front-end and back-end changes. Don't worry, Stripe provides test credentials, so you won't need to use a real credit card to try it out. Refer to the [Stripe docs on testing your integration](https://stripe.com/docs/testing).

**Important**: The Challenge requires a specific version `(>=7.0)` of `npm` in order to install peer dependencies like GraphQL when deploying to Heroku. By default, Heroku uses `npm 6.x`, which may cause some issues. Be sure to refer to the [Heroku Docs on Specifying an NPM Version](https://devcenter.heroku.com/articles/nodejs-support#specifying-an-npm-version) to ensure your `package.json` file is set up correctly, as shown in the following snippet:

```json
{
  "engines": {
    "npm": "7.x"
  }
}

Technologies Used
React
Redux
Apollo Client
Stripe API
Support
If you need support or have any questions about the repo, please open an issue or contact me via email at hannahkchung88@gmail.com. You can find more of my work on my GitHub, AlanPaccor