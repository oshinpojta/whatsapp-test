import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { BatchMaster } from "../entity/BatchMaster";
// import { OA_DETMaster } from "src/entity/OA_DET";
// import { NodeMaster } from "src/entity/NodeMaster";
// import { Shift } from "src/entity/Shift";
// import { ActivityLog } from "src/entity/activitylog";
// import { Employee } from "src/entity/Employee";

const batchSchema = Joi.object({
  id: Joi.number(),
  branchId: Joi.string().allow('', null),
  activityId: Joi.string().allow('', null),
  consumedActivityId: Joi.string().allow('', null),
  nodeId: Joi.string().allow('', null),
  producedAt: Joi.date().allow('', null),
  producedQty1: Joi.number().allow('', null),
  consumedQty1: Joi.number().allow('', null),
  balanceQty1: Joi.number().allow('', null),
  units1: Joi.string().allow('', null),
  producedQty2: Joi.number().allow('', null),
  consumedQty2: Joi.number().allow('', null),
  balanceQty2: Joi.number().allow('', null),
  units2: Joi.string().allow('', null),
  lastConsumedAt: Joi.date().allow('', null),
  fgId: Joi.string().allow('', null),
  producedJobId: Joi.string().allow('', null),
  lastConsumedJobId: Joi.string().allow('', null),
  conversionRate: Joi.number().allow('', null),
  userId: Joi.number().allow('', null),
});

