import { IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { PAGINATION } from '../../../utils/constant';

export class SearchDetailQueryDTO {
  @Transform(({ value }) => Number(value || PAGINATION.LIMIT))
  @IsOptional()
  @Min(1)
  @Max(100)
  limit: number = PAGINATION.LIMIT;

  @Transform(({ value }) => Number(value || PAGINATION.PAGE_DEFAULT))
  @IsOptional()
  @Min(1)
  page: number = PAGINATION.PAGE_DEFAULT;
}
