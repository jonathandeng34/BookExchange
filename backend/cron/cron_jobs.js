import schedule from 'node-schedule'
import mongoose from 'mongoose'
import ForgotPasswordModel from '../db_models/forgotpass_model.js';

function scheduleJobs() {
    //Schedule Removing Stale Forgot Password Requests Once A Day
    console.log("Setting up Cron Jobs");
    const removeStaleForgotPasswordRequestsJob = schedule.scheduleJob('0 0 * * *', () => {
        if(mongoose.connection.readyState != 1) {
            console.log("Skipping Forgot Password Stale Job: Mongoose DB not Connected");
            return;
        }
        ForgotPasswordModel.deleteMany({
            expirationDate: {
                $lte: new Date()
            }
        }).then(() => {
            console.log("Removed Stale Forgot Password Requests");
        }).catch((e) => {
            console.log("Internal Server Error while removing stale forgot password requests");
        });
    });
}

export default scheduleJobs;