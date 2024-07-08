import { Logger } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import express from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly jwtService;
    private readonly userService;
    private user;
    logger: Logger;
    constructor(jwtService: JwtService, userService: UserService);
    authenticate(req: express.Request): Promise<void>;
}
export {};
