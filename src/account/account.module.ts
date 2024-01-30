import { Module } from '@nestjs/common';
import { Account, AccountSchema } from './entities/account.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountResolver} from './resolvers';
import { AccountService} from './services';
@Module({
  imports: [
  MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
