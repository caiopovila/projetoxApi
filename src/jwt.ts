import * as jwt from 'jsonwebtoken'; 
import { Request, Response } from "express";
import * as redis from 'redis';
import { promisify } from 'util';
import { createHash } from 'crypto';
import { config } from 'dotenv';


config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const clientRedis = redis.createClient({ prefix: 'blacklist' });

const existsAsync = promisify(clientRedis.exists).bind(clientRedis);
const setAsync = promisify(clientRedis.set).bind(clientRedis);

function generateTokenHash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
};

export const addTokenBlackList = async (token: string): Promise<void> => {
    const expire = jwt.decode(token).exp;
    const tokenHash = generateTokenHash(token);
    await setAsync(tokenHash, '');
    clientRedis.expireat(tokenHash, expire);
    return;
};

export const verifyTokenBlackList = async (token: string): Promise<boolean> => {
    const tokenHash = generateTokenHash(token);
    return await existsAsync(tokenHash) === 1;
};

export const verify = async (req: Request, res: Response, next: any) => {
    if (req.get('Authorization')) {
        const token = req.get('Authorization').split(' ')[1];
        if (await verifyTokenBlackList(token) == true)
            res.sendStatus(401);
        else
            jwt.verify(token, PRIVATE_KEY, function(err, decoded) {
                if (err) res.status(401).json(err);
                else if (decoded.id) {
                    req.user = decoded.id;
                    req.token = token;
                    next();
                } else
                    res.sendStatus(500);
            });    
    } else {
        res.sendStatus(401);
    }
};
