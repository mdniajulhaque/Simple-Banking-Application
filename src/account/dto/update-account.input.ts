import { CreateAccount } from '../entities';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends CreateAccount {

  @Field(() => String)
  accountNumber: string;
}
