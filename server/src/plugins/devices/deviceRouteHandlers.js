const DB = require("../../dbApi/db");
const Bot = require("../../bot/bot");
const Alarm = require("../../raspi/alarm/alarm");

// module stated for temporary calculations
let state = {
    leakTimeOut: 60000 * 10,
    leakLastRead: 0
};



module.exports = () => {


    // updates Ambiance values (e.g. temprature,humudity) sent from relevant device
    const updateAmbianceValues = async (request, h) => {

        DB.ambiance.updateAmbianceValues(request.payload);

        return { response: "ok." };

    };



    // triggred when there is a leak alert at home
    const leakAlert = async (request, h) => {

        let now = Date.now();
        let msg = "Evde su sızıntısı tespit edildi!";

        if ((now - state.leakLastRead) >= state.leakTimeOut) {
            state.leakLastRead = now;

            try {
                await Bot.sendMessageToAllUsers(msg);
                await Alarm.fire();
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

                Bot.sendMessageToAllUsers(msg);
                Alarm.fire();
            }

        } catch (error) {
            console.error(error.message);
        }


        return { response: "ok." };

    };

    const doorAlertTest = async (request, h) => {

        let msg = "Attention! Balcony door has been opened!";

        try {



            Bot.sendMessageToAllUsers(msg);
            Alarm.fire();


        } catch (error) {
            console.error(error.message);
        }


        return { response: "ok." };

    };


    return {
        updateAmbianceValues,
        leakAlert,
        doorAlert,
        doorAlertTest
    };

};