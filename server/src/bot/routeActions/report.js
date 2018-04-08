const DB=require("../../dbApi/db");

module.exports=()=>{


    const generalReport=()=>{

        return "This is a general report"
    };





    return {
        
        getReportActions(){
            return{
                generalReport
            };
        }
    }



};