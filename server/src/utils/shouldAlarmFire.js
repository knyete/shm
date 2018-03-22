const DB = require("../dbApi/db");
const Utils = require("./utils");



const shouldAlarmFire=()=>{
    const isAlarmActivated=DB.getStatusOfAlarm();
    const areUsersAtHome=DB.getStatusOfUsers();
    const nightModeTimeRange=DB.getNightModeTimeRange();
    

}