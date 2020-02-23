const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const cors = require("cors");

require('dotenv').config();

const parseServerConfig = require('./config/parse-server');
const parseDashboardConfig = require('./config/parse-dashboard');
const landmarkRouter = require("./routes/api/landmarks");

const app = express();

// Use cors
app.use(cors());

// Serve the Parse API on the /parse URL prefix
app.use('/parse', new ParseServer(parseServerConfig));

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', new ParseDashboard(parseDashboardConfig));

// Server REST API
app.use('/api/landmarks', landmarkRouter);

const port = process.env.PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
    console.log('Landmarks server running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
