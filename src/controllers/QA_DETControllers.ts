// import { getRepository } from 'typeorm';
import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { OA_DETMaster } from "../entity/OA_DET";
import { ItemMaster } from "../entity/itemMaster";


const QA_DETSchema = Joi.object({
  jobId:Joi.string().required(),
  branchId: Joi.string().required(),
  CO_CODE: Joi.string().required(),
  OA_NO: Joi.string().required(),
  IT_CODE: Joi.string().required(),
  OA_SRNO: Joi.number().required(),
  Remarks: Joi.string().required(),
  fyear: Joi.string().required(),
  DB_CODE: Joi.string().required(),
  ALT_QTY: Joi.string().required(),
  Delivery_Date: Joi.date().required(),
  ALT_RATE: Joi.number().required(),
  UR_CODE: Joi.number().required(),
  Final_Amt: Joi.number().required(),
  Location_Code: Joi.string().required(),
  Index: Joi.number().required(),
  URN_No: Joi.string().required(),
  OA_Status: Joi.string().required(),
  From_URN_No: Joi.string().required(),
  From_Item_Sr_No: Joi.string().required(),
  ALT_UNIT_ID: Joi.string().required(),
  Item_Long_Description: Joi.string().required(),
  reason: Joi.string().required(),
  Tolerance: Joi.number().required(),
  Close_Open_Status: Joi.boolean().required(),
  Close_Open_Reason: Joi.string().required(),
  Discount: Joi.string().required(),
  DIS_Amount: Joi.number().required(),
  InputAmount: Joi.string().required(),
  MRP: Joi.string().required(),
  Other_Unit_ID: Joi.string().required(),
  Other_Qty: Joi.string().required(),
  No_of_Color: Joi.string().required(),
  Film_Type: Joi.string().required(),
  Single_Double_up_Type: Joi.string().required(),
  Handle: Joi.string().required(),
  Handle_Type: Joi.string().required(),
  Bag_Size: Joi.string().required(),
  Liner: Joi.number().required(),
  Liner_Type: Joi.string().required(),
  Fabric_Type: Joi.string().required(),
  Color: Joi.string().required(),
  Special_Remark: Joi.string().required(),
  Circumfrence: Joi.number().required(),
  Film_Size: Joi.number().required(),
  Denier: Joi.number().required(),
  ALT_UNIT: Joi.string().required(),
  Production_type: Joi.string().required(),
  userId: Joi.string().required(),
  // ItemMaster: Joi.string().required()
});

