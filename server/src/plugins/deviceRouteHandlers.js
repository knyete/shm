const DB = require("../dbApi/db").getControlers()




module.exports = () => {

    // updates temprature and humudity values sent from relevant device
    const updateAmbianceValues = async (request, h) => {

        DB.updateAmbianceValues(request.payload);
        //console.log(request.payload);

        return { response: "ok." }

    };

    const leakAlert = async (request, h) => {
        console.log("leak alert");
        return { response: "ok." }
    }




    return {
        updateAmbianceValues,
        leakAlert
    };

};