// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import fs from 'fs'


import compression from "compression";
import * as dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { pagination } from "typeorm-pagination";
import Routes from "./routes/Routes";
const helmet = require("helmet");
var cors = require('cors')
const cookieParser = require('cookie-parser');
//const axios = require("axios");
import { sendWebhookRequest } from "./controllers/webhookController";
import { webhookRequestActivity } from './controllers/webhookActivityController';



try {

  dotenv.config();

  const PORT = process.env.PORT || 5000;

  const app = express();
  var bodyParser = require('body-parser');
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(cors(
    {
      origin: [
        "http://localhost:3000",
        "http://192.168.43.197:3000", // give correct IP
      ],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }
  ))
  app.use(cookieParser());

  app.use(
    compression({
      threshold: 0,
      level: 6,
      filter: function () {
        return true;
      },
    })
  );
  app.use(pagination);

  app.use("/api", Routes);

  const mytoken = 'MACHOPTIC';

  app.get('/webhook', function (req, res) {
    if (
      req.query['hub.mode'] == 'subscribe' &&
      req.query['hub.verify_token'] == mytoken
    ) {
      res.send(req.query['hub.challenge']);
    } else {
      res.sendStatus(400);
    }
  });

  app.post("/webhook", sendWebhookRequest);
  //app.post("/webhook", webhookRequestActivity);

  app.get("/health", (_, res) => {
    res.status(200).json({
      success: true,
      message: "API IS WORKING on 05/09/2023",
    });
  });

  createConnection()
    .then(async () => {
      app.listen(PORT, () => {
        console.log(`CONNECTED TO DB AND SERVER STARTED ON PORT  ${PORT}`);
      });
    })
    .catch((error: any) => console.log(error));

} catch (error) {

  const content = error.message + '\n'

  fs.writeFile('./test.txt', content, { flag: 'a+' }, err => {
    if (err) {
      console.error(err)
      return
    }
    console.log('file written successfully');

  })
}

