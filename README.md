# INTEMPORALIS SHOWCASE SITE - 2022

Intemporalis was a one-person company that provided web design and development services.
This structure allowed me to self-train in creating various websites and applications. My skills in this domain grew from no-code showcase sites to fullstack applications using Express.js and React.

This is the second showcase site I built for Intemporalis. I look at it as a training opportunity for fullstack development and experimenting new designs.

## FEATURES

### BACKEND: EXPRESS.JS SERVER

- Implementation of a server endpoint to send emails from the app,
- Server-side contact form validation,

### FRONTEND: REACT WEB CLIENT

- Component based Single Page Application
- Client-side validation for contact form,
- State management with Redux and Immer,
- CSS animations,
- Bundling of client-side code with Webpack,

## HOW TO DEPLOY THIS APP ON YOUR MACHINE

1. Copy the contents of .env.template in a newly created .env file at the root of the project. You may leave the SENDGRID_API_KEY empty since the sender email no longer exists for the contact form no longer exists. Altough it is not required, you may edit the other fields to your convenience.

2. Install Node.js on your machine if you do not already have it. Execute the command "npm i" in a terminal at the project's location.

3. Execute the command "npm run dev-watch" at the project's location.

4. In your browser, go to the following url: "http://localhost:8080/" or use the link provided in your console by webpack.
   Enjoy !
