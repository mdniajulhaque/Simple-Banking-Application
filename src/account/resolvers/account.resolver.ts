import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountService} from '../services/account.service';
import { Account } from '../entities/account.entity';
import { CreateAccount} from '../entities';
import { AllAccountList, CreateAccountResponse, PaginationInput, UpdateAccountInput } from '../dto';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => CreateAccountResponse)
  async createAccount(
    @Args('createAccount') createAccount: CreateAccount,
  ): Promise<CreateAccountResponse> {
    return await this.accountService.createAccount(
      createAccount
    );
  }

  @Query(() => AllAccountList)
  async allAccountList(
    @Args('paginationInput') paginationInput: PaginationInput,
  ): Promise<AllAccountList> {

    return await this.accountService.allAccountList(paginationInput);
  }

  @Mutation(() => Account)
  async updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput
    ): Promise<Account> {

    return await this.accountService.updateAccount(updateAccountInput);
  }

  @Mutation(() => Account)
  async deleteAccount(@Args('accountNumber') accountNumber: string): Promise<Account> {

  return await this.accountService.deleteAccount(accountNumber);
  }

  @Mutation(() => Account)
  async depositAmountIntoAccount(
    @Args('accountNumber') accountNumber: string,
    @Args('depositAmount') depositAmount: number
    ): Promise<Account> {

  return await this.accountService.depositAmountIntoAccount(accountNumber,depositAmount);
}

@Mutation(() => Account)
  async withdrawAmountFromAccount(
    @Args('accountNumber') accountNumber: string,
    @Args('withdrawAmount') withdrawAmount: number
    ): Promise<Account> {

  return await this.accountService.withdrawAmountFromAccount(accountNumber,withdrawAmount);
}

@Query(() => Account)
async searchAccountByNumber(@Args('accountNumber') accountNumber: string): Promise<Account> {

  return await this.accountService.searchAccountByNumber(accountNumber);
}
}
