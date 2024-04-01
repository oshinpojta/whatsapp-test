import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { Manager } from "../entity/Manager";

const managerSchema = Joi.object({
    userId: Joi.string().required(),
    branchId: Joi.string().required(),
    employeeName: Joi.string().required(),
    designation: Joi.string().required(),
    phoneno: Joi.date().allow('', null),
});

export const createEmployee = async (req: Request, res: Response) => {
    const { error } = managerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const employee = new Manager();
        employee.userId = req.body.userId;
        employee.branchId = req.body.branchId;
        employee.designation = req.body.designation;
        employee.employeeName = req.body.employeeName;
        employee.phoneno = req.body.phoneno;
        await employee.save();
        return res.status(201).json(employee);
    } catch (error) {
        return InternalServerError(res, error);
    }
};

export const getAllEmployee = async (_: Request, res: Response) => {
    try {
        const Employees = await Manager.find();
        return res.json(Employees);
    } catch (error) {
        return InternalServerError(res, error);
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    const { error } = managerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const employee = await Manager.findOne(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        // employee.empId = req.body.empId;
        employee.branchId = req.body.branchId;
        employee.employeeName = req.body.employeeName;
        employee.designation = req.body.designation;
        employee.userId = req.body.userId;
        employee.phoneno = req.body.phoneno;
        await employee.save();
        return res.json(employee);
    } catch (error) {
        return InternalServerError(res, error);
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Manager.findOne(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        await employee.remove();
        return res.status(204).end();
    } catch (error) {
        return InternalServerError(res, error);
    }
};

export const employeeById = async (req: Request, res: Response) => {
    try {
        const employee = await Manager.findOne(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.json(employee);
    } catch (error) {
        return InternalServerError(res, error);
    }
};



