import { Transform } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class UserListQueryDTO {
  @IsOptional()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => Number(value || PAGINATION.LIMIT))
  limit: number = PAGINATION.LIMIT;

  @IsOptional()
  @Transform(({ value }) => Number(value || PAGINATION.PAGE_DEFAULT))
  page: number = PAGINATION.PAGE_DEFAULT;
}
