import { AccountType } from './account-type.enum';
import { TransactionModel } from './transaction.model';
import { MoneyModel } from './money.model';

export abstract class AccountModel {
  id!: string;
  accountType!: AccountType;
  balance!: MoneyModel;
  transactions!: TransactionModel[];

  constructor(values: AccountModel) {
    this.id = values.id;
    this.accountType = values.accountType;
    this.balance = values.balance;
    this.transactions = values.transactions;
  }
}
