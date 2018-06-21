const DB = require("../../dbApi/db");
const Bot = require("../../bot/bot");
const Alarm = require("../../raspi/alarm/alarm");
const AmbValuesM = require("../../models/ambiance");

// module stated for temporary calculations
let state = {
    leakTimeOut: 60000 * 10,
    leakLastRead: 0
};



module.exports = () => {

    // updates Ambiance values (e.g. temprature,humudity) sent from relevant device
    const saveAmbianceValues = async (request, h) => {

        try {
            const ambValues = new AmbValuesM({ ...request.payload });
            await ambValues.save();
        } catch (error) {
            console.log(error.message)
        }

        return { response: "ok." };

    };



    // triggred when there is a leak alert at home
    const leakAlert = async (request, h) => {

        let now = Date.now();
        let msg = "Evde su sızıntısı tespit edildi!";

        if ((now - state.leakLastRead) >= state.leakTimeOut) {
            state.leakLastRead = now;

            try {

                await Bot.sendMessageToAllUsers(msg); // returns promise
                await Alarm.fire(); // returns promise

            } catch (error) {
                console.error(error.message);
            }

        }

        return { response: "ok." };

    };

    const doorAlert = async (request, h) => {

        let msg = "Attention! Balcony door has been opened!";

        try {

            if (Alarm.shouldAlarmFire()) {

                await Bot.sendMessageToAllUsers(msg);
                await Alarm.fire();
            }

        } catch (error) {
            console.error(error.message);
        }


        return { response: "ok." };

    };

    const doorAlertTest = async (request, h) => {

        let msg = "Attention! Balcony door has been opened!";

        try {

            await Bot.sendMessageToAllUsers(msg);
            await Alarm.fire();

        } catch (error) {
            console.error(error.message);
        }


        return { response: "ok." };

    };

    const gasAlert = async (request, h) => {
        let msg = "Attention! Gas alert has been fired, check the house!";

        try {

            await Bot.sendMessageToAllUsers(msg);
            await Alarm.fire();

        } catch (error) {
            console.error(error.message);
        }


        return { response: "ok." };

    };


    return {
        saveAmbianceValues,
        leakAlert,
        doorAlert,
        gasAlert,
        doorAlertTest
    };

};