import express from 'express'
import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });
import connectDB from './config/db.js'
import Book from './db_models/book_model.js'
import User from './db_models/user_model.js'
import { BookController } from './controllers/book_controller.js'
import { UserController } from './controllers/user_controller.js'
import scheduleJobs from './cron/cron_jobs.js'
import { AuthController } from './controllers/auth_controller.js'
import { BookExchangeController } from './controllers/book_exchange_controller.js'
import { MessageController } from './controllers/message_controller.js'



const port = process.env.PORT || 5000;
const app = express()

connectDB()

app.use(express.json())

app.use('/book', BookController);
app.use('/user', UserController);
app.use('/auth', AuthController);
app.use('/bookexchange', BookExchangeController);
app.use('/message', MessageController);

// app.get('/test', (req, res) => {
//     res.json({
//         "test": [1, 2, "three", 4, "five"]
//     })
// });

// app.get('/register', (req, res) => {
//     res.json({
//         status: "success or fail"
//         //also send confirmation email
//     })
// });

// app.post('/register', async (req, res, next) => {
//     //console.log(req.body);
//     try {
//         const { username, password, email } = req.body;

//         const userExists = await User.exists({ email });

//         if (userExists) {
//             return res.status(400).json({error: 'User already exists'});
//         } 
//         const user = await User.create({
//             username,
//             password,
//             email
//         });
//         res.status(201).json({
//             _id: user._id,
//             username: user.username,
//             email: user.email
//         });
//     } catch (error) {
//         next(error);
//     }
// });


// app.get('/forgotpassword', (req, res) => {
//     res.json()
// });
// app.post('/forgotpassword', (req, res) => {
//      const newId = emails[emails.length-1].id+1;
//      const newEmail = Object.assign({id: newId}, req.body);
//      emails.push(newEmail);
//      fs.writeFile('./data/emailconfirmation.json', JSON.stringify(emails), (err) => {
//          res.status(201).json({
//              status: "success"
//          })
//      });
//  });





//First connect to the database. If that was successful,
//open the server to listen for HTTP requests.
mongoose.connection.once('open', () => {
    // Tell the app to start listening for API calls

    // GENERATE DUMMY DATA
//    generateDummyData();

    app.listen(port, () => {
        console.log("Server started on port " + port);
        //Cron Jobs
        scheduleJobs();    
    })
});

async function generateDummyData() {
    let bookCollectionLength = await Book.countDocuments({});
    if(!bookCollectionLength | bookCollectionLength == 0) {
        const dummyUser = new User({
            _id: new mongoose.Types.ObjectId('6643d77345389a92052ed220'),
            username: "Chocolate Enjoyer",
            password: "This should be encrypted btw",
            email: "hydroflask@g.ucla.edu",
            userRating: 5
        });
        const doc = await dummyUser.save();
        const dummyBook = new Book({
            title: "The Tales of Rende East",
            author: "Maanas G",
            genre: "Fantasy",
            isBookOutForExchange: false,
            bookOwner: doc._id
        });
        await dummyBook.save();
        console.log("Generated Dummy Data");
        return;
    }
    console.log("Skipping Dummy Data Generation since books collection has something in it already");
}

