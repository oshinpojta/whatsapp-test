import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { Shift } from "../entity/Shift";

const shiftSchema = Joi.object({
  // shiftId: Joi.string().required(),
  branchId: Joi.string().required(),
  shiftName: Joi.string().required(),
  shiftNumber: Joi.string().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  userId: Joi.string().required(),
  
});

export const createShift = async (req: Request, res: Response) => {
  const { error } = shiftSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    
    const shift = new Shift();
    // shift.shiftId = req.body.shiftId;
    shift.branchId = req.body.branchId;
    shift.shiftName = req.body.shiftName;
    shift.shiftNumber = req.body.shiftNumber;
    shift.startTime = req.body.startTime;
    shift.endTime = req.body.endTime;
    shift.userId = req.body.userId;
    await shift.save();
    return res.status(201).json(shift);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getAllShift = async (_: Request, res: Response) => {
  try {
    const shiftes = await Shift.find();
    return res.json(shiftes);
  }  catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateShift = async (req: Request, res: Response) => {
  const { error } = shiftSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const shift = await Shift.findOne(req.params.id);
    if (!shift) {
      return res.status(404).json({ error: 'Shift not found' });
    }

    // shift.shiftId = req.body.shiftId;
    shift.branchId = req.body.branchId;
    shift.shiftName = req.body.shiftName;
    shift.startTime = req.body.startTime;
    shift.endTime = req.body.endTime;
    shift.userId = req.body.userId;

    await shift.save();
    return res.json(shift);
  }  catch (error) {
    return InternalServerError(res, error);
  }
};

export const deleteShift = async (req: Request, res: Response) => {
  try {
    const shift = await Shift.findOne(req.params.id);
    if (!shift) {
      return res.status(404).json({ error: 'Shift not found' });
    }

    await shift.remove();
    return res.status(204).end();
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const shiftById = async (req: Request, res: Response) => {
  try {
    const shift = await Shift.findOne(req.params.id);
    if (!shift) {
      return res.status(404).json({ error: 'Shift not found' });
    }
    return res.json(shift);
  }  catch (error) {
    return InternalServerError(res, error);
  }
};

