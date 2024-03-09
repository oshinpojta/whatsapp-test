import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import { OA_DETMaster } from "../entity/OA_DET";
import { ItemMaster } from "../entity/itemMaster";

const axios = require("axios");

export const sendWebhookRequest = async (req: Request, res: Response) => {
    try {
        let body_param = req.body;
        const token = 'EAADs4mGRLYwBO1dZBOvZCKdCPHph27qCMwv0kkNRmtyZBVZCKt8fmW7AZB0kDUfRHhcHSsMRGXrI1WAoHvmMKis5IFg2Fr83fv4xQEwcepbzITZAYJQbaRkcIc10JMXZCgNZCY2vuVL1RjDtSDCMwCB6BzXBlYv0GSeZC8hzPyv0l9m7GCnt5wLhmdBFJZCCai2SdNzdiz3aJvKYbBnpcZC79xLKIr5GlTxYZCd6nPQZD';

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

                if (msg_body.includes("create")) {
                    axios({
                        method: "POST",
                        url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                        data: {
                            "messaging_product": "whatsapp",
                            "recipient_type": "individual",
                            "to": "+15134626290",
                            "type": "template",
                            "template": {
                                "name": "job_priority",
                                "language": {
                                    "code": "en_US"
                                },
                                "components": [
                                    {
                                        "type": "BUTTON",
                                        "sub_type": "flow",
                                        "index": "0",
                                        "parameters": [
                                            {
                                                "type": "action",
                                                "action": {
                                                    "flow_token": "unused"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        headers: {
                            "Content-Type": "application/json"
                        }

                    });
                } else {
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
                }

                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }

        }

    } catch (error) {
        return InternalServerError(res, error);
    }
}