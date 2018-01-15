const Hapi = require("hapi");


const server = new Hapi.Server({
    host: '0.0.0.0',
    port: 6677
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

    await server.start();
    return server;
}





start().then((server) => {
    console.log('Server running at:', server.info.uri);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});