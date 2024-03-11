import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import { OA_DETMaster } from "../entity/OA_DET";
import { ItemMaster } from "../entity/itemMaster";
import { JobAssign } from "../entity/JobAssign";
import { NodeMaster } from "../entity/NodeMaster";
import { Shift } from "../entity/Shift";

const axios = require("axios");

export const sendWebhookRequest = async (req: Request, res: Response) => {
    try {
        let body_param = req.body;
        const token = 'EAADs4mGRLYwBO1vobOZAYyw0xaZBbuAS5n0ruPTy59aDyu3ddi0tXKLuMIo6tXdQMJMoEv82tF2V7QUzOZBPoYbbpL6CycfcTvT23bnvBGplI70AuwCMQSc8OJzmh05RdzM9HdUZCIk8bX8bufSf1ECOZAfuXhZC9LJtitNAOFm62chU1ZBQFN6wIE8ZAv8nutC7j37vuYKJWXelciMIdlZCJBT7voZANTWNByTzsZD';

        console.log(JSON.stringify(body_param.object, null, 2));

        if (body_param.object) {
            console.log("inside body param" + JSON.stringify(body_param.entry[0].changes[0].value.messages));
            if (body_param.entry &&
                body_param.entry[0].changes &&
                body_param.entry[0].changes[0].value.messages &&
                body_param.entry[0].changes[0].value.messages[0]
            ) {

                let phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let from = body_param.entry[0].changes[0].value.messages[0].from;
                let msg = body_param.entry[0].changes[0].value.messages[0]
                if (msg?.interactive && msg?.interactive?.type == 'nfm_reply') {
                    const responses = JSON.parse(msg?.interactive.nfm_reply.response_json);
                    const radioButtonResponse = responses.screen_0_RadioButtonsGroup_0.split('_')[1];
                    console.log('Radio Button Response:', radioButtonResponse);

                    const datePickerResponseTimestamp = parseInt(responses.screen_0_DatePicker_1, 10);
                    const datePickerResponse = new Date(datePickerResponseTimestamp);
                    console.log(datePickerResponse);
                    const qadet = await OA_DETMaster.findOne("0319-170224");
                    console.log("QAAAA", qadet?.jobId);
                    qadet.jobId = qadet.jobId;
                    qadet.branchId = qadet.branchId;
                    qadet.CO_CODE = qadet.CO_CODE
                    qadet.OA_NO = qadet.OA_NO
                    qadet.IT_CODE = qadet.IT_CODE
                    qadet.OA_SRNO = qadet.OA_SRNO
                    qadet.Remarks = qadet.Remarks
                    qadet.fyear = qadet.fyear
                    qadet.DB_CODE = qadet.DB_CODE
                    qadet.ALT_QTY = qadet.ALT_QTY
                    qadet.Delivery_Date = datePickerResponse
                    qadet.ALT_RATE = qadet.ALT_RATE
                    qadet.UR_CODE = qadet.UR_CODE
                    qadet.Final_Amt = qadet.Final_Amt
                    qadet.Location_Code = qadet.Location_Code
                    qadet.Index = qadet.Index
                    qadet.URN_No = qadet.URN_No
                    qadet.OA_Status = qadet.OA_Status
                    qadet.From_URN_No = qadet.From_URN_No
                    qadet.From_Item_Sr_No = qadet.From_Item_Sr_No
                    qadet.ALT_UNIT_ID = qadet.ALT_UNIT_ID
                    qadet.Item_Long_Description = qadet.Item_Long_Description
                    qadet.reason = qadet.reason
                    qadet.Tolerance = qadet.Tolerance
                    qadet.Close_Open_Status = qadet.Close_Open_Status
                    qadet.Close_Open_Reason = qadet.Close_Open_Reason
                    qadet.Discount = qadet.Discount
                    qadet.DIS_Amount = qadet.DIS_Amount
                    qadet.InputAmount = qadet.InputAmount
                    qadet.MRP = qadet.MRP
                    qadet.Other_Unit_ID = qadet.Other_Unit_ID
                    qadet.Other_Qty = qadet.Other_Qty
                    qadet.No_of_Color = qadet.No_of_Color
                    qadet.Film_Type = qadet.Film_Type
                    qadet.Single_Double_up_Type = qadet.Single_Double_up_Type
                    qadet.Handle = qadet.Handle
                    qadet.Handle_Type = qadet.Handle_Type
                    qadet.Bag_Size = qadet.Bag_Size
                    qadet.Liner = qadet.Liner
                    qadet.Liner_Type = qadet.Liner_Type
                    qadet.Fabric_Type = qadet.Fabric_Type
                    qadet.Color = qadet.Color
                    qadet.Special_Remark = qadet.Special_Remark
                    qadet.Circumfrence = qadet.Circumfrence
                    qadet.Film_Size = qadet.Film_Size
                    qadet.Denier = qadet.Denier
                    qadet.ALT_UNIT = qadet.ALT_UNIT
                    qadet.Production_type = qadet.Production_type
                    qadet.userId = qadet.userId
                    qadet.ProducedQty1 = qadet.ProducedQty1
                    qadet.ProducedQty2 = qadet.ProducedQty2
                    qadet.TargetQty = qadet.ALT_QTY * qadet.Circumfrence / 1000
                    qadet.Status = qadet.Status
                    qadet.allowExcessQty = qadet.allowExcessQty

                    await qadet.save();


                    const jobAssign = await JobAssign.findOne("0319-170224");

                    const node = await NodeMaster.findOne(jobAssign.node);

                    //const shift = await Shift.findOne(jobAssign.shift);

                    jobAssign.branchId = jobAssign.branchId;
                    jobAssign.date = jobAssign.date;
                    //jobAssign.shiftName = shift;
                    jobAssign.node = node;
                    jobAssign.userId = jobAssign.userId;
                    jobAssign.routeId = jobAssign.routeId;
                    jobAssign.status = jobAssign.status;
                    jobAssign.jobId = "0307-201123";
                    jobAssign.priority = jobAssign.priority;
                    jobAssign.totalProducedQty = jobAssign.totalProducedQty,
                        jobAssign.outstandingQty = jobAssign.outstandingQty,
                        jobAssign.targetQty = jobAssign.targetQty,

                        await jobAssign.save();


                    console.log('Date Picker Response:', datePickerResponse);
                } else {
                    let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
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
                                                        "flow_token": "unused",
                                                        "flow_action_data": {
                                                            "data": {
                                                                "jobId": "030440"
                                                            }
                                                        }
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
                        console.log("resulttt");
                        const sql = require('mssql');

                        const config = {
                            user: 'newuser',
                            password: 'Root@123',
                            server: 'LAPTOP-ODV7LQNH',
                            database: 'Taxonanalytica',
                            // options: {
                            //   encrypt: true, // For Azure SQL Database
                            // },
                        };

                        try {
                            console.log(msg_body);
                            await sql.connect(config);
                            let result = await new sql.Request().query(`SELECT IT_CODE FROM [Machoptic].[dbo].[item_master] WHERE IT_NAME LIKE '${msg_body}%';`);

                            console.log(result);
                            const items = result?.recordset.map((item: any) => item?.IT_CODE);

                            const placeholders = items.map((item: any) => item).join(',');

                            console.log("Jo", placeholders);

                            const job = await new sql.Request().query(`SELECT [jobId], [Status] FROM [Machoptic].[dbo].[oa_det_master] WHERE IT_CODE IN ('MMI00A000319');`);

                            console.log("Jobb", job);

                            const jobs = job?.recordset?.map((item: any) => item?.jobId + '-' + item?.Status)?.join('\t\t\t');

                            axios({
                                method: "POST",
                                url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                                data: {
                                    messaging_product: "whatsapp",
                                    to: from,
                                    text: {
                                        body: "Here is the following Job Details : \t\t\t " + jobs
                                    }
                                },
                                headers: {
                                    "Content-Type": "application/json"
                                }

                            });

                        } catch (error) {
                            return InternalServerError(res, error);
                        } finally {
                            // Close the SQL connection
                            await sql.close();
                        }
                    }
                    console.log("phone number " + phon_no_id);
                    console.log("from " + from);
                    console.log("boady param " + msg_body);
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