const Hapi = require("hapi");
const Bot = require("./src/bot/bot");
const DB=require("./src/dbApi/db");
const Path=require("path");


const server = new Hapi.Server({
    host: '0.0.0.0',
    port: 7788
});


//list of plugins
const plugins = [

    {
        plugin: require("./src/plugins/devices"),
        options: {}
    }
];


const start = async () => {

    await server.register(plugins);


    server.route({
        method: "GET",
        path: "/",
        handler: function (request, h) {

            return "hello world";

        }
    });

    // start server
    await server.start();

    // start bot
    Bot.start();

    // connect to local DB
    DB.connect(Path.join(__dirname, "db/db.json"));


    return server;
}


start().then((server) => {
    console.log('Server running at:', server.info.uri);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
