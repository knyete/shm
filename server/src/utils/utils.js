const {exec}=require("child_process");


getLocalTime=()=>{
    const date = new Date();
    let dt = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} - ${date.toLocaleTimeString()}`;
    return dt;
};

function sleep(timeout) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, timeout)
    });
  }

  const promisedExec=(comm)=>{

    return new Promise((resolve, reject)=>{

        exec(comm,(err, stdout, stderr)=>{
            
            if(err){
                reject(err);
            }

            resolve(stdout);
        });
    });

};


module.exports={
    getLocalTime,
    sleep,
    promisedExec
}