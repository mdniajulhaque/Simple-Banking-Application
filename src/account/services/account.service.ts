import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from '../entities/account.entity';
import { CreateAccount } from '../entities';
import {
  AllAccountList,
  CreateAccountResponse,
  PaginationInput,
  UpdateAccountInput,
} from '../dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async createAccount(
    createAccount: CreateAccount,
  ): Promise<CreateAccountResponse> {
    try {
      const newAccount = await this.accountModel.create(createAccount);

      return { newAccount , success: true, message: 'The Account Successfully Created' };
    } catch (error) {
      throw new InternalServerErrorException('Account Cannot Created ' + error);
    }
  }

  async allAccountList(
    paginationInput: PaginationInput,
  ): Promise<AllAccountList> {
    try {
      const { perPage, pageNumber } = paginationInput;

      const skip = (pageNumber - 1) * perPage;

      const accountList = await this.accountModel.aggregate([
        {
          $skip: skip,
        },
        {
          $limit: perPage,
        },
      ]);
      const totalAccount = await this.accountModel.countDocuments();
      const response = { accountList, totalAccount };

      return response;
    } catch (error) {
      throw new NotFoundException('Account List Not Found' + error);
    }
  }

  async updateAccount(
    updateAccountInput: UpdateAccountInput,
  ): Promise<Account> {
    try {
      const { accountNumber, ...updateField } = updateAccountInput;
      return await this.accountModel.findOneAndUpdate(
        { number: accountNumber },
        updateField,
        { new: true },
      );
    } catch (error) {
      throw new InternalServerErrorException('Account Cannot Updated ' + error);
    }
  }

  async deleteAccount(accountNumber: string): Promise<Account> {
    try {
      return await this.accountModel.findOneAndDelete({
        number: accountNumber,
      });
    } catch (error) {
      throw new InternalServerErrorException('Account Cannot Delete ' + error);
    }
  }

  async depositAmountIntoAccount(
    accountNumber: string,
    depositAmount: number,
  ): Promise<Account> {
    try {
      return await this.accountModel.findOneAndUpdate(
        { number: accountNumber },
        { $inc: { balance: depositAmount } },
        { new: true },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Amount Cannot Deposit Into Account ' + error,
      );
    }
  }

  async withdrawAmountFromAccount(
    accountNumber: string,
    withdrawAmount: number,
  ): Promise<Account> {
    try {
      const updatedAccount = await this.accountModel.findOneAndUpdate(
        { number: accountNumber, balance:{$gte:withdrawAmount + 500} }, ///here, I have considered keep minimum balance is 500 when will be withdraw
        { $inc: { balance: -withdrawAmount } },
        { new: true },
      );
     if(!updatedAccount)
     {
      throw new Error("Balance is insufficient because you have to keep 500 balance to your account");
      
     }

      return updatedAccount
    } catch (error) {
      throw new InternalServerErrorException(
        'Amount Cannot Withdraw From Account ' + error,
      );
    }
  }

  async searchAccountByNumber(accountNumber: string): Promise<Account> {
    try {
      return await this.accountModel.findOne({ number: accountNumber });
    } catch (error) {
      throw new NotFoundException('Account Not Found' + error);
    }
  }
}
