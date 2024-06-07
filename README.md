# gitAGrep CS35L Spring 2024

## **Welcome to the Bruin Book Exchange Repository!**
#### The Bruin Book Exchange is an easy way to find others who would like to dive into a new book while also sharing one of their books with others!

## Features
- **Login and Account Creation**

- **Ability to create posts** containing books you are looking to exchange

- **User Ratings** indicate how many successful exchanges a user has been involved in

- **Catalog Page** allowing for search for books by title and author

- **Book Info Page** displaying information that will be entered when posting a new book listing

- **DM Page**
    - Exchange Requested functions such as accepting or rejecting a request
    - Confirmation of offering for the initiator of an exchange
    - A final confirmation button
    - A mark as read button to indicate when a party finishes their book
    - Confirm Re-exchange for when both parties finish their new books!

# Technologies
This application utilizes the MERN stack for all of its functions. All dependencies are contained within:

- MongoDB
- Express
- React
- Node

# Setup
The application requires very little setup.

The first step is to cd into the backend and create a .env file
```
cd backend
touch .env
```
This will be used to route the data to the correct MongoDB database.

We will then place this into the .env file in order to connect to the MongoDB database

```
MONGO_URI = mongodb://127.0.0.1:27017
PORT = 4000
MAXIMUM_EDIT_DISTANCE = 20
FORGOT_PASS_EXPIRATION_TIME_HOURS = 10

EMAIL_USER=bookexchangeucla@gmail.com
EMAIL_PASSWORD=dpbg rxie ivvk mevl

JWT_SECRET=chocolateisthebest
TOKEN_HEADER_KEY=Authorization
```

Once this has been inserted, you may run npm install and then npm start in the command line in both backend and frontend in order to start both sides of the application. 

From here the app should be ready to run :).


