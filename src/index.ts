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
const axios = require("axios");



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

  const token = 'EAALLZAFRoRQIBO3ToZB02U0lJTrQBiQLVKq0ihkZAdU0WOepxnL0rdTG3pzmvkx5wcJ5mDILkSRo8KY87TIqFyKSnTTFWS7bqJBPXx9J2QwpMvooH9ZABvxY29MXkcc7UpnHkskMygLilGrZCb8AxFZCSvPm4zZBtnTTEoySfFXUvF2ZC33f7gCeYZCZBcjwX5SLQxS1QZBlKt8iZBXwSqzZALE8QicZBcyDV2gyniuBsZD';
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

  app.post("/webhook", (req, res) => { //i want some 

    let body_param = req.body;

    console.log(JSON.stringify(body_param, null, 2));

    if (body_param.object) {
      console.log("inside body param");
      if (body_param.entry &&
        body_param.entry[0].changes &&
        body_param.entry[0].changes[0].value.messages &&
        body_param.entry[0].changes[0].value.messages[0]
      ) {
        let phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
        let from = body_param.entry[0].changes[0].value.messages[0].from;
        let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

        console.log("phone number " + phon_no_id);
        console.log("from " + from);
        console.log("boady param " + msg_body);

        axios({
          method: "POST",
          url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
          data: {
            messaging_product: "whatsapp",
            to: from,
            text: {
              body: "Hi.. I'm Prasath, your message is " + msg_body
            }
          },
          headers: {
            "Content-Type": "application/json"
          }

        });

        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }

    }

  });

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

