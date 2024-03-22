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