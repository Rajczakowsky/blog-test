# Twinkl Blog Exercise Application

Welcome to the Twinkl Blog exercise application!

## Features

- Fetches posts data using the `useGetPosts` hook.
- Allows users to search posts by title and body content.
- Allows users to delete posts using the `useDeletePosts` hook.
- Displays the number of posts found based on the search query.
- Handles loading and error states during data fetching and deletion.

## Installation

To get started with the project, clone the repository and install the dependencies.

# Getting Started
### Prerequisites
- Node.js: Ensure you have Node.js version 20 or higher installed.

### Installation
#### Clone the repository:

```
git clone https://github.com/twinkltech/twinkl-react-tech-test.git
```
```
cd twinkl-react-tech-test
```

#### Install dependencies:
``` 
yarn
```

### Scripts
#### Development Server: Start the development server.
```
yarn dev
```

#### Lint: Lint the codebase.
```
yarn lint
```

#### Lint & Fix: Lint and automatically fix issues in the codebase.
```
yarn lint:fix
```

#### Format: Format the codebase using Prettier.
```
yarn format
```

#### Test: Run the test suite.
```
yarn test
```

### Test coverage

Project includes vitest unit tests coverage.

```
yarn test:coverage
```


### Documentation

Generate better-docs/markdown with

```
yarn docs
```

## Comments

- **State Management**: Storing fetched data in state locally only for the purpose of being able to show deletion of posts, as the fake API is not actually changing the data. This would not be necessary in a real scenario.
- **Data Fetching**: Chose React Query for fetching the data to speed up the process and have caching out of the box.
- **Confirmation Dialog**: Selected a small confirmation/alert library `react-confirm-alert`. With more time, a component like this (modal) would be created as part of the components library.

## More Improvements/Features

- **Virtual Scrolling**: Consider virtually loading items on scroll if the list becomes much longer. Alternatively, having pagination on the API side would be great to fetch posts in batches.
- **UI Library**: Use a UI library for components if more elements are needed and more time is available.
- **Scroll to Top Button**: Add a "scroll to top" button for better user experience.