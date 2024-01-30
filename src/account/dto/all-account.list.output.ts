import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Account } from '../entities';

@ObjectType()
export class AllAccountList {

  @Field(()=> [Account],{nullable:true})
  accountList?: Account[];

  @Field(()=>Int,{defaultValue:0})
  totalAccount: number;
}

