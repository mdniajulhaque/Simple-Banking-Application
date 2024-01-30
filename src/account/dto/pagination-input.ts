import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {

  @Field(()=>Int,{defaultValue:1})
  pageNumber: number;

  @Field(()=>Int,{defaultValue:1})
  perPage: number;
}

