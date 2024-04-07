import { TransactionModel } from '../domain/transaction.model';
import { MoneyModel } from '../domain/money.model';
import { AccountsRepository } from '../repository/accounts.repository';
import dayjs from 'dayjs';
import { AccountType } from '../domain/account-type.enum';
import { convert } from '../utils/money.utils';
import { timeStamp } from 'console';
import { CheckingAccountModel } from '../domain/checking-account.model';

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

    if (value.amount < 0) {
      throw new Error('The amount of a transfer cannot be a negative value');
    }

    const targetCurrencyValue = convert(value, toAccount.balance.currency);

    if (fromAccount.balance.amount - targetCurrencyValue.amount < 0) {
      throw new Error('The result of a transaction must not lead to negative account balance');
    }

    const fromCheckingAccount = fromAccount as CheckingAccountModel;

    // account has an active associated card
    if (fromCheckingAccount.associatedCard !== undefined && fromCheckingAccount.associatedCard.active) {
      const dailyTransactions = fromCheckingAccount.transactions.filter(
        transaction =>
          dayjs(transaction.timestamp).isSame(dayjs(), 'date') && transaction.from === fromCheckingAccount.id
      ) as TransactionModel[];

      // sum of daily outgoing transactions
      const dailyTransactionsAmount = dailyTransactions.reduce((n, amount) => n + amount.amount.amount, 0);

      if (
        dailyTransactionsAmount + targetCurrencyValue.amount >
        fromCheckingAccount.associatedCard.dailyTransactionLimit
      ) {
        throw new Error('The maximum amount of money that can be spent using the card in a day has been exceeded');
      }
    }

    const transaction = new TransactionModel({
      id: crypto.randomUUID(),
      from: fromAccountId,
      to: toAccountId,
      amount: targetCurrencyValue,
      timestamp: dayjs().toDate(),
    });

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

    if (amount.amount < 0) {
      throw new Error('The amount of a withdrawal cannot be a negative value');
    }

    const targetCurrencyValue = convert(amount, account.balance.currency);

    if (account.balance.amount - targetCurrencyValue.amount < 0) {
      throw new Error('The result of a withdrawal must not lead to negative account balance');
    }

    if (account.accountType === AccountType.CHECKING) {
      const checkingAccount = account as CheckingAccountModel;

      if (checkingAccount.associatedCard !== undefined && checkingAccount.associatedCard.active) {
        const dailyTransactions = checkingAccount.transactions.filter(
          transaction => dayjs(transaction.timestamp).isSame(dayjs(), 'date') && transaction.from === checkingAccount.id
        ) as TransactionModel[];

        // sum of daily transactions
        const dailyTransactionsAmount = dailyTransactions.reduce((n, amount) => n + amount.amount.amount, 0);

        if (
          dailyTransactionsAmount + targetCurrencyValue.amount >
          checkingAccount.associatedCard.dailyTransactionLimit
        ) {
          throw new Error('The maximum amount of money that can be spent using the card in a day has been exceeded');
        }

        const dailyWithdrawals = dailyTransactions.filter(
          transaction => transaction.to === checkingAccount.id
        ) as TransactionModel[];

        // sum of daily withdrawals
        const dailyWithdrawalsAmount = dailyWithdrawals.reduce((n, amount) => n + amount.amount.amount, 0);

        if (dailyWithdrawalsAmount + targetCurrencyValue.amount > checkingAccount.associatedCard.dailyWithdrawalLimit) {
          throw new Error('The maximum amount of money that can be withdrawn from the card in a day has been exceeded');
        }
      }
    }

    const transaction = new TransactionModel({
      id: crypto.randomUUID(),
      from: accountId,
      to: accountId,
      amount: targetCurrencyValue,
      timestamp: dayjs().toDate(),
    });

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
