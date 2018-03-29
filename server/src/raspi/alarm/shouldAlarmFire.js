const DB = require("../../dbApi/db");
const Utils = require("../../utils/utils");



const shouldAlarmFire=()=>{
    const isAlarmActivated=DB.getStatusOfAlarm();
    const areUsersAtHome=DB.getStatusOfUsers();
    const nightModeTimeRange=DB.getNightModeTimeRange();

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