const Handlers=require("./deviceRouteHandlers");

const register=async function (server, options) {


    server.route({
        method: "POST",
        path: "/api/devices/ambiance",
        handler: Handlers.updateAmbianceValues
    });
    
};



const plugin={
    name:"devicesPlugin",
    register

}

module.exports=plugin;