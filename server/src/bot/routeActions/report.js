const DB = require("../../dbApi/db");

module.exports = () => {


    const generalReport = () => {

        let { areUsersAtHome,
            isAlarmActivated,
            nightModeTimeRange
        } = DB.parameters.getParameterValues();

        return `Kullanıcılar ${areUsersAtHome ? "-evde-" : "-evde değil-"}\n` +
            `Alarm ${isAlarmActivated ? "-devrede-" : "-devre dışı-"}\n`+
            `Gece modu ${nightModeTimeRange.start} ile ${nightModeTimeRange.end} arasında.`
    };



    return {

        getReportActions() {
            return {
                generalReport
            };
        }
    }



};