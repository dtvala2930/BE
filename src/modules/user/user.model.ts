import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refresh_token: string;
  createdAt: string;
  updatedAt: string;
}
