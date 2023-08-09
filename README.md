## Structure
The project's folder structure is as follows:
- components: Components such as Table and Filters - functions that return "building blocks" necessary to build a page, and that can be reusable if necessary.
- constants: Values that remain constant and are necessary throughout the entire project
- domain: The domain classes of the project, necessary to fully understand the objects we are manipulating
- mocks: Contains the datasource provided
- pages: Contains all the pages that the user can access in the application. In this case, it's just the main App.tsx.
- services: Contains classes responsible for actions that might be out of the scope of the components. It could be to call a backend server, or a utilitary class that is domain-agnostic. In this case, we only have FilteringService.ts, responsible for filtering the product list. 

### Domain Classes

![Domain Diagram](docs/images/diagram.png "Domain Diagram")

### Components
The UI library used was [Chakra UI](https://chakra-ui.com/), a lightweight React component library. It was my first time using it on an application, but I still decided to use it as I was looking to try it for a while. 

The Multiselect component does not belong to Chakra UI, but to this [open-source library](https://github.com/bmartel/chakra-multiselect). 

- ProductTable.tsx: this component consists of a simple Table, responsible for displaying all the products fetched from the datasource.

- Filters.tsx: this component consists of the three Filters (Property, Operator and Value), as well as a button to Clear all the Filters.

# How to use this application


## Install

Id this is your first time running this app, you need to first install all the dependencies necessary for running the project. You will also need to have Node >= 14 on your local development machine.

In order to install the dependencies, run `npm i`. This will create the folder "node_modules", which contains said dependencies.

## Start

In order to start this app, run `npm start`. This runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Test

In order to run the unit tests, run `npm test`. \
This launches the test runner in the interactive watch mode.\
See the documentation about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Build

In order to build the app for production, run `npm run build`.
This builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
The app is now ready to be deployed.

# Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
