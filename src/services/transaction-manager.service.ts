import { TransactionModel } from '../domain/transaction.model';
import { MoneyModel } from '../domain/money.model';
import { AccountsRepository } from '../repository/accounts.repository';
import dayjs from 'dayjs';
import { AccountType } from '../domain/account-type.enum';
import { convert } from '../utils/money.utils';

export class TransactionManagerService {
  public transfer(fromAccountId: string, toAccountId: string, value: MoneyModel): TransactionModel {
    const fromAccount = AccountsRepository.get(fromAccountId);
    const toAccount = AccountsRepository.get(toAccountId);

    if (fromAccountId === toAccountId) {
      throw new Error('Cannot perform a transfer between the same accounts');
    }

    if (!fromAccount || !toAccount) {
      throw new Error('Specified account does not exist');
    }

    if (
      (fromAccount.accountType === AccountType.SAVINGS && toAccount.accountType === AccountType.CHECKING) ||
      (fromAccount.accountType === AccountType.SAVINGS && toAccount.accountType === AccountType.SAVINGS)
    ) {
      throw new Error(
        `Cannot perform a transfer from a ${fromAccount.accountType} account to a ${toAccount.accountType} account`
      );
    }

    const transaction = new TransactionModel({
      id: crypto.randomUUID(),
      from: fromAccountId,
      to: toAccountId,
      amount: convert(value, toAccount.balance.currency),
      timestamp: dayjs().toDate(),
    });

    if (fromAccount.balance.amount - transaction.amount.amount < 0) {
      throw new Error('The result of a transaction must not lead to negative account balance');
    }

    fromAccount.balance.amount -= transaction.amount.amount;
    fromAccount.transactions = [...fromAccount.transactions, transaction];
    toAccount.balance.amount += transaction.amount.amount;
    toAccount.transactions = [...toAccount.transactions, transaction];

    return transaction;
  }

  public withdraw(accountId: string, amount: MoneyModel): TransactionModel {
    const account = AccountsRepository.get(accountId);

    if (!account) {
      throw new Error('Specified account does not exist');
    }

    const transaction = new TransactionModel({
      id: crypto.randomUUID(),
      from: accountId,
      to: accountId,
      amount: convert(amount, account.balance.currency),
      timestamp: dayjs().toDate(),
    });

    if (account.balance.amount - transaction.amount.amount < 0) {
      throw new Error('The result of a withdrawal must not lead to negative account balance');
    }

    account.balance.amount -= transaction.amount.amount;
    account.transactions = [...account.transactions, transaction];

    return transaction;
  }

  public checkFunds(accountId: string): MoneyModel {
    if (!AccountsRepository.exist(accountId)) {
      throw new Error('Specified account does not exist');
    }
    return AccountsRepository.get(accountId)!.balance;
  }

  public retrieveTransactions(accountId: string): TransactionModel[] {
    if (!AccountsRepository.exist(accountId)) {
      throw new Error('Specified account does not exist');
    }
    return AccountsRepository.get(accountId)!.transactions;
  }
}

export const TransactionManagerServiceInstance = new TransactionManagerService();
