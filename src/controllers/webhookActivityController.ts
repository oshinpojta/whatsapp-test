import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import { OA_DETMaster } from "../entity/OA_DET";
import { JobAssign } from "../entity/JobAssign";
import { route } from "src/routes/branchRoutes";

const axios = require("axios");
const fs = require('fs');

const filePath = "D:\CRM-BE\Taxonalytica_BE_Access\constants\activityData.json";

const config = {
    user: 'newuser',
    password: 'Root@123',
    server: 'LAPTOP-ODV7LQNH',
    database: 'Taxonanalytica',
    // options: {
    //   encrypt: true, // For Azure SQL Database
    // },
};

export const webhookRequestActivity = async (req: Request, res: Response) => {
    try {

        let body_param = req.body;
        const token = 'EAADs4mGRLYwBO0cga6vry0tSiR86RKDd7wujFnpSUVQAJ5hCZAtZCDcxSZBiC8t6496Mu7iSiy5NETItzk7xFTZCafZCBjo5NgpMqS2ZAo6d4Q5ZB0Lbmhk36bCPUCqAl2adULI9iGjECltXGoXR4ZC2zEii6ZAdZAUiTFKlUrOWCEicWy3znI595YEe2l6x6FL1i6m2vZCRkvFZBiQc8WrJwanAZCLIznQdqa08epFEZD';

        console.log(JSON.stringify(body_param.object, null, 2));
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

                const readDatas = JSON.parse(fs.readFileSync(filePath));
                let flow = '';
                let index = 0;
                console.log(readDatas[0], "flowww");
                for (let i = 0; i < readDatas?.length; i++) {
                    if (readDatas[i][from]) {
                        flow = readDatas[i][from];
                        index = i;
                        break;
                    }
                }
                console.log(flow, "flowww");
                if (flow == '') {
                    let obj: { [key: string]: string } = {}
                    obj[from] = msg?.text?.body;
                    readDatas.push(obj);
                    index = readDatas?.length - 1;
                    flow = msg?.text?.body;
                    console.log(readDatas, "readDataaa");
                    fs.writeFileSync(filePath, JSON.stringify(readDatas));
                }
                if (msg?.type === "text" && flow == "Hi") {
                    console.log("resulttt");
                    let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
                    const sql = require('mssql');
                    try {
                        console.log(msg_body);
                        await sql.connect(config);
                        let result = await new sql.Request().query(`SELECT [empId] FROM [Taxonanalytica].[dbo].[employee] WHERE phoneno = '${from}'`);

                        const empId = result?.recordset[0]?.empId;

                        let nodeId = await new sql.Request().query(`SELECT [node_Id] FROM [Taxonanalytica].[dbo].[employee_node_mapping] WHERE emp_id = '${empId}'`);

                        nodeId = nodeId?.recordset[0]?.node_Id;
                        //let jobAssign = await new sql.Request().query(`SELECT [jobId] FROM [Taxonanalytica].[dbo].[job_assign] WHERE node_id = '${nodeId}';`);
                        let nodeMaster = await new sql.Request().query(`SELECT [nodeId], [nodeName] FROM [Taxonanalytica].[dbo].[node_master] WHERE nodeId = '${nodeId}';`);
                        nodeMaster = nodeMaster?.recordset[0];

                        console.log(result, nodeMaster);
                        //let jobs = nodeMaster?.recordset.slice(0, 10);
                        //const listObject = createListObjectNodes(jobs);
                        let messageObject = {
                            "messaging_product": "whatsapp",
                            "recipient_type": "individual",
                            "to": from,
                            "type": "interactive",
                            "interactive": {
                                "type": "list",
                                "header": {
                                    "type": "text",
                                    "text": "Select the Machine you would like"
                                },
                                "body": {
                                    "text": "You will be presented with a list of options to choose from"
                                },
                                "footer": {
                                    "text": "All of them are assigned"
                                },
                                "action": {
                                    "button": "Select",
                                    "sections": [
                                        {
                                            "title": "List of Machines",
                                            "rows": [
                                                {
                                                    "id": "1",
                                                    "title": `${nodeMaster?.nodeId}-${nodeMaster?.nodeName}`,
                                                    "description": "Machine"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        };
                        //messageObject.interactive = listObject;
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
                }
                else if (msg?.interactive?.type == "list_reply" && msg?.interactive?.list_reply?.description == "Machine" && flow.toLowerCase() == "hi") {
                    const sql = require('mssql');
                    await sql.connect(config);

                    //const readData = JSON.parse(fs.readFileSync(filePath));
                    //console.log(readData, "readdddd");
                    let node_id = msg?.interactive?.list_reply?.title.split('-')[0];
                    console.log("MSGGGG", node_id);
                    let jobAssign = await new sql.Request().query(`SELECT * FROM [Taxonanalytica].[dbo].[job_assign] WHERE node_id = '${node_id}';`);

                    jobAssign = jobAssign?.recordset.filter((item: any) => item?.status != 'Completed');
                    jobAssign = jobAssign?.slice(0, 10);
                    const jobs = jobAssign.map((item: any) => item?.jobId);
                    const placeholders = jobs.map((item: any) => `'${item}'`).join(',');

                    let IT_CODEs = await new sql.Request().query(`SELECT [IT_CODE] FROM [Taxonanalytica].[dbo].[oa_det_master] WHERE jobId IN (${placeholders});`);
                    IT_CODEs = IT_CODEs?.recordset?.map((item: any) => item?.IT_CODE);
                    const placeholdersIT = IT_CODEs?.map((item: any) => `'${item}'`).join(',');

                    const itemsRecord = await new sql.Request().query(`SELECT [IT_NAME] FROM [Taxonanalytica].[dbo].[item_master] WHERE IT_CODE IN (${placeholdersIT});`);
                    console.log(itemsRecord, "jobsssssss");
                    let listObject = createListObjectActivity(jobAssign, itemsRecord?.recordset);

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
                                        "title": "List of Machines",
                                        "rows": [
                                            {
                                                "id": "1",
                                                "title": `JobId`,
                                                "description": "Machine"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    };
                    messageObject.interactive = listObject;
                    axios({
                        method: "POST",
                        url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                        data: messageObject,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const data = readDatas ? [...readDatas] : [];
                    data[index]["nodeId"] = node_id;
                    //console.log(data, "dataaaa");
                    fs.writeFileSync(filePath, JSON.stringify(data));
                }
                else if (msg?.interactive?.type == "list_reply" && msg?.interactive?.list_reply?.description.includes("Job") && flow.toLowerCase() == "hi") {
                    const sql = require('mssql');
                    await sql.connect(config);
                    // const readData = JSON.parse(fs.readFileSync(filePath));
                    // const len = readData?.length - 1;
                    const nodeId = readDatas[index]?.nodeId;
                    const jobId = msg?.interactive?.list_reply?.title;
                    const jobAssignId = msg?.interactive?.list_reply?.id;

                    let oaDetails = await new sql.Request().query(`SELECT [IT_CODE] FROM [Taxonanalytica].[dbo].[oa_det_master] WHERE jobId = '${jobId}';`);
                    let fgId = oaDetails?.recordset[0]?.IT_CODE;

                    let nodeDetails = await new sql.Request().query(`SELECT * FROM [Taxonanalytica].[dbo].[node_master];`);
                    nodeDetails = nodeDetails?.recordset;

                    let fgDetails = await new sql.Request().query(`SELECT * FROM  [Taxonanalytica].[dbo].[fg_mapping];`);
                    fgDetails = fgDetails?.recordset;

                    let batchDetails = await new sql.Request().query(`SELECT * FROM [Taxonanalytica].[dbo].[batch];`);
                    batchDetails = batchDetails?.recordset;
                    if (batchDetails?.length == 0) {
                        axios({
                            method: "POST",
                            url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                            data: {
                                messaging_product: "whatsapp",
                                to: from,
                                text: {
                                    body: `No Batches available for current selected Job ${jobId}`
                                }
                            },
                            headers: {
                                "Content-Type": "application/json"
                            }

                        });
                        return;
                    }

                    let routeId = await new sql.Request().query(`SELECT [Route] FROM [Taxonanalytica].[dbo].[item_master] WHERE IT_CODE = '${fgId}';`);
                    routeId = routeId?.recordset[0]?.Route;

                    let edgeDetails = await new sql.Request().query(`SELECT * FROM [Taxonanalytica].[dbo].[edge_master];`);
                    edgeDetails = edgeDetails?.recordset;

                    const inputValue = edgeDetails.filter((item: any) => item.targetNodeId == nodeId && item.routeId == routeId);
                    const inputNodesFromEdge = inputValue.map((item: any) => item.sourceNodeId);
                    let inputQty = inputNodesFromEdge.map((item: any) => {
                        const matchingItems = fgDetails.filter((item1: any) => item1.nodeIdFG == fgId && item1.nodeId == item);
                        return matchingItems.length > 0 ? matchingItems[0]?.nodeIdRM : item;
                    });
                    const inputsData = inputQty?.map((item: any) => batchDetails.filter((item1: any) => (item == item1.ItemCode && item1?.ItemCode) || (item == item1?.MaterialId && jobId == item1?.jobId)));
                    console.log(inputsData, inputQty, "inputvalue");

                    const inputBatches = createListInputBatches(inputsData[0].slice(0, 10));
                    console.log(JSON.stringify(inputBatches), "inputttttBAA");

                    const outputDetails = edgeDetails.filter((item: any) => item.sourceNodeId == nodeId && item.routeId == routeId);

                    console.log(inputBatches, "inputBatches");
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
                                        "title": "List of Machines",
                                        "rows": [
                                            {
                                                "id": "1",
                                                "title": `JobId`,
                                                "description": "Machine"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    };
                    messageObject.interactive = inputBatches;
                    axios({
                        method: "POST",
                        url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                        data: messageObject,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    //const inputDetails = readData[len]?.inputDetails || [];
                    const data = [...readDatas];
                    data[index] = {
                        ...data[index],
                        nodeId: nodeId,
                        jobId: jobId, nodeDetails: nodeDetails,
                        batchDetails: batchDetails, edgeDetails: edgeDetails,
                        fgDetails: fgDetails, fgId: fgId, routeId: routeId,
                        jobAssignId: jobAssignId, outputDetail: outputDetails,
                        inputId: inputNodesFromEdge[0],
                        inputDetails: [],
                        outputDetails: [],
                    };
                    //console.log(data, "dataeeeee");
                    fs.writeFileSync(filePath, JSON.stringify(data));
                }
                else if (msg?.interactive?.type == "list_reply" && msg?.interactive?.list_reply?.description.includes("Balance") && flow.toLowerCase() == "hi") {
                    axios({
                        method: "POST",
                        url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                        data: {
                            "messaging_product": "whatsapp",
                            "recipient_type": "individual",
                            "to": from,
                            "type": "template",
                            "template": {
                                "name": "input_batches",
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
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    });
                    // const readData = JSON.parse(fs.readFileSync(filePath));
                    // const len = readData?.length - 1;
                    const batchId = msg?.interactive?.list_reply?.title;

                    let data = readDatas[index];

                    data = { ...data, batchId: batchId };
                    readDatas[index] = data;
                    console.log(data, readDatas[index], "batchhhhhh");
                    fs.writeFileSync(filePath, JSON.stringify(readDatas));

                }
                // const readData = JSON.parse(fs.readFileSync(filePath));
                // const len = readData?.length - 1;
                if (msg?.interactive?.type == 'nfm_reply' && readDatas[index].outputDetail?.length && flow.toLowerCase() == "hi") {
                    const responses = JSON.parse(msg?.interactive.nfm_reply.response_json);
                    console.log(responses, "responsesss");
                    const outputDetails = readDatas[index]?.outputDetail //edgeDetails.filter((item: any) => item.sourceNodeId == nodeId && item.routeId == routeId);

                    let nodeDetail = readDatas[index]?.nodeDetails?.filter((item1: any) => item1.nodeId === outputDetails[0]?.targetNodeId)[0];
                    const nodeName = nodeDetail?.nodeName;
                    const nodeCategory = nodeDetail?.nodeCategory;

                    const templateName = nodeCategory == "Waste" ? "waste_batch" : "output_batches";
                    // console.log("outputDetails", outputDetails, nodeName, nodeCategory);
                    axios({
                        method: "POST",
                        url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                        data: {
                            "messaging_product": "whatsapp",
                            "recipient_type": "individual",
                            "to": from,
                            "type": "template",
                            "template": {
                                "name": `${templateName}`,
                                "language": {
                                    "code": "en_US"
                                },
                                "components": [
                                    {
                                        "type": "body",
                                        "parameters": [
                                            {
                                                "type": "text",
                                                "text": nodeName,
                                            }]
                                    },
                                    {
                                        "type": "BUTTON",
                                        "sub_type": "flow",
                                        "index": "0",
                                        "parameters": [
                                            {
                                                "type": "action",
                                                "action": {
                                                    "flow_token": "unused",
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    });
                    //const inputDetails = readData?.inputDetails;
                    //console.log(inputDetails, readData?.inputId, "inputttDetailsss");
                    let data = readDatas[index];
                    if (data?.inputId) {
                        const nodeDetail = readDatas[index]?.nodeDetails?.filter((item1: any) => item1.nodeId === data?.inputId)[0];
                        const nodeCategory = nodeDetail?.nodeCategory;
                        data["inputDetails"].push({
                            inputId: data?.inputId,
                            nodeCategory: nodeCategory,
                            availableQty1: responses?.screen_0_TextInput_0,
                            availableQty2: responses?.screen_0_TextInput_1,
                            balanceQty1: responses?.screen_0_TextInput_0,
                            balanceQty2: responses?.screen_0_TextInput_1,
                        });
                        data.inputId = null;
                        data["outputId"] = outputDetails[0]?.targetNodeId;
                    } else {
                        const nodeDetail = readDatas[index]?.nodeDetails?.filter((item1: any) => item1.nodeId === data?.outputId)[0];
                        const nodeCategory = nodeDetail?.nodeCategory;
                        data["outputDetails"].push({
                            outputId: data?.outputId,
                            nodeCategory: nodeCategory,
                            availableQty1: responses?.screen_0_TextInput_0,
                            availableQty2: responses?.screen_0_TextInput_1,
                            balanceQty1: responses?.screen_0_TextInput_0,
                            balanceQty2: responses?.screen_0_TextInput_1,
                        })
                        data.outputId = outputDetails[0]?.targetNodeId;
                    }
                    const outputDetail = outputDetails.slice(1);
                    if (outputDetail.length) {
                        data = { ...data, outputDetail: outputDetail };
                    } else {
                        const { edgeDetails, nodeDetails, fgDetails, batchDetails, ...rest } = data;
                        data = rest;
                    }
                    //console.log(data, "inputdataaaaaaa");
                    readDatas[index] = data;
                    fs.writeFileSync(filePath, JSON.stringify(readDatas));
                }

                if (msg?.interactive?.type == 'list_reply' && flow.toLowerCase() == "job") {
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
                            const data = { jobId: `${msg?.interactive?.list_reply?.title}`, jobName: `${msg?.interactive?.list_reply?.description}` };
                            readDatas[index] = {
                                ...readDatas[index],
                                ...data
                            };
                            fs.writeFileSync(filePath, JSON.stringify(readDatas));
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

                if (msg?.interactive?.type == 'nfm_reply' && flow.toLowerCase() == "job") {
                    const responses = JSON.parse(msg?.interactive.nfm_reply.response_json);
                    const sql = require('mssql');

                    const datePickerResponseTimestamp = parseInt(responses.screen_0_DatePicker_0, 10);
                    const datePickerResponse = new Date(datePickerResponseTimestamp);
                    console.log(datePickerResponse);
                    //const readData = JSON.parse(fs.readFileSync(filePath));
                    console.log("readddd", readDatas[index]);


                    await updateOA_DETMaster(readDatas[index], datePickerResponse, " ");

                    //await sendMessages();

                    // console.log("employeee", employeePhone, employeeNode);

                    let permission = await new sql.Request().query(`SELECT [phoneno] FROM [Taxonanalytica].[dbo].[manager] WHERE phoneno = '${from}'`);
                    console.log(permission, "permissionnn");
                    permission = permission?.recordset;
                    for (let i = 0; i < permission?.length; i++) {
                        const fromno = permission[i];
                        axios({
                            method: "POST",
                            url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                            data: {
                                messaging_product: "whatsapp",
                                to: fromno,
                                text: {
                                    body: `Successfully updated Priority and Delivery Date for the job ${readDatas[index]?.jobId} - ${readDatas[index]?.jobName}`
                                }
                            },
                            headers: {
                                "Content-Type": "application/json"
                            }

                        });
                    }
                    console.log('Date Picker Response:', datePickerResponse);
                }

                if (msg?.interactive?.type == "button_reply" && flow.toLowerCase() == "job") {
                    const sql = require('mssql');
                    await sql.connect(config);
                    //const readData = JSON.parse(fs.readFileSync(filePath));
                    console.log(readDatas[index]?.jobId);

                    let jobAssign = await new sql.Request().query(`SELECT * FROM [Taxonanalytica].[dbo].[job_assign] WHERE jobId = '${readDatas[index]?.jobId}';`);
                    console.log(jobAssign.recordset[jobAssign.recordset.length - 1], "jobAssignnn");
                    //jobAssign = jobAssign.recordset[jobAssign.recordset.length - 1];

                    console.log('jobassign', jobAssign.recordset[jobAssign.recordset.length - 1]);

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

                    await updateOA_DETMaster(readDatas[index], null, msg?.interactive?.button_reply?.title);

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
                    axios({
                        method: "POST",
                        url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                        data: {
                            "messaging_product": "whatsapp",
                            "recipient_type": "individual",
                            "to": from,
                            "type": "template",
                            "template": {
                                "name": "delivery_date",
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
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    });
                }

                if (msg?.type === "text" && flow.toLowerCase() == "job") {
                    console.log("resulttt");
                    let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

                    if (msg_body.toLowerCase() == "job") {
                        const sql = require('mssql');
                        await sql.connect(config);
                        let permission = await new sql.Request().query(`SELECT [empId] FROM [Taxonanalytica].[dbo].[manager] WHERE phoneno = '${from}'`);
                        if (permission?.recordset?.length == 0) {
                            axios({
                                method: "POST",
                                url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                                data: {
                                    messaging_product: "whatsapp",
                                    to: from,
                                    text: {
                                        body: `You donot have permission to update the job priority`
                                    }
                                },
                                headers: {
                                    "Content-Type": "application/json"
                                }

                            });
                            return;
                        } else {
                            axios({
                                method: "POST",
                                url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                                data: {
                                    messaging_product: "whatsapp",
                                    to: from,
                                    text: {
                                        body: `Please enter Item name`
                                    }
                                },
                                headers: {
                                    "Content-Type": "application/json"
                                }

                            });
                        }
                    } else {
                        const sql = require('mssql');
                        try {
                            console.log(msg_body);
                            await sql.connect(config);
                            let permission = await new sql.Request().query(`SELECT [empId] FROM [Taxonanalytica].[dbo].[manager] WHERE phoneno = '${from}'`);
                            if (permission?.recordset?.length == 0) {
                                axios({
                                    method: "POST",
                                    url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                                    data: {
                                        messaging_product: "whatsapp",
                                        to: from,
                                        text: {
                                            body: `You donot have permission to update the job priority`
                                        }
                                    },
                                    headers: {
                                        "Content-Type": "application/json"
                                    }

                                });
                                return;
                            }
                            let result = await new sql.Request().query(`SELECT IT_CODE, IT_NAME FROM [Taxonanalytica].[dbo].[item_master] WHERE IT_NAME LIKE '${msg_body}%';`);

                            console.log(result);
                            const items = result?.recordset.map((item: any) => item?.IT_CODE);
                            const itemNames = result?.recordset.map((item: any) => item?.IT_NAME);

                            const placeholders = items.map((item: any) => `'${item}'`).join(',');

                            const job = await new sql.Request().query(`SELECT [jobId], [Status] FROM [Taxonanalytica].[dbo].[oa_det_master] WHERE IT_CODE IN (${placeholders});`);

                            const jobs = job?.recordset;

                            const listObject = createListObject(jobs, itemNames);
                            console.log("ITEMNAMES", itemNames);

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
                                }
                            };
                            messageObject.interactive = listObject;
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
                    }
                }
            }
        }
    } catch (error) {
        return InternalServerError(res, error);
    }
}


const createListObjectActivity = (jobs: any, itemNames: any) => {
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
                        id: item?.id,
                        title: item?.jobId,
                        description: `Job-${itemNames[index]?.IT_NAME}-Target ${item?.targetQty}`,
                    }))
                },
            ],
        },
    };
    return object;
};

const createListInputBatches = (batches: any) => {
    const object = {
        type: "list",
        header: {
            type: "text",
            text: "Select the Input batch Details you would like",
        },
        body: {
            text: "You will be presented with a list of options to choose from",
        },
        footer: {
            text: "All of them are available",
        },
        action: {
            button: "Select",
            sections: [
                {
                    title: "List of Input Batches",
                    rows: batches.map((item: any, index: any) => ({
                        id: index + 1,
                        title: item?.activityId || item?.jobAssignId,
                        description: `Balance qty : ${item?.Balancequantity1}(M) - ${item?.Balancequantity2}(Kgs)`,
                    }))
                },
            ],
        },
    };
    return object;
};


const updateOA_DETMaster = async (readData: any, date: any, priority: any) => {
    const qadet = await OA_DETMaster.findOne(`${readData?.jobId}`);
    console.log("QAAAA", qadet?.jobId, priority, date);
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
    qadet.priority = priority ? priority : qadet.priority
    qadet.allowExcessQty = qadet.allowExcessQty

    if (date != null) {
        qadet.Delivery_Date = date
    } else {
        qadet.Delivery_Date = null
    }

    await qadet.save();
};

const createListObject = (jobs: any, itemNames: any) => {
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
                        description: itemNames[index],
                    }))
                },
            ],
        },
    };
    return object;
};