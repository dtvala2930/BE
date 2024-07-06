import { Prisma } from '@prisma/client';
export declare class User implements Prisma.UserCreateInput {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}
