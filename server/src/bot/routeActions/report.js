const DB = require("../../dbApi/db");

module.exports = () => {


    const generalReport = () => {

        let { areUsersAtHome,
            isAlarmActivated,
            nightModeTimeRange
        } = DB.parameters.getParameterValues();

        return `Users are ${areUsersAtHome ? "-at home-" : "-not at home-"}\n` +
            `Alarm is ${isAlarmActivated ? "-activated-" : "-not activated-"}\n`+
            `Night mode is between ${nightModeTimeRange.start} and ${nightModeTimeRange.end}.`
    };



    return {

        getReportActions() {
            return {
                generalReport
            };
        }
    }



};