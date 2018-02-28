const DB = require("../dbApi/db")




module.exports = () => {

    // updates Ambiance values (e.g. temprature,humudity) sent from relevant device
    const updateAmbianceValues = async (request, h) => {

        DB.updateAmbianceValues(request.payload);

        return { response: "ok." }

    };


    const leakAlert = async (request, h) => {

        return { response: "ok." }
    }




    return {
        updateAmbianceValues,
        leakAlert
    };

};