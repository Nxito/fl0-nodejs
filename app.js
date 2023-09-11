var http = require("http");
var express = require("express");
var RED = require("node-red");
const port = process.env.PORT ?? 3000;
// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/", express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
  httpAdminRoot: "/red/ad",
  httpNodeRoot: "/api",
  userDir: "./",
  flowFile: 'flows.json',
  serialReconnectTime: 15000,
  adminAuth: {
    type: "credentials",
    users: [
      {
        username: "nxito",
        password:
          "$2b$15$NteVt2eUSJmlhJZeA7QqR.ubxaavRWxL3kvJc6x2HA3TdltyP.T2C",
        permissions: "*",
      },
    ],
  },
  editorTheme: {
    page: {
      title: "Nxito-Red",
      css: __dirname + "/style.css",
    },
    header: {
      title: "Nxito-Red",
      image: __dirname + "/public/NXitoNEW RED.svg", // or null to remove image
    },
    login: {
      // image: __dirname + "/static/logos/Nxito logo.png" // a 256x256 image
    },
    projects: {
      // To enable the Projects feature, set this value to true
      enabled: false,
    },
  },
  functionGlobalContext: {
    fs: require("fs"),
    moment: require("moment"),
    url: require("url"),
    path: require("path"),
  }, // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server, settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode);

console.log(`http://localhost:${port}/${RED.httpAdmin}`);

server.listen(port);
// Start the runtime
RED.start();
