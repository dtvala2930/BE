import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';

import { UserService } from './user.service';
import { UserListQueryDTO } from './dto/user-list-query.dto';
import { ResponseSuccessInterface } from 'src/utils/interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query() queryDTO: UserListQueryDTO, @Res() res: Response) {
    const { data, metaData } = await this.userService.getUsers(queryDTO);

    const resData: ResponseSuccessInterface = {
      statusCode: HttpStatus.OK,
      success: 'get-user-list-success',
      data,
      metaData,
    };

    return res.status(HttpStatus.OK).json(resData);
  }
}
