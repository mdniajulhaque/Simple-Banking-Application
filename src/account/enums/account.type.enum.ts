import { registerEnumType } from "@nestjs/graphql";


export enum AccountTypeEnum {
    CURRENT_ACCOUNT = "Current Account",
    SAVING_ACCOUNT = "Saving Account",
    SALARY_ACCOUNT = "Salary Account"
  }

  registerEnumType(AccountTypeEnum, {
    name: 'AccountTypeEnum',
  });
  
  