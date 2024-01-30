import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from '../entities';

@ObjectType()
export class CreateAccountResponse {

  @Field(()=> Account,{nullable:true})
  newAccount?: Account;

  @Field(()=>Boolean,{defaultValue:false})
  success: boolean;

  @Field(()=> String,{defaultValue:"The Account Creation Failed"})
  message: string;
}

