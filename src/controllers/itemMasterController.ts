import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { ItemMaster } from "../entity/itemMaster";

const ItemMasterSchema = Joi.object({
  IT_CODE:Joi.string().required(),
  branchId: Joi.string().required(),
  CO_CODE: Joi.string().required(),
  IT_NAME: Joi.string().required(),
  ALT_NAME: Joi.string().required(),
  ItemType: Joi.string().required(),
  Machine: Joi.string().required(),
  Production_Type: Joi.string().required(),
  Production_section_ID: Joi.string().required(),
  IG_CODE: Joi.string().required(),
  ALT_UNIT: Joi.string().required(),
  Otherchrage_Code: Joi.string().required(),
  UR_Code: Joi.number().required(),
  CUR_DATE: Joi.date().required(),
  CUR_TIME: Joi.string().required(),
  Item_status: Joi.string().required(),
  Unit_Code: Joi.string().required(),
  Tarrif_No_Code: Joi.string().required(),
  Packing_Type_Code: Joi.string().required(),
  SALT_RATE: Joi.string().required(),
  Lead_Period: Joi.string().required(),
  Reason: Joi.string().required(),
  Normal: Joi.boolean().required(),
  Size: Joi.string().required(),
  Per_PackIng_Qty: Joi.string().required(),
  Net_Weight: Joi.string().required(),
  Tolerance: Joi.string().required(),
  Old_Item_Code: Joi.string().required(),
  Minimum: Joi.string().required(),
  Stock_Effect: Joi.boolean().required(),
  Cost: Joi.string().required(),
  Minimum_Order_Qty: Joi.string().required(),
  Storage_Location_ID: Joi.string().required(),
  Ramco_Code: Joi.string().required(),
  Service_Item: Joi.string().required(),
  Consumable_HSN: Joi.string().required(),
  Long_Desc: Joi.string().required(),
  SP_PTNO: Joi.string().required(),
  CUST_PTNO: Joi.string().required(),
  PALT_RATE: Joi.string().required(),
  UseQty_Alt: Joi.string().required(),
  REOALT_QTY: Joi.string().required(),
  Color_Value: Joi.string().required(),
  Party_Name_ID: Joi.string().required(),
  Refe_NO: Joi.string().required(),
  BOM_Import_Yes_No: Joi.boolean().required(),
  Import_Yes_No: Joi.string().required(),
  Not_allow_fifo_Inpackingtick: Joi.boolean().required(),
  Circumference_ID: Joi.string().required(),
  Film_Type_ID: Joi.string().required(),
  Liner_Type_ID: Joi.string().required(),
  Gauge_ID: Joi.string().required(),
  Width_ID: Joi.string().required(),
  Color_ID: Joi.string().required(),
  Denier_ID: Joi.string().required(),
  Single_Double_Up: Joi.string().required(),
  Handle: Joi.string().required(),
  Handle_Type: Joi.string().required(),
  Fabric_Type: Joi.string().required(),
  Film_ID: Joi.string().required(),
  Special_Remark: Joi.string().required(),
  Party: Joi.string().required(),
  No_of_colors: Joi.string().required(),
  mtr_per_wgt: Joi.string().required(),
  Film_Name_ID: Joi.string().required(),
  Fabric_Name_ID: Joi.string().required(),
  Per_Bag_wgt: Joi.string().required(),
  Metalize_Film: Joi.boolean().required(),
  userId: Joi.string().required(),
  Route: Joi.string(),
  
});

