
getLocalTime=()=>{
    const date = new Date();
    let dt = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} - ${date.toLocaleTimeString()}`;
    return dt;
};


module.exports={
    getLocalTime
}