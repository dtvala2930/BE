import { QueryDataAndMeta } from '../../utils/interfaces/query-data-and-meta';
import { UserListQueryDTO } from './dto/user-list-query.dto';
import { PrismaService } from '../../prisma.service';
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAll(queryParams: UserListQueryDTO): Promise<QueryDataAndMeta<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>>;
}
