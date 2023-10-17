import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { Batch } from "../entity/Batch";
// import { OA_DETMaster } from "src/entity/OA_DET";
// import { NodeMaster } from "src/entity/NodeMaster";
// import { Shift } from "src/entity/Shift";
// import { ActivityLog } from "src/entity/activitylog";
// import { Employee } from "src/entity/Employee";

const batchSchema = Joi.object({
  id: Joi.number(),
  branchId: Joi.number().required(),
  nodeId: Joi.number().required(),
  jobId: Joi.string().required(),
  itemId: Joi.string().required(),
  activityId: Joi.number().required(),
  quantity: Joi.number().required(),
  units: Joi.number().required(),
  product: Joi.string().required(),
  date: Joi.date().required(),
  userId: Joi.number().required(),
  outputId: Joi.string().required(),
});

export const createBatch = async (req: Request, res: Response) => {
  const { error } = batchSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newBatch = new Batch();
    newBatch.branchId = req.body.branchId;
    newBatch.nodeId = req.body.nodeId;
    newBatch.jobId = req.body.jobId;
    newBatch.itemId = req.body.itemId;
    newBatch.activityId = req.body.activityId;
    newBatch.quantity = req.body.quantity;
    newBatch.units = req.body.units;
    newBatch.product = req.body.product;
    newBatch.date = req.body.date;
    newBatch.userId = req.body.userId;
    newBatch.outputId = req.body.outputId;
    await newBatch.save();
    return res.status(201).json(newBatch);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getAllBatch = async (_: Request, res: Response) => {
  try {
    const batches = await Batch.find();
    return res.json(batches);
  }  catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateBatch = async (req: Request, res: Response) => {
  const { error } = batchSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const batch = await Batch.findOne(req.params.id);
    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    batch.branchId = req.body.batchId;
    batch.nodeId = req.body.nodeId;
    batch.jobId = req.body.jobId;
    batch.itemId = req.body.itemId;
    batch.activityId = req.body.activityId;
    batch.quantity = req.body.quantity;
    batch.units = req.body.units;
    batch.product = req.body.product;
    batch.date = req.body.date;
    batch.userId = req.body.userId;
    batch.outputId = req.body.outputId;

    await batch.save();
    return res.json(batch);
  }  catch (error) {
    return InternalServerError(res, error);
  }
};

export const deleteBatch = async (req: Request, res: Response) => {
  try {
    const batch = await Batch.findOne(req.params.id);
    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    await batch.remove();
    return res.status(204).end();
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const batchById = async (req: Request, res: Response) => {
  try {
    const batch = await Batch.findOne(req.params.id);
    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }
    return res.json(batch);
  }  catch (error) {
    return InternalServerError(res, error);
  }
};





