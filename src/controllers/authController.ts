import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import { Employee } from "../entity/Employee";

//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        console.log(userName, password);

        if (!userName || !password) return res.status(400).json({ message: 'Both username and password are required' });

        const foundMatch = await Employee.findOne({ userName });
        //const foundMatch = username == "Alex";
        //const passwordCheck = await bcrypt.compare(password, foundMatch.password);
        const username = foundMatch?.userName == userName;
        const passwordCheck = foundMatch?.password == password;

        if (!foundMatch || !username) return res.status(401).json({ message: 'Username not found' });
        if (!passwordCheck) return res.status(401).json({ message: "Username and password doesn't match" });

        const { empId, designation, empTypeId } = foundMatch;

        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": username,
                    //"accessRoles": foundMatch.role,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { "username": foundMatch.userName },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({ accessToken, designation, empId, empTypeId })

    } catch (error) {
        return InternalServerError(res, error);
    }
};


export const refresh = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

        const refreshToken = cookies.jwt;
        console.log("REFRESH", refreshToken);
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string,
            async (error: Error | null, decoded: { username: string }) => {
                if (error) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }

                try {
                    const foundUser = { username: decoded.username }; //await User.findOne({ username: decoded.username }).exec();

                    if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

                    const accessToken = jwt.sign(
                        {
                            UserInfo: {
                                username: foundUser.username,
                                // roles: foundUser.roles
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '15m' }
                    );

                    res.json({ accessToken });
                } catch (error) {
                    return InternalServerError(res, error);
                }
            }
        );
    } catch (error) {
        return InternalServerError(res, error);
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(204)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
        res.json({ message: 'Cookie cleared' })
    } catch (error) {
        return InternalServerError(res, error);
    }
}
