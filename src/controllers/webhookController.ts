import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import { OA_DETMaster } from "../entity/OA_DET";
import { JobAssign } from "../entity/JobAssign";

const axios = require("axios");
const fs = require('fs');
const path = require('path');
const filePath = "D:\CRM-BE\Taxonalytica_BE_Access\constants\data.json";

export const sendWebhookRequest = async (req: Request, res: Response) => {
    try {
        let body_param = req.body;
        const token = 'EAADs4mGRLYwBO3G9IEaZCpqo1BzckxsoC7UP9CekBUzd8jnYj4uCz8WteYluqYf2uw3zmFQ8Ovzmyr1fAk1FW0a4JJXBMZAZAhEa1cp1pXGiPoXRxr7DZB7dBuh8o9HkL1ZBcpLdBdoZCC7RnNC6f9CNFkgxgW5CKeFjAR8X8yEsSNLsCqZBuHBPU4f0AiG63XrT3txkOZBURSsj075P61Y7vHfsGmD6Rle2rasZD';

        console.log(JSON.stringify(body_param.object, null, 2));

        const config = {
            user: 'newuser',
            password: 'Root@123',
            server: 'LAPTOP-ODV7LQNH',
            database: 'Taxonanalytica',
            // options: {
            //   encrypt: true, // For Azure SQL Database
            // },
        };
        const buttonInteractiveObject = {
            type: "button",
            header: {
                type: "text",
                text: "Please confirm your option.",
            },
            body: {
                text: "",
            },
            footer: {
                text: "Please select an option.",
            },
            action: {
                buttons: [
                    {
                        type: "reply",
                        reply: {
                            id: "p1",
                            title: "P1",
                        },
                    },
                    {
                        type: "reply",
                        reply: {
                            id: "p2",
                            title: "P2",
                        },
                    },
                    {
                        type: "reply",
                        reply: {
                            id: "p3",
                            title: "P3",
                        },
                    },
                ],
            },
        };

        if (body_param.object) {
            console.log("inside body param" + JSON.stringify(body_param.entry[0].changes[0].value.messages));
            if (body_param.entry &&
                body_param.entry[0].changes &&
                body_param.entry[0].changes[0].value.messages &&
                body_param.entry[0].changes[0].value.messages[0]
            ) {

                let phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let from = body_param.entry[0].changes[0].value.messages[0].from;
                let msg = body_param.entry[0].changes[0].value.messages[0];

                if (msg?.interactive?.type == 'list_reply') {
                    console.log("interactiveee", msg?.interactive);
                    buttonInteractiveObject.body.text =
                        msg?.interactive?.list_reply.id +
                        ". " +
                        msg?.interactive?.list_reply.title;
                    //messageObject.interactive = buttonInteractiveObject;
                    console.log("buttonnnn", buttonInteractiveObject);
                    const sql = require('mssql');
                    try {
                        let messageObject = {
                            "messaging_product": "whatsapp",
                            "recipient_type": "individual",
                            "to": from,
                            "type": "interactive",
                            "interactive": {}
                        };
                        messageObject.interactive = buttonInteractiveObject;
                        console.log("Valuesss", JSON.stringify(messageObject, null, 2));
                        axios({
                            method: "POST",
                            url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                            data: messageObject,
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        try {
                            console.log("Titleee", msg?.interactive?.list_reply?.title);
                            const data = { jobId: `${msg?.interactive?.list_reply?.title}` }
                            fs.writeFileSync(filePath, JSON.stringify(data));
                            console.log('Data written successfully.');
                            const readData = JSON.parse(fs.readFileSync(filePath));
                            console.log("CONSTANT", readData.jobId); // Output: value
                        } catch (error) {
                            console.error('Error writing data:', error);
                        }
                    } catch (error) {
                        return InternalServerError(res, error);
                    } finally {
                        // Close the SQL connection
                        await sql.close();
                    }
                }
                if (msg?.interactive?.type == 'nfm_reply') {
                    const responses = JSON.parse(msg?.interactive.nfm_reply.response_json);
                    const radioButtonResponse = responses.screen_0_RadioButtonsGroup_0.split('_')[1];
                    console.log('Radio Button Response:', radioButtonResponse);

                    const datePickerResponseTimestamp = parseInt(responses.screen_0_DatePicker_1, 10);
                    const datePickerResponse = new Date(datePickerResponseTimestamp);
                    console.log(datePickerResponse);
                    const qadet = await OA_DETMaster.findOne("0326-071223");
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

                    const sql = require('mssql');
                    await sql.connect(config);
                    const readData = JSON.parse(fs.readFileSync(filePath));
                    let jobAssign = await new sql.Request().query(`SELECT * FROM [Taxonanalytica].[dbo].[job_assign] WHERE jobId = ${readData?.jobId};`);
                    //console.log('jobassign', jobAssign.recordset[jobAssign.recordset.length - 1]);
                    jobAssign = jobAssign.recordset[jobAssign.recordset.length - 1];

                    //const shift = await Shift.findOne(jobAssign.shift);
                    let jobAssignVal = await JobAssign.findOne(jobAssign.id);
                    // jobAssign.branchId = jobAssign.branchId;
                    // jobAssign.date = jobAssign.date;
                    // //jobAssign.shiftName = shift;
                    // jobAssign.node = jobAssign.node_id;
                    // jobAssign.userId = jobAssign.userId;
                    // jobAssign.routeId = jobAssign.routeId;
                    // jobAssign.status = jobAssign.status;
                    // jobAssign.jobId = "0326-071223";
                    jobAssignVal.priority = radioButtonResponse;
                    // jobAssign.totalProducedQty = jobAssign.totalProducedQty,
                    //     jobAssign.outstandingQty = jobAssign.outstandingQty,
                    //     jobAssign.targetQty = jobAssign.targetQty,
                    console.log('jobassign', jobAssignVal);

                    await jobAssignVal.save();

                    console.log('Date Picker Response:', datePickerResponse);
                }
                if (msg?.interactive?.type == "button_reply") {
                    const sql = require('mssql');
                    await sql.connect(config);
                    const readData = JSON.parse(fs.readFileSync(filePath));
                    let jobAssign = await new sql.Request().query(`SELECT * FROM [Taxonanalytica].[dbo].[job_assign] WHERE jobId = ${readData?.jobId};`);
                    console.log('jobassign', jobAssign.recordset[jobAssign.recordset.length - 1]);
                    jobAssign = jobAssign.recordset[jobAssign.recordset.length - 1];

                    //const shift = await Shift.findOne(jobAssign.shift);
                    let jobAssignVal = await JobAssign.findOne(jobAssign.id);
                    // jobAssign.branchId = jobAssign.branchId;
                    // jobAssign.date = jobAssign.date;
                    // //jobAssign.shiftName = shift;
                    // jobAssign.node = jobAssign.node_id;
                    // jobAssign.userId = jobAssign.userId;
                    // jobAssign.routeId = jobAssign.routeId;
                    // jobAssign.status = jobAssign.status;
                    // jobAssign.jobId = "0326-071223";
                    jobAssignVal.priority = msg?.interactive?.button_reply?.title;
                    // jobAssign.totalProducedQty = jobAssign.totalProducedQty,
                    //     jobAssign.outstandingQty = jobAssign.outstandingQty,
                    //     jobAssign.targetQty = jobAssign.targetQty,
                    console.log('jobassign', jobAssignVal);

                    await jobAssignVal.save();

                    axios({
                        method: "POST",
                        url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                        data: {
                            messaging_product: "whatsapp",
                            to: from,
                            text: {
                                body: "Successfully updated Job priority"
                            }
                        },
                        headers: {
                            "Content-Type": "application/json"
                        }

                    });
                }
                if (msg?.type === "text") {
                    console.log("resulttt");
                    let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
                    const sql = require('mssql');
                    try {
                        console.log(msg_body);
                        await sql.connect(config);
                        let result = await new sql.Request().query(`SELECT IT_CODE FROM [Taxonanalytica].[dbo].[item_master] WHERE IT_NAME LIKE '${msg_body}%';`);

                        console.log(result);
                        const items = result?.recordset.map((item: any) => item?.IT_CODE);

                        const placeholders = items.map((item: any) => `'${item}'`).join(',');


                        const job = await new sql.Request().query(`SELECT [jobId], [Status] FROM [Taxonanalytica].[dbo].[oa_det_master] WHERE IT_CODE IN (${placeholders});`);

                        const jobs = job?.recordset;

                        const listObject = createListObject(jobs);
                        console.log("jobssss", jobs, job);
                        let messageObject = {
                            "messaging_product": "whatsapp",
                            "recipient_type": "individual",
                            "to": from,
                            "type": "interactive",
                            "interactive": {
                                "type": "list",
                                "header": {
                                    "type": "text",
                                    "text": "Select the Job you would like"
                                },
                                "body": {
                                    "text": "You will be presented with a list of options to choose from"
                                },
                                "footer": {
                                    "text": "All of them are opened"
                                },
                                "action": {
                                    "button": "Select",
                                    "sections": [
                                        {
                                            "title": "List of Jobs",
                                            "rows": [
                                                {
                                                    "id": "1",
                                                    "title": "0292-030224"
                                                },
                                                {
                                                    "id": "2",
                                                    "title": "0983-100124"
                                                },
                                                {
                                                    "id": "3",
                                                    "title": "1218-100124"
                                                },
                                                {
                                                    "id": "4",
                                                    "title": "1359-100224"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                        };
                        console.log("Valuesss", JSON.stringify(messageObject, null, 2));
                        axios({
                            method: "POST",
                            url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                            data: messageObject,
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
                } else {
                    const interactiveType = msg?.interactive.type;
                    if (interactiveType === "list_reply") {
                        //sendReplyButton(message.interactive);
                        buttonInteractiveObject.body.text =
                            msg?.interactive?.list_reply.id +
                            ". " +
                            msg?.interactive?.list_reply.title +
                            " (" +
                            msg?.interactive?.list_reply.description +
                            ")";
                        //messageObject.interactive = buttonInteractiveObject;
                    }
                    console.log("buttonnnn", buttonInteractiveObject);
                }
                console.log("phone number " + phon_no_id);
                console.log("from " + from);
                //console.log("boady param " + msg_body);
            }

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        return InternalServerError(res, error);
    }
}

const createListObject = (jobs: any) => {
    const object = {
        type: "list",
        header: {
            type: "text",
            text: "Select the Job you would like",
        },
        body: {
            text: "You will be presented with a list of options to choose from",
        },
        footer: {
            text: "All of them are opened",
        },
        action: {
            button: "Select",
            sections: [
                {
                    title: "List of Jobs",
                    rows: jobs.map((item: any, index: any) => ({
                        id: index + 1,
                        title: item?.jobId,
                        description: item?.status,
                    }))
                },
            ],
        },
    };
    return object;
};