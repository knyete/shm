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

isHourInPeriod=(start,end,hour)=>{
    const hours=[];
	end+=1;
	for(let i=start;i!=end;i++){	
		if(i==24){
			i=0;
		}
		hours.push(i);
    }
    
    if (hours.length==0){
        return false;
    }

    return (hours.indexOf(hour)>=0);
};


module.exports={
    getLocalTime,
    sleep,
    promisedExec,
    isHourInPeriod
}