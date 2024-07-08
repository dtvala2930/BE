import { Logger } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import express from 'express';
declare const JwtStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class JwtStrategy extends JwtStrategy_base {
    private user;
    logger: Logger;
    constructor();
    authenticate(req: express.Request): Promise<void>;
}
export {};
