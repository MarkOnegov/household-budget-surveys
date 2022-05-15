import { IsNumberString, IsOptional } from 'class-validator';
import { PaginationQuery } from '../../common/types/pagination.types';

export class PaginationQueryDTO implements PaginationQuery {
  @IsOptional()
  @IsNumberString()
  pageIndex?: number;
  @IsOptional()
  @IsNumberString()
  pageSize?: number;
}