export const createBatchMaster = async (req: Request, res: Response) => {
  const { error } = batchSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  console.log(req.body, "BATCH INPUT")
  try {
    const newBatch = new BatchMaster();
    newBatch.branchId = req.body.branchId;
    newBatch.activityId = req.body.activityId;
    newBatch.consumedActivityId = req.body.consumedActivityId;
    newBatch.nodeId = req.body.nodeId;
    newBatch.producedAt = req.body.producedAt;
    newBatch.producedQty1 = req.body.producedQty1;
    newBatch.consumedQty1 = req.body.consumedQty1;
    newBatch.balanceQty1 = req.body.balanceQty1;
    newBatch.units1 = req.body.units1;
    newBatch.producedQty2 = req.body.producedQty2;
    newBatch.consumedQty2 = req.body.consumedQty2;
    newBatch.balanceQty2 = req.body.balanceQty2;
    newBatch.units2 = req.body.units2;
    newBatch.lastConsumedAt = req.body.lastConsumedAt;
    newBatch.fgId = req.body.fgId;
    newBatch.producedJobId = req.body.producedJobId;
    newBatch.lastConsumedJobId = req.body.lastConsumedJobId;
    newBatch.conversionRate = req.body.conversionRate;
    newBatch.userId = req.body.userId;
    console.log(newBatch);
    await newBatch.save();
    return res.status(201).json(newBatch);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getAllBatchMaster = async (_: Request, res: Response) => {
  try {
    const newBatch = await BatchMaster.find();
    return res.json(newBatch);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateBatchMaster = async (req: Request, res: Response) => {
  const { error } = batchSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newBatch = await BatchMaster.findOne(req.params.id);
    if (!newBatch) {
      return res.status(404).json({ error: 'newBatch not found' });
    }

    newBatch.branchId = req.body.branchId;
    newBatch.activityId = req.body.activityId;
    newBatch.consumedActivityId = req.body.consumedActivityId;
    newBatch.nodeId = req.body.nodeId;
    newBatch.producedAt = req.body.producedAt;
    newBatch.producedQty1 = req.body.producedQty1;
    newBatch.consumedQty1 = req.body.consumedQty1;
    newBatch.balanceQty1 = req.body.balanceQty1;
    newBatch.units1 = req.body.units1;
    newBatch.producedQty2 = req.body.producedQty2;
    newBatch.consumedQty2 = req.body.consumedQty2;
    newBatch.balanceQty2 = req.body.balanceQty2;
    newBatch.units2 = req.body.units2;
    newBatch.lastConsumedAt = req.body.lastConsumedAt;
    newBatch.fgId = req.body.fgId;
    newBatch.producedJobId = req.body.producedJobId;
    newBatch.lastConsumedJobId = req.body.lastConsumedJobId;
    newBatch.conversionRate = req.body.conversionRate;
    newBatch.userId = req.body.userId;

    await newBatch.save();
    return res.json(newBatch);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateBatchMasterData = async (data: any) => {
  const { error } = batchSchema.validate(data);

  if (error) {
    return { error: error.details[0].message }
  }

  try {
    const newBatch = await BatchMaster.findOne(data.id);
    if (!newBatch) {
      return { error: error.details[0].message }
    }
    newBatch.branchId = data.body.branchId;
    newBatch.activityId = data.body.activityId;
    newBatch.consumedActivityId = data.consumedActivityId;
    newBatch.nodeId = data.body.nodeId;
    newBatch.producedAt = data.body.producedAt;
    newBatch.producedQty1 = data.body.producedQty1;
    newBatch.consumedQty1 = data.body.consumedQty1;
    newBatch.balanceQty1 = data.body.balanceQty1;
    newBatch.units1 = data.body.units1;
    newBatch.producedQty2 = data.body.producedQty2;
    newBatch.consumedQty2 = data.body.consumedQty2;
    newBatch.balanceQty2 = data.body.balanceQty2;
    newBatch.units2 = data.body.units2;
    newBatch.lastConsumedAt = data.body.lastConsumedAt;
    newBatch.fgId = data.body.fgId;
    newBatch.producedJobId = data.body.producedJobId;
    newBatch.lastConsumedJobId = data.body.lastConsumedJobId;
    newBatch.conversionRate = data.body.conversionRate;
    newBatch.userId = data.body.userId;

    await newBatch.save();

    return newBatch

  } catch (error) {
    return error
  }
};

export const createBatchMasterData = async (data: any) => {
  const { error } = batchSchema.validate(data);

  if (error) {
    return { error: error.details[0].message }
  }
  try {
    const newBatch = new BatchMaster();
    newBatch.branchId = data.body.branchId;
    newBatch.activityId = data.body.activityId;
    newBatch.consumedActivityId = data.consumedActivityId;
    newBatch.nodeId = data.body.nodeId;
    newBatch.producedAt = data.body.producedAt;
    newBatch.producedQty1 = data.body.producedQty1;
    newBatch.consumedQty1 = data.body.consumedQty1;
    newBatch.balanceQty1 = data.body.balanceQty1;
    newBatch.units1 = data.body.units1;
    newBatch.producedQty2 = data.body.producedQty2;
    newBatch.consumedQty2 = data.body.consumedQty2;
    newBatch.balanceQty2 = data.body.balanceQty2;
    newBatch.units2 = data.body.units2;
    newBatch.lastConsumedAt = data.body.lastConsumedAt;
    newBatch.fgId = data.body.fgId;
    newBatch.producedJobId = data.body.producedJobId;
    newBatch.lastConsumedJobId = data.body.lastConsumedJobId;
    newBatch.conversionRate = data.body.conversionRate;
    newBatch.userId = data.body.userId;

    await newBatch.save();

    return newBatch
  } catch (error) {
    console.log(error)
    return error
  }
};

export const deleteBatchMaster = async (req: Request, res: Response) => {
  try {
    const newBatch = await BatchMaster.findOne(req.params.id);
    if (!newBatch) {
      return res.status(404).json({ error: 'newBatch not found' });
    }

    await newBatch.remove();
    return res.status(204).end();
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const batchById = async (req: Request, res: Response) => {
  try {
    const newBatch = await BatchMaster.findOne(req.params.id);
    if (!newBatch) {
      return res.status(404).json({ error: 'Batch not found' });
    }
    return res.json(newBatch);
  } catch (error) {
    return InternalServerError(res, error);
  }
};
