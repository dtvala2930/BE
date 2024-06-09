import { Injectable } from '@nestjs/common';
import { USERS } from './users.mock';
import { UserListQueryDTO } from './dto/user-list-query.dto';
import { QueryDataAndMeta } from 'src/utils/interfaces/query-data-and-meta';

@Injectable()
export class UserService {
  private users = USERS;

  public getUsers(queryParams: UserListQueryDTO) {
    const { limit, page } = queryParams;

    return new QueryDataAndMeta({
      data: data,
      total: total,
      queryParams,
    });
  }
}
