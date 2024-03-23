import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";

const fs = require('fs');
const filePath = "D:\CRM-BE\Taxonalytica_BE_Access\constants\activityData.json";

export const getTempData = async (_: Request, res: Response) => {
    try {
        const readData = JSON.parse(fs.readFileSync(filePath));

        return res.json(readData);

    } catch (error) {
        return InternalServerError(res, error);
    }
}

export const deleteTempData = async (req: Request, res: Response) => {
    try {
        if (req.body) {
            const index = req.body.index;
            const readData = JSON.parse(fs.readFileSync(filePath));
            if (index >= 0 && index < readData.length) {
                readData.splice(index, 1);
                fs.writeFileSync(filePath, JSON.stringify(readData));
            }
        } else {
            fs.writeFileSync(filePath, JSON.stringify([]));
        }

        return res.json({});
    } catch (error) {
        return InternalServerError(res, error);
    }
}