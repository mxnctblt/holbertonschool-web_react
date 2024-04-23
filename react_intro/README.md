# React intro

## Learning Objectives

- How to create a basic Javascript application using React
- How to use the package create-react-app to start developing quickly with React
- What JSX is and how to use it
- How to use the React Developer Tools to debug your code
- How to use Enzyme’s Shadow rendering to test your application
- How to use React with Webpack & Babel

## Tasks

### 0. Basic application

**Create a basic app named dashboard using create-react-app in your task_0 directory**

You will need a favicon and the Holberton logo. Download them and add them to the src/ directory under dashboard/

**Remove the unused files:**

- service-worker
- index.css
- App.test.js

**in task_0/dashboard/src/App.js, create a function App that returns:**

- a header div with a class named App-header containing the Holberton logo and a h1 with the text School dashboard
- a body div with a class named App-body containing at least one paragraph with the text Login to access the full dashboard
- a footer div with a class named App-footer containing at least one paragraph with the text Copyright 2020 - holberton School

**Modify the App.css to make the project looks like the following screenshot:**

![task 0](/react_intro/media/task_0_img.png)

### 1. Embedding expressions, functions

**Using your code from the previous task, in task_1/dashboard/src/utils.js:**

- Create a function named getFullYear that will return the current year
- Create a function named getFooterCopy:
  - It accepts one argument isIndex(boolean). When true, the function should return Holberton School. When false, the function should return Holberton School main dashboard
- Modify the footer returned in task_1/dashboard/src/App.js to use these two functions

**in task_1/dashboard/src/Notifications.js, create a Notifications element:**

- It should import React
- It should export a function
- The function should return a div with the class Notifications
- The div should contain a paragraph with the text Here is the list of notifications
- import the file Notifications.css.

**in task_1/dashboard/src/Notifications.css, style the Notifications class:**

- Add a border and some padding around the div

**Render the Notifications element:**

- Modify task_1/dashboard/src/index.js to render the new element (Notifications) in a div named root-notifications
- Check that you can see the two elements on the browser, and using the React browser extension

**Requirements:**

- When running, there should not be any lint error in the console
