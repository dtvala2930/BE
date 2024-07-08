import { QueryDataAndMeta } from '../../utils/interfaces/query-data-and-meta';
import { UserListQueryDTO } from './dto/user-list-query.dto';
import { PrismaService } from '../../prisma.service';
import { User } from '@prisma/client';
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAll(queryParams: UserListQueryDTO): Promise<QueryDataAndMeta<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        refresh_token: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>>;
    getUserByField({ id, email, refresh_token, }: {
        id?: number;
        email?: string;
        refresh_token?: string;
    }): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        refresh_token: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(id: number, updateData: Partial<User>): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        refresh_token: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
