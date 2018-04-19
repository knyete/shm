const Handlers=require("./deviceRouteHandlers");

const handlers=Handlers();

const register=async function (server, options) {


    server.route({
        method: "POST",
        path: "/api/devices/ambiance",
        handler: handlers.updateAmbianceValues
    });

    server.route({
        method:"POST",
        path:"/api/devices/leakAlert",
        handler:handlers.leakAlert
    });

    server.route({
        method:"POST",
        path:"/api/devices/doorAlert",
        handler:handlers.doorAlert
    });
    
};



const plugin={
    name:"devicesPlugin",
    register

}

module.exports=plugin;