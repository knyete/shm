const DB=require("../dbApi/db").getControlers()


// updates temprature and humudity values sent from relevant device
const updateTempAndHum=async (request, h)=>{

    //DB.updateTempAndHum(request.payload);
    console.log(request.payload);

    return {response:"ok."}

};



module.exports={
    updateTempAndHum
};