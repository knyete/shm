const Charts = require("./src/charts");
const Mongoose = require('mongoose');
const Config = require('config');

// Use native promises
Mongoose.Promise = global.Promise;


const main = async () => {

    //connect to mongoDB
    await Mongoose.connect(Config.get('mongoDB.url'))
        .then(() => console.log("MongoDB Connected..."));

    let p = await Charts.hourlyTempAndHum();
    console.log(p);

};



main().then(() => {
    console.log("Finished!!!")
    process.exit(0);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});