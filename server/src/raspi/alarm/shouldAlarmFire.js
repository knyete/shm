const DB = require("../../dbApi/db");
const Utils = require("../../utils/utils");



const shouldAlarmFire=()=>{
    
    const isAlarmActivated=DB.parameters.getStatusOfAlarm();
    const areUsersAtHome=DB.users.getStatusOfUsers();
    const nightModeTimeRange=DB.parameters.getNightModeTimeRange();

    let isNightModeActive=Utils.isHourInPeriod(nightModeTimeRange.start,nightModeTimeRange.end);


    if(isNightModeActive){
        return true;
    }else if (isAlarmActivated && areUsersAtHome){
        return false;
    } else if(!isAlarmActivated){
        return false;
    }else{
        return true;
    }

}

module.exports=()=>{
    return {
        shouldAlarmFire
    };
};