export const createItemMaster = async (req: Request, res: Response) => {
  const { error } = ItemMasterSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {

    const itemmaster = new ItemMaster();
    itemmaster.IT_CODE = req.body.IT_CODE 
    itemmaster.branchId = req.body.branchId
    itemmaster.CO_CODE = req.body.CO_CODE
    itemmaster.IT_NAME = req.body.IT_NAME
    itemmaster.ALT_NAME = req.body.ALT_NAME 
    itemmaster.ItemType = req.body.ItemType 
    itemmaster.Machine = req.body.Machine 
    itemmaster.Production_Type = req.body.Production_Type
    itemmaster.IG_CODE = req.body.IG_CODE
    itemmaster.ALT_UNIT = req.body.ALT_UNIT
    itemmaster.Otherchrage_Code = req.body.Otherchrage_Code
    itemmaster.UR_Code = req.body.UR_Code
    itemmaster.CUR_DATE = req.body.CUR_DATE
    itemmaster.CUR_TIME = req.body.CUR_TIME
    itemmaster.Item_status = req.body.Item_status
    itemmaster.Unit_Code = req.body.Unit_Code
    itemmaster.Tarrif_No_Code = req.body.Tarrif_No_Code
    itemmaster.Packing_Type_Code = req.body.Packing_Type_Code
    itemmaster.SALT_RATE = req.body.SALT_RATE
    itemmaster.Lead_Period = req.body.Lead_Period
    itemmaster.Reason = req.body.Reason
    itemmaster.Normal = req.body.Normal
    itemmaster.Size = req.body.Size
    itemmaster.Per_PackIng_Qty = req.body.Per_PackIng_Qty
    itemmaster.Net_Weight = req.body.Net_Weight
    itemmaster.Tolerance = req.body.Tolerance
    itemmaster.Old_Item_Code = req.body.Old_Item_Code
    itemmaster.Minimum = req.body.Minimum
    itemmaster.Stock_Effect = req.body.Stock_Effect
    itemmaster.Cost = req.body.Cost
    itemmaster.Minimum_Order_Qty = req.body.Minimum_Order_Qty
    itemmaster.Storage_Location_ID = req.body.Storage_Location_ID
    itemmaster.Ramco_Code = req.body.Ramco_Code
    itemmaster.Service_Item = req.body.Service_Item
    itemmaster.Consumable_HSN = req.body.Consumable_HSN
    itemmaster.Long_Desc = req.body.Long_Desc
    itemmaster.SP_PTNO = req.body.SP_PTNO
    itemmaster.CUST_PTNO = req.body.CUST_PTNO
    itemmaster.PALT_RATE = req.body.PALT_RATE
    itemmaster.UseQty_Alt = req.body.UseQty_Alt
    itemmaster.REOALT_QTY = req.body.REOALT_QTY
    itemmaster.Color_Value = req.body.Color_Value
    itemmaster.Party_Name_ID = req.body.Party_Name_ID
    itemmaster.Refe_NO = req.body.Refe_NO
    itemmaster.BOM_Import_Yes_No = req.body.BOM_Import_Yes_No
    itemmaster.Import_Yes_No = req.body.Import_Yes_No
    itemmaster.Not_allow_fifo_Inpackingtick = req.body.Not_allow_fifo_Inpackingtick
    itemmaster.Circumference_ID = req.body.Circumference_ID
    itemmaster.Film_Type_ID = req.body.Film_Type_ID
    itemmaster.Liner_Type_ID = req.body.Liner_Type_ID
    itemmaster.Gauge_ID = req.body.Gauge_ID
    itemmaster.Width_ID = req.body.Width_ID
    itemmaster.Color_ID = req.body.Color_ID
    itemmaster.Denier_ID = req.body.Denier_ID
    itemmaster.Single_Double_Up = req.body.Single_Double_Up
    itemmaster.Handle = req.body.Handle
    itemmaster.Handle_Type = req.body.Handle_Type
    itemmaster.Fabric_Type = req.body.Fabric_Type
    itemmaster.Film_ID = req.body.Film_ID
    itemmaster.Special_Remark = req.body.Special_Remark
    itemmaster.Party = req.body.Party
    itemmaster.No_of_colors = req.body.No_of_colors
    itemmaster.mtr_per_wgt = req.body.mtr_per_wgt
    itemmaster.Film_Name_ID = req.body.Film_Name_ID
    itemmaster.Fabric_Name_ID = req.body.Fabric_Name_ID
    itemmaster.Per_Bag_wgt = req.body.Per_Bag_wgt
    itemmaster.Metalize_Film = req.body.Metalize_Film
    itemmaster.userId = req.body.userId
    
    await itemmaster.save();
    return res.status(201).json(itemmaster);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getAllItemMaster = async (_: Request, res: Response) => {
  try {
    const itemmaster = await ItemMaster.find();
    return res.json(itemmaster);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateItemMaster = async (req: Request, res: Response) => {
  const { error } = ItemMasterSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const itemmaster = await ItemMaster.findOne(req.params.id);
    if (!itemmaster) {
      return res.status(404).json({ error: 'itemmaster not found' });
    }
    itemmaster.IT_CODE = req.body.IT_CODE 
    itemmaster.branchId = req.body.branchId
    itemmaster.CO_CODE = req.body.CO_CODE
    itemmaster.IT_NAME = req.body.IT_NAME
    itemmaster.ALT_NAME = req.body.ALT_NAME 
    itemmaster.ItemType = req.body.ItemType 
    itemmaster.Machine = req.body.Machine 
    itemmaster.Production_Type = req.body.Production_Type
    itemmaster.IG_CODE = req.body.IG_CODE
    itemmaster.ALT_UNIT = req.body.ALT_UNIT
    itemmaster.Otherchrage_Code = req.body.Otherchrage_Code
    itemmaster.UR_Code = req.body.UR_Code
    itemmaster.CUR_DATE = req.body.CUR_DATE
    itemmaster.CUR_TIME = req.body.CUR_TIME
    itemmaster.Item_status = req.body.Item_status
    itemmaster.Unit_Code = req.body.Unit_Code
    itemmaster.Tarrif_No_Code = req.body.Tarrif_No_Code
    itemmaster.Packing_Type_Code = req.body.Packing_Type_Code
    itemmaster.SALT_RATE = req.body.SALT_RATE
    itemmaster.Lead_Period = req.body.Lead_Period
    itemmaster.Reason = req.body.Reason
    itemmaster.Normal = req.body.Normal
    itemmaster.Size = req.body.Size
    itemmaster.Per_PackIng_Qty = req.body.Per_PackIng_Qty
    itemmaster.Net_Weight = req.body.Net_Weight
    itemmaster.Tolerance = req.body.Tolerance
    itemmaster.Old_Item_Code = req.body.Old_Item_Code
    itemmaster.Minimum = req.body.Minimum
    itemmaster.Stock_Effect = req.body.Stock_Effect
    itemmaster.Cost = req.body.Cost
    itemmaster.Minimum_Order_Qty = req.body.Minimum_Order_Qty
    itemmaster.Storage_Location_ID = req.body.Storage_Location_ID
    itemmaster.Ramco_Code = req.body.Ramco_Code
    itemmaster.Service_Item = req.body.Service_Item
    itemmaster.Consumable_HSN = req.body.Consumable_HSN
    itemmaster.Long_Desc = req.body.Long_Desc
    itemmaster.SP_PTNO = req.body.SP_PTNO
    itemmaster.CUST_PTNO = req.body.CUST_PTNO
    itemmaster.PALT_RATE = req.body.PALT_RATE
    itemmaster.UseQty_Alt = req.body.UseQty_Alt
    itemmaster.REOALT_QTY = req.body.REOALT_QTY
    itemmaster.Color_Value = req.body.Color_Value
    itemmaster.Party_Name_ID = req.body.Party_Name_ID
    itemmaster.Refe_NO = req.body.Refe_NO
    itemmaster.BOM_Import_Yes_No = req.body.BOM_Import_Yes_No
    itemmaster.Import_Yes_No = req.body.Import_Yes_No
    itemmaster.Not_allow_fifo_Inpackingtick = req.body.Not_allow_fifo_Inpackingtick
    itemmaster.Circumference_ID = req.body.Circumference_ID
    itemmaster.Film_Type_ID = req.body.Film_Type_ID
    itemmaster.Liner_Type_ID = req.body.Liner_Type_ID
    itemmaster.Gauge_ID = req.body.Gauge_ID
    itemmaster.Width_ID = req.body.Width_ID
    itemmaster.Color_ID = req.body.Color_ID
    itemmaster.Denier_ID = req.body.Denier_ID
    itemmaster.Single_Double_Up = req.body.Single_Double_Up
    itemmaster.Handle = req.body.Handle
    itemmaster.Handle_Type = req.body.Handle_Type
    itemmaster.Fabric_Type = req.body.Fabric_Type
    itemmaster.Film_ID = req.body.Film_ID
    itemmaster.Special_Remark = req.body.Special_Remark
    itemmaster.Party = req.body.Party
    itemmaster.No_of_colors = req.body.No_of_colors
    itemmaster.mtr_per_wgt = req.body.mtr_per_wgt
    itemmaster.Film_Name_ID = req.body.Film_Name_ID
    itemmaster.Fabric_Name_ID = req.body.Fabric_Name_ID
    itemmaster.Per_Bag_wgt = req.body.Per_Bag_wgt
    itemmaster.Metalize_Film = req.body.Metalize_Film
    itemmaster.userId = req.body.userId
    itemmaster.Route = req.body.Route


    await itemmaster.save();
    return res.json(itemmaster);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateBulkItemMaster = async (req: Request, res: Response) => {
console.log(123);
  if (req.body.itemmaster.length) {
    const itemMasterData = req.body.itemmaster

    let responseData: any = []

    for (let i = 0; i < itemMasterData.length; i++) {
      const element = itemMasterData[i];
      const { error } = ItemMasterSchema.validate(element);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

    }

    try {

      for (let i = 0; i < itemMasterData.length; i++) {
        const element = itemMasterData[i];
        let itemMasterUpdateData:any;

        if(element.id){
          console.log("update");
          itemMasterUpdateData = await updateDataItemMaster(element)
        }

        else{
          itemMasterUpdateData = await createDataItemMaster(element)
          console.log("add");
        }

        responseData.push(itemMasterUpdateData);

      }
      return res.status(201).json(responseData);
    } catch (error) {
      return InternalServerError(res, error);
    }
  }

};

const updateDataItemMaster = async (data: any) => {
  const { error } = ItemMasterSchema.validate(data);

  if (error) {
    return { error: error.details[0].message }
  }

  try {
    const itemmaster = await ItemMaster.findOne(data.id);
    if (!itemmaster) {
      return { error: error.details[0].message }
    }
    itemmaster.IT_CODE = data.IT_CODE 
    itemmaster.branchId = data.branchId
    itemmaster.CO_CODE = data.CO_CODE
    itemmaster.IT_NAME = data.IT_NAME
    itemmaster.ALT_NAME = data.ALT_NAME 
    itemmaster.ItemType = data.ItemType 
    itemmaster.Machine = data.Machine 
    itemmaster.Production_Type = data.Production_Type
    itemmaster.IG_CODE = data.IG_CODE
    itemmaster.ALT_UNIT = data.ALT_UNIT
    itemmaster.Otherchrage_Code = data.Otherchrage_Code
    itemmaster.UR_Code = data.UR_Code
    itemmaster.CUR_DATE = data.CUR_DATE
    itemmaster.CUR_TIME = data.CUR_TIME
    itemmaster.Item_status = data.Item_status
    itemmaster.Unit_Code = data.Unit_Code
    itemmaster.Tarrif_No_Code = data.Tarrif_No_Code
    itemmaster.Packing_Type_Code = data.Packing_Type_Code
    itemmaster.SALT_RATE = data.SALT_RATE
    itemmaster.Lead_Period = data.Lead_Period
    itemmaster.Reason = data.Reason
    itemmaster.Normal = data.Normal
    itemmaster.Size = data.Size
    itemmaster.Per_PackIng_Qty = data.Per_PackIng_Qty
    itemmaster.Net_Weight = data.Net_Weight
    itemmaster.Tolerance = data.Tolerance
    itemmaster.Old_Item_Code = data.Old_Item_Code
    itemmaster.Minimum = data.Minimum
    itemmaster.Stock_Effect = data.Stock_Effect
    itemmaster.Cost = data.Cost
    itemmaster.Minimum_Order_Qty = data.Minimum_Order_Qty
    itemmaster.Storage_Location_ID = data.Storage_Location_ID
    itemmaster.Ramco_Code = data.Ramco_Code
    itemmaster.Service_Item = data.Service_Item
    itemmaster.Consumable_HSN = data.Consumable_HSN
    itemmaster.Long_Desc = data.Long_Desc
    itemmaster.SP_PTNO = data.SP_PTNO
    itemmaster.CUST_PTNO = data.CUST_PTNO
    itemmaster.PALT_RATE = data.PALT_RATE
    itemmaster.UseQty_Alt = data.UseQty_Alt
    itemmaster.REOALT_QTY = data.REOALT_QTY
    itemmaster.Color_Value = data.Color_Value
    itemmaster.Party_Name_ID = data.Party_Name_ID
    itemmaster.Refe_NO = data.Refe_NO
    itemmaster.BOM_Import_Yes_No = data.BOM_Import_Yes_No
    itemmaster.Import_Yes_No = data.Import_Yes_No
    itemmaster.Not_allow_fifo_Inpackingtick = data.Not_allow_fifo_Inpackingtick
    itemmaster.Circumference_ID = data.Circumference_ID
    itemmaster.Film_Type_ID = data.Film_Type_ID
    itemmaster.Liner_Type_ID = data.Liner_Type_ID
    itemmaster.Gauge_ID = data.Gauge_ID
    itemmaster.Width_ID = data.Width_ID
    itemmaster.Color_ID = data.Color_ID
    itemmaster.Denier_ID = data.Denier_ID
    itemmaster.Single_Double_Up = data.Single_Double_Up
    itemmaster.Handle = data.Handle
    itemmaster.Handle_Type = data.Handle_Type
    itemmaster.Fabric_Type = data.Fabric_Type
    itemmaster.Film_ID = data.Film_ID
    itemmaster.Special_Remark = data.Special_Remark
    itemmaster.Party = data.Party
    itemmaster.No_of_colors = data.No_of_colors
    itemmaster.mtr_per_wgt = data.mtr_per_wgt
    itemmaster.Film_Name_ID = data.Film_Name_ID
    itemmaster.Fabric_Name_ID = data.Fabric_Name_ID
    itemmaster.Per_Bag_wgt = data.Per_Bag_wgt
    itemmaster.Metalize_Film = data.Metalize_Film
    itemmaster.userId = data.userId
    itemmaster.Route = data.Route;

    await itemmaster.save();

    return itemmaster

  } catch (error) {
    return error
  }
};

const createDataItemMaster = async (data: any) => {
  const { error } = ItemMasterSchema.validate(data);

  if (error) {
    return { error: error.details[0].message }
  }

  try {

    const itemmaster = new ItemMaster();
    itemmaster.IT_CODE = data.IT_CODE 
    itemmaster.branchId = data.branchId
    itemmaster.CO_CODE = data.CO_CODE
    itemmaster.IT_NAME = data.IT_NAME
    itemmaster.ALT_NAME = data.ALT_NAME 
    itemmaster.ItemType = data.ItemType 
    itemmaster.Machine = data.Machine 
    itemmaster.Production_Type = data.Production_Type
    itemmaster.IG_CODE = data.IG_CODE
    itemmaster.ALT_UNIT = data.ALT_UNIT
    itemmaster.Otherchrage_Code = data.Otherchrage_Code
    itemmaster.UR_Code = data.UR_Code
    itemmaster.CUR_DATE = data.CUR_DATE
    itemmaster.CUR_TIME = data.CUR_TIME
    itemmaster.Item_status = data.Item_status
    itemmaster.Unit_Code = data.Unit_Code
    itemmaster.Tarrif_No_Code = data.Tarrif_No_Code
    itemmaster.Packing_Type_Code = data.Packing_Type_Code
    itemmaster.SALT_RATE = data.SALT_RATE
    itemmaster.Lead_Period = data.Lead_Period
    itemmaster.Reason = data.Reason
    itemmaster.Normal = data.Normal
    itemmaster.Size = data.Size
    itemmaster.Per_PackIng_Qty = data.Per_PackIng_Qty
    itemmaster.Net_Weight = data.Net_Weight
    itemmaster.Tolerance = data.Tolerance
    itemmaster.Old_Item_Code = data.Old_Item_Code
    itemmaster.Minimum = data.Minimum
    itemmaster.Stock_Effect = data.Stock_Effect
    itemmaster.Cost = data.Cost
    itemmaster.Minimum_Order_Qty = data.Minimum_Order_Qty
    itemmaster.Storage_Location_ID = data.Storage_Location_ID
    itemmaster.Ramco_Code = data.Ramco_Code
    itemmaster.Service_Item = data.Service_Item
    itemmaster.Consumable_HSN = data.Consumable_HSN
    itemmaster.Long_Desc = data.Long_Desc
    itemmaster.SP_PTNO = data.SP_PTNO
    itemmaster.CUST_PTNO = data.CUST_PTNO
    itemmaster.PALT_RATE = data.PALT_RATE
    itemmaster.UseQty_Alt = data.UseQty_Alt
    itemmaster.REOALT_QTY = data.REOALT_QTY
    itemmaster.Color_Value = data.Color_Value
    itemmaster.Party_Name_ID = data.Party_Name_ID
    itemmaster.Refe_NO = data.Refe_NO
    itemmaster.BOM_Import_Yes_No = data.BOM_Import_Yes_No
    itemmaster.Import_Yes_No = data.Import_Yes_No
    itemmaster.Not_allow_fifo_Inpackingtick = data.Not_allow_fifo_Inpackingtick
    itemmaster.Circumference_ID = data.Circumference_ID
    itemmaster.Film_Type_ID = data.Film_Type_ID
    itemmaster.Liner_Type_ID = data.Liner_Type_ID
    itemmaster.Gauge_ID = data.Gauge_ID
    itemmaster.Width_ID = data.Width_ID
    itemmaster.Color_ID = data.Color_ID
    itemmaster.Denier_ID = data.Denier_ID
    itemmaster.Single_Double_Up = data.Single_Double_Up
    itemmaster.Handle = data.Handle
    itemmaster.Handle_Type = data.Handle_Type
    itemmaster.Fabric_Type = data.Fabric_Type
    itemmaster.Film_ID = data.Film_ID
    itemmaster.Special_Remark = data.Special_Remark
    itemmaster.Party = data.Party
    itemmaster.No_of_colors = data.No_of_colors
    itemmaster.mtr_per_wgt = data.mtr_per_wgt
    itemmaster.Film_Name_ID = data.Film_Name_ID
    itemmaster.Fabric_Name_ID = data.Fabric_Name_ID
    itemmaster.Per_Bag_wgt = data.Per_Bag_wgt
    itemmaster.Metalize_Film = data.Metalize_Film
    itemmaster.userId = data.userId

    await itemmaster.save();

    return itemmaster
  } catch (error) {
    console.log(error)
    return error
  }
};

export const deleteItemMaster = async (req: Request, res: Response) => {
  try {
    const itemmaster = await ItemMaster.findOne(req.params.id);
    if (!itemmaster) {
      return res.status(404).json({ error: 'EmpType not found' });
    }

    await itemmaster.remove();
    return res.status(204).end();
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const ItemMasterById = async (req: Request, res: Response) => {
  try {
    const itemmaster = await ItemMaster.findOne(req.params.id);
    if (!itemmaster) {
      return res.status(404).json({ error: 'itemmaster not found' });
    }
    return res.json(itemmaster);
  } catch (error) {
    return InternalServerError(res, error);
  }
};



