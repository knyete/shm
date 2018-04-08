const Hapi = require("hapi");
const Bot = require("./src/bot/bot");
const DB=require("./src/dbApi/db");
const Path=require("path");
const BackTasks=require("./src/utils/backgroundTasks")();


const server = new Hapi.Server({
    host: '0.0.0.0',
    port: 7788
});


//list of plugins
const plugins = [

    {
        plugin: require("./src/plugins/devices/devices"),
        options: {}
    }
];


const start = async () => {

    await server.register(plugins);


    server.route({
        method: "GET",
        path: "/",
        handler: function (request, h) {

            return "hello from server";

        }
    });



    // start server
    await server.start();

    // connect to local DB
    DB.connect(Path.join(__dirname, "db/db.json"));

    // start bot
    Bot.start();

    BackTasks.run();


    return server;
}


start().then((server) => {
    console.log('Server running at:', server.info.uri);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
