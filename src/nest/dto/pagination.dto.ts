import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PageQuery } from '../../common/types/pagination.types';

export class PageQueryDTO implements PageQuery {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number | undefined;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  length?: number | undefined;
  @IsOptional()
  nextId?: string | undefined;
}
