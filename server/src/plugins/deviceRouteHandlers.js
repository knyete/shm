const DB = require("../dbApi/db")
const Bot = require("../bot/bot");



module.exports = () => {

    let internals = {
        leakTimeOut: 60000 * 10,
        leakLastRead: 0
    };

    // updates Ambiance values (e.g. temprature,humudity) sent from relevant device
    const updateAmbianceValues = async (request, h) => {

        DB.updateAmbianceValues(request.payload);

        return { response: "ok." }

    };


    const leakAlert = async (request, h) => {
        let now = Date.now();
        let msg = "Evde su sızıntısı tespit edildi!";

        if ((now - internals.leakLastRead) >= internals.leakTimeOut) {
            internals.leakLastRead = now;

            try {
                await Bot.sendMessageToAllUsers(msg);
            } catch (error) {
                console.error(error.message)
            }

        }

        return { response: "ok." }

    };




    return {
        updateAmbianceValues,
        leakAlert
    };

};