export const createOA_DETMaster = async (req: Request, res: Response) => {
  const { error } = QA_DETSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {

    const qadet = new OA_DETMaster();
    qadet.jobId = req.body.jobId;
    qadet.branchId = req.body.branchId;
    qadet.CO_CODE = req.body.CO_CODE
    qadet.OA_NO = req.body.OA_NO
    qadet.IT_CODE = req.body.IT_CODE
    qadet.OA_SRNO = req.body.OA_SRNO
    qadet.Remarks = req.body.Remarks
    qadet.fyear = req.body.fyear
    qadet.DB_CODE = req.body.DB_CODE
    qadet.ALT_QTY = req.body.ALT_QTY
    qadet.Delivery_Date = req.body.Delivery_Date
    qadet.ALT_RATE = req.body.ALT_RATE
    qadet.UR_CODE = req.body.UR_CODE
    qadet.Final_Amt = req.body.Final_Amt
    qadet.Location_Code = req.body.Location_Code
    qadet.Index = req.body.Index
    qadet.URN_No = req.body.URN_No
    qadet.OA_Status = req.body.OA_Status
    qadet.From_URN_No = req.body.From_URN_No
    qadet.From_Item_Sr_No = req.body.From_Item_Sr_No
    qadet.ALT_UNIT_ID = req.body.ALT_UNIT_ID
    qadet.Item_Long_Description = req.body.Item_Long_Description
    qadet.reason = req.body.reason
    qadet.Tolerance = req.body.Tolerance
    qadet.Close_Open_Status = req.body.Close_Open_Status
    qadet.Close_Open_Reason = req.body.Close_Open_Reason
    qadet.Discount = req.body.Discount
    qadet.DIS_Amount = req.body.DIS_Amount
    qadet.InputAmount = req.body.InputAmount
    qadet.MRP = req.body.MRP
    qadet.Other_Unit_ID = req.body.Other_Unit_ID
    qadet.Other_Qty = req.body.Other_Qty
    qadet.No_of_Color = req.body.No_of_Color
    qadet.Film_Type = req.body.Film_Type
    qadet.Single_Double_up_Type = req.body.Single_Double_up_Type
    qadet.Handle = req.body.Handle
    qadet.Handle_Type = req.body.Handle_Type
    qadet.Bag_Size = req.body.Bag_Size
    qadet.Liner = req.body.Liner
    qadet.Liner_Type = req.body.Liner_Type
    qadet.Fabric_Type = req.body.Fabric_Type
    qadet.Color = req.body.Color
    qadet.Special_Remark = req.body.Special_Remark
    qadet.Circumfrence = req.body.Circumfrence
    qadet.Film_Size = req.body.Film_Size
    qadet.Denier = req.body.Denier
    qadet.ALT_UNIT = req.body.ALT_UNIT
    qadet.Production_type = req.body.Production_type
    qadet.userId = req.body.userId

    await qadet.save();
    return res.status(201).json(qadet);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getAllQA_DET = async (_: Request, res: Response) => {
  try {
    console.log("HELLOO")
    // const oaDetRepository = getRepository(OA_DETMaster);

      const oaDetails = await OA_DETMaster.find();
      const itemMaster = await ItemMaster.find();
      
      // Create a Map for itemMaster using IT_CODE as the key
      const itemMasterMap = new Map(itemMaster.map(item => [item.IT_CODE, { IT_NAME: item.IT_NAME, ItemType: item.ItemType }]));
      
      const commonObjects = [];
      
      for (const oaDetail of oaDetails) {
        const itemData  = itemMasterMap.get(oaDetail.IT_CODE);
        // const IT_CODE 
      
        if (itemData  !== undefined) {
          const commonObject = {
            jobId: oaDetail.jobId,
            IT_CODE: oaDetail.IT_CODE,
            IT_NAME: itemData.IT_NAME,
            ItemType: itemData.ItemType,
          };
          commonObjects.push(commonObject);
        }
      }
      
      console.log('common>>', commonObjects);
      
//console.log('common>>', commonObjects);
  //    console.log('common Object length', commonObjects.length)
    //  console.log('common>>',commonObjects);

   // console.log('oadetails',oaDetails)
   // console.log('itemMaster',itemMaster)
   //p const qadet = await OA_DETMaster.find( {relations: ['ItemMaster']});
   //p console.log(qadet,"@@@@@@@@@@@@@@@@@@@")
    // const qadet  = await OA_DETMaster.find()
    return res.json(commonObjects);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

/*

 const oaDetRepository = getRepository(OA_DETMaster);
    const qadet = await oaDetRepository
      .createQueryBuilder('oaDet') // 'oaDet' is an alias for OA_DETMaster
      .select(['oaDet.id', 'oaDet.name']) // Specify the columns you want
      .innerJoin('oaDet.otherEntity', 'otherEntity') // Join with OtherEntity
      .addSelect(['otherEntity.someField']) // Select specific columns from OtherEntity
      .getMany();


*/

export const updateOA_DETMaster = async (req: Request, res: Response) => {
  const { error } = QA_DETSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const qadet = await OA_DETMaster.findOne(req.params.id);
    if (!qadet) {
      return res.status(404).json({ error: 'qadet not found' });
    }
    qadet.jobId = req.body.jobId;
    qadet.branchId = req.body.branchId;
    qadet.CO_CODE = req.body.CO_CODE
    qadet.OA_NO = req.body.OA_NO
    qadet.IT_CODE = req.body.IT_CODE
    qadet.OA_SRNO = req.body.OA_SRNO
    qadet.Remarks = req.body.Remarks
    qadet.fyear = req.body.fyear
    qadet.DB_CODE = req.body.DB_CODE
    qadet.ALT_QTY = req.body.ALT_QTY
    qadet.Delivery_Date = req.body.Delivery_Date
    qadet.ALT_RATE = req.body.ALT_RATE
    qadet.UR_CODE = req.body.UR_CODE
    qadet.Final_Amt = req.body.Final_Amt
    qadet.Location_Code = req.body.Location_Code
    qadet.Index = req.body.Index
    qadet.URN_No = req.body.URN_No
    qadet.OA_Status = req.body.OA_Status
    qadet.From_URN_No = req.body.From_URN_No
    qadet.From_Item_Sr_No = req.body.From_Item_Sr_No
    qadet.ALT_UNIT_ID = req.body.ALT_UNIT_ID
    qadet.Item_Long_Description = req.body.Item_Long_Description
    qadet.reason = req.body.reason
    qadet.Tolerance = req.body.Tolerance
    qadet.Close_Open_Status = req.body.Close_Open_Status
    qadet.Close_Open_Reason = req.body.Close_Open_Reason
    qadet.Discount = req.body.Discount
    qadet.DIS_Amount = req.body.DIS_Amount
    qadet.InputAmount = req.body.InputAmount
    qadet.MRP = req.body.MRP
    qadet.Other_Unit_ID = req.body.Other_Unit_ID
    qadet.Other_Qty = req.body.Other_Qty
    qadet.No_of_Color = req.body.No_of_Color
    qadet.Film_Type = req.body.Film_Type
    qadet.Single_Double_up_Type = req.body.Single_Double_up_Type
    qadet.Handle = req.body.Handle
    qadet.Handle_Type = req.body.Handle_Type
    qadet.Bag_Size = req.body.Bag_Size
    qadet.Liner = req.body.Liner
    qadet.Liner_Type = req.body.Liner_Type
    qadet.Fabric_Type = req.body.Fabric_Type
    qadet.Color = req.body.Color
    qadet.Special_Remark = req.body.Special_Remark
    qadet.Circumfrence = req.body.Circumfrence
    qadet.Film_Size = req.body.Film_Size
    qadet.Denier = req.body.Denier
    qadet.ALT_UNIT = req.body.ALT_UNIT
    qadet.Production_type = req.body.Production_type
    qadet.userId = req.body.userId

    await qadet.save();
    return res.json(qadet);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateBulkOA_DETMaster = async (req: Request, res: Response) => {
console.log(123);
  if (req.body.qadet.length) {
    const OA_DETMasterData = req.body.qadet

    let responseData: any = []

    for (let i = 0; i < OA_DETMasterData.length; i++) {
      const element = OA_DETMasterData[i];
      const { error } = QA_DETSchema.validate(element);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

    }

    try {

      for (let i = 0; i < OA_DETMasterData.length; i++) {
        const element = OA_DETMasterData[i];
        let qa_detUpdateData:any;

        if(element.id){
          console.log("update");
          qa_detUpdateData = await updateDataOA_DETMaster(element)
        }

        else{
          qa_detUpdateData = await createDataOA_DETMaster(element)
          console.log("add");
        }

        responseData.push(qa_detUpdateData);

      }
      return res.status(201).json(responseData);
    } catch (error) {
      return InternalServerError(res, error);
    }
  }

};

const updateDataOA_DETMaster = async (data: any) => {
  const { error } = QA_DETSchema.validate(data);

  if (error) {
    return { error: error.details[0].message }
  }

  try {
    const qadet = await OA_DETMaster.findOne(data.id);
    if (!qadet) {
      return { error: error.details[0].message }
    }
    qadet.jobId = data.jobId;
    qadet.branchId = data.branchId;
    qadet.CO_CODE = data.CO_CODE
    qadet.OA_NO = data.OA_NO
    qadet.IT_CODE = data.IT_CODE
    qadet.OA_SRNO = data.OA_SRNO
    qadet.Remarks = data.Remarks
    qadet.fyear = data.fyear
    qadet.DB_CODE = data.DB_CODE
    qadet.ALT_QTY = data.ALT_QTY
    qadet.Delivery_Date = data.Delivery_Date
    qadet.ALT_RATE = data.ALT_RATE
    qadet.UR_CODE = data.UR_CODE
    qadet.Final_Amt = data.Final_Amt
    qadet.Location_Code = data.Location_Code
    qadet.Index = data.Index
    qadet.URN_No = data.URN_No
    qadet.OA_Status = data.OA_Status
    qadet.From_URN_No = data.From_URN_No
    qadet.From_Item_Sr_No = data.From_Item_Sr_No
    qadet.ALT_UNIT_ID = data.ALT_UNIT_ID
    qadet.Item_Long_Description = data.Item_Long_Description
    qadet.reason = data.reason
    qadet.Tolerance = data.Tolerance
    qadet.Close_Open_Status = data.Close_Open_Status
    qadet.Close_Open_Reason = data.Close_Open_Reason
    qadet.Discount = data.Discount
    qadet.DIS_Amount = data.DIS_Amount
    qadet.InputAmount = data.InputAmount
    qadet.MRP = data.MRP
    qadet.Other_Unit_ID = data.Other_Unit_ID
    qadet.Other_Qty = data.Other_Qty
    qadet.No_of_Color = data.No_of_Color
    qadet.Film_Type = data.Film_Type
    qadet.Single_Double_up_Type = data.Single_Double_up_Type
    qadet.Handle = data.Handle
    qadet.Handle_Type = data.Handle_Type
    qadet.Bag_Size = data.Bag_Size
    qadet.Liner = data.Liner
    qadet.Liner_Type = data.Liner_Type
    qadet.Fabric_Type = data.Fabric_Type
    qadet.Color = data.Color
    qadet.Special_Remark = data.Special_Remark
    qadet.Circumfrence = data.Circumfrence
    qadet.Film_Size = data.Film_Size
    qadet.Denier = data.Denier
    qadet.ALT_UNIT = data.ALT_UNIT
    qadet.Production_type = data.Production_type
    qadet.userId = data.userId

    await qadet.save();

    return qadet

  } catch (error) {
    return error
  }
};

const createDataOA_DETMaster = async (data: any) => {
  const { error } = QA_DETSchema.validate(data);

  if (error) {
    return { error: error.details[0].message }
  }

  try {

    const qadet = new OA_DETMaster();
    qadet.jobId = data.jobId;
    qadet.branchId = data.branchId;
    qadet.CO_CODE = data.CO_CODE
    qadet.OA_NO = data.OA_NO
    qadet.IT_CODE = data.IT_CODE
    qadet.OA_SRNO = data.OA_SRNO
    qadet.Remarks = data.Remarks
    qadet.fyear = data.fyear
    qadet.DB_CODE = data.DB_CODE
    qadet.ALT_QTY = data.ALT_QTY
    qadet.Delivery_Date = data.Delivery_Date
    qadet.ALT_RATE = data.ALT_RATE
    qadet.UR_CODE = data.UR_CODE
    qadet.Final_Amt = data.Final_Amt
    qadet.Location_Code = data.Location_Code
    qadet.Index = data.Index
    qadet.URN_No = data.URN_No
    qadet.OA_Status = data.OA_Status
    qadet.From_URN_No = data.From_URN_No
    qadet.From_Item_Sr_No = data.From_Item_Sr_No
    qadet.ALT_UNIT_ID = data.ALT_UNIT_ID
    qadet.Item_Long_Description = data.Item_Long_Description
    qadet.reason = data.reason
    qadet.Tolerance = data.Tolerance
    qadet.Close_Open_Status = data.Close_Open_Status
    qadet.Close_Open_Reason = data.Close_Open_Reason
    qadet.Discount = data.Discount
    qadet.DIS_Amount = data.DIS_Amount
    qadet.InputAmount = data.InputAmount
    qadet.MRP = data.MRP
    qadet.Other_Unit_ID = data.Other_Unit_ID
    qadet.Other_Qty = data.Other_Qty
    qadet.No_of_Color = data.No_of_Color
    qadet.Film_Type = data.Film_Type
    qadet.Single_Double_up_Type = data.Single_Double_up_Type
    qadet.Handle = data.Handle
    qadet.Handle_Type = data.Handle_Type
    qadet.Bag_Size = data.Bag_Size
    qadet.Liner = data.Liner
    qadet.Liner_Type = data.Liner_Type
    qadet.Fabric_Type = data.Fabric_Type
    qadet.Color = data.Color
    qadet.Special_Remark = data.Special_Remark
    qadet.Circumfrence = data.Circumfrence
    qadet.Film_Size = data.Film_Size
    qadet.Denier = data.Denier
    qadet.ALT_UNIT = data.ALT_UNIT
    qadet.Production_type = data.Production_type
    qadet.userId = data.userId

    await qadet.save();

    return qadet
  } catch (error) {
    console.log(error)
    return error
  }
};

export const deleteOA_DETMaster = async (req: Request, res: Response) => {
  try {
    const qadet = await OA_DETMaster.findOne(req.params.id);
    if (!qadet) {
      return res.status(404).json({ error: 'qadet not found' });
    }

    await qadet.remove();
    return res.status(204).end();
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const OA_DETMasterById = async (req: Request, res: Response) => {
  try {
    const qadet = await OA_DETMaster.findOne(req.params.id);
    if (!qadet) {
      return res.status(404).json({ error: 'qadet not found' });
    }
    return res.json(qadet);
  } catch (error) {
    return InternalServerError(res, error);
  }
};



