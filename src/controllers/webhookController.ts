import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import { OA_DETMaster } from "../entity/OA_DET";
import { ItemMaster } from "../entity/itemMaster";

const axios = require("axios");

export const sendWebhookRequest = async (req: Request, res: Response) => {
    try {
        let body_param = req.body;
        const token = 'EAALLZAFRoRQIBO1xNnttCGs02z6o2WVZBgK3XbNMt1nWkcgBllWKe4sx837JlHbKXtI8MWrekYDMdVLr5lJw06pgSaiZBd38RxkvGTnNZAZCszhPZCEOOxY0j2fZC9N4BkwFRq3d2SiZASKc3cD40mQc9k58YxvewhS6ZAgj0cHCcbW8mtGnO0B5hKziwaxOJwoh72ysUgvJZB0OjyvvKquLudoOVgEDQguF5FOMxC';

        console.log(JSON.stringify(body_param.object, null, 2));

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

                const qadet = await OA_DETMaster.findOne(msg_body);
                const itemmaster = await ItemMaster.findOne(qadet.IT_CODE);

                axios({
                    method: "POST",
                    url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                    data: {
                        messaging_product: "whatsapp",
                        to: from,
                        text: {
                            body: "Hi.. Thank you for your message the Item Name is:" + itemmaster?.IT_NAME
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

    } catch (error) {
        return InternalServerError(res, error);
    }
}