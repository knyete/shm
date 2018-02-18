const DB=require("../dbApi/db").getControlers()


// updates temprature and humudity values sent from relevant device
const updateAmbianceValues=async (request, h)=>{

    DB.updateAmbianceValues(request.payload);
    console.log(request.payload);

    return {response:"ok."}

};

module.exports={
    updateAmbianceValues
};