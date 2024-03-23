import { Request, Response, response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
//import { OA_DETMaster } from "../entity/OA_DET";
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
        const token = 'EAADs4mGRLYwBO8yw1zn0ZARMpRZAo1cBvzTj30jE17YM1rqaJpcM2dEMISdmzE28aHrthbd3KQsU6IAWQkE5VeZB9HHyblJvEL2mTT0KUURQ9tefhoKU1J2gR4Taqx9nFiAxBkkZCi6TLRHC5EMIIiXgqSxp1nV64AZC3vlHcQ92oXKjCyjR0hWBMzha4xHPwYqWRFRY2y2XF9I4bAPZAdMWnAysUodP9RlIgZD';

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
                let msg = body_param.entry[0].changes[0].value.messages[0];
                if (msg?.type === "text") {
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
                else if (msg?.interactive?.type == "list_reply" && msg?.interactive?.list_reply?.description == "Machine") {
                    const sql = require('mssql');
                    await sql.connect(config);

                    let node_id = msg?.interactive?.list_reply?.title.split('-')[0];
                    console.log("MSGGGG", node_id);
                    let jobAssign = await new sql.Request().query(`SELECT * FROM [Taxonanalytica].[dbo].[job_assign] WHERE node_id = '${node_id}';`);

                    console.log(jobAssign);
                    let listObject = createListObject(jobAssign?.recordset.slice(0, 10));

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
                    const readData = JSON.parse(fs.readFileSync(filePath));
                    const data = { ...readData, nodeId: node_id };
                    fs.writeFileSync(filePath, JSON.stringify(data));
                }
                else if (msg?.interactive?.type == "list_reply" && msg?.interactive?.list_reply?.description == "Job") {
                    const sql = require('mssql');
                    await sql.connect(config);
                    const readData = JSON.parse(fs.readFileSync(filePath));
                    const nodeId = readData?.nodeId;
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

                    const inputBatches = createListInputBatches(inputsData[0]);

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
                    const inputDetails = readData?.inputDetails || [];
                    const data = {
                        ...readData,
                        jobId: jobId, nodeDetails: nodeDetails,
                        batchDetails: batchDetails, edgeDetails: edgeDetails,
                        fgDetails: fgDetails, fgId: fgId, routeId: routeId,
                        jobAssignId: jobAssignId, outputDetail: outputDetails,
                        inputId: inputNodesFromEdge[0],
                        inputDetails: inputDetails,
                        outputDetails: [],
                    };
                    console.log(data, "dataaaaaaa");
                    fs.writeFileSync(filePath, JSON.stringify(data));
                }
                else if (msg?.interactive?.type == "list_reply" && msg?.interactive?.list_reply?.description.includes("Available")) {
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
                }
                const readData = JSON.parse(fs.readFileSync(filePath));
                if (msg?.interactive?.type == 'nfm_reply' && readData.outputDetail?.length) {
                    const responses = JSON.parse(msg?.interactive.nfm_reply.response_json);

                    const readData = JSON.parse(fs.readFileSync(filePath));
                    const outputDetails = readData?.outputDetail //edgeDetails.filter((item: any) => item.sourceNodeId == nodeId && item.routeId == routeId);

                    let nodeDetail = readData?.nodeDetails?.filter((item1: any) => item1.nodeId === outputDetails[0]?.targetNodeId)[0];
                    const nodeName = nodeDetail?.nodeName;
                    const nodeCategory = nodeDetail?.nodeCategory;
                    console.log("outputDetails", outputDetails, nodeName, nodeCategory);
                    axios({
                        method: "POST",
                        url: "https://graph.facebook.com/v18.0/" + phon_no_id + "/messages?access_token=" + token,
                        data: {
                            "messaging_product": "whatsapp",
                            "recipient_type": "individual",
                            "to": from,
                            "type": "template",
                            "template": {
                                "name": "output_batches",
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
                    const inputDetails = readData?.inputDetails;
                    //console.log(inputDetails, readData?.inputId, "inputttDetailsss");
                    let data = { ...readData };
                    if (data?.inputId) {
                        data["inputDetails"].push({
                            inputId: readData?.inputId,
                            availableQty1: responses?.screen_0_TextInput_0,
                            availableQty2: responses?.screen_0_TextInput_1,
                            balanceQty1: responses?.screen_0_TextInput_0,
                            balanceQty2: responses?.screen_0_TextInput_1,
                        });
                        data.inputId = null;
                    } else {
                        data["outputDetails"].push({
                            outputId: outputDetails[0]?.targetNodeId,
                            availableQty1: responses?.screen_0_TextInput_0,
                            availableQty2: responses?.screen_0_TextInput_1,
                            balanceQty1: responses?.screen_0_TextInput_0,
                            balanceQty2: responses?.screen_0_TextInput_1,
                        })
                    }
                    const outputDetail = outputDetails.slice(1);
                    if (outputDetail.length) {
                        data = { ...data, outputDetail: outputDetail };
                    } else {
                        const { edgeDetails, nodeDetails, fgDetails, batchDetails, ...rest } = data;
                        data = rest;
                    }
                    console.log("inputDataaa", data);
                    fs.writeFileSync(filePath, JSON.stringify(data));
                }
            }
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
                    rows: jobs.map((item: any) => ({
                        id: item?.id,
                        title: item?.jobId,
                        description: "Job",
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
            text: "Select the Input batch you would like",
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
                    title: "List of Input Batches",
                    rows: batches.map((item: any, index: any) => ({
                        id: index + 1,
                        title: item?.activityId || item?.jobAssignId,
                        description: `Available qty : ${item?.Availablequantity1}(M) - ${item?.Availablequantity2}(Kgs) Balance qty : ${item?.Balancequantity1}(M) - ${item?.Balancequantity2}(Kgs)`,
                    }))
                },
            ],
        },
    };
    return object;
};
