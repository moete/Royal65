import "reflect-metadata";
import loadersInit from "./loaders";
import express = require("express");
import config from "./config";
import http = require("http");
import cors = require("cors");
async function startServer() {
  const app = express();

  const server = http.createServer(app);
  app.use(cors());
  const { io } = await loadersInit({ expressApp: app, server });

  app.set("socket", io);

  app.use("/uploads", express.static("uploads"));

  server.listen(config.port || 8000, () => {
    console.log(`Your server is ready on port ${config.port} !`);
  });
}

startServer();
