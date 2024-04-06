import { AccountsRepository } from '../repository/accounts.repository';
import { AccountType } from '../domain/account-type.enum';
import { SavingsAccountModel } from '../domain/savings-account.model';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { CapitalizationFrequency } from '../domain/capitalization-frequency.enum';

dayjs.extend(quarterOfYear);

export class SavingsManagerService {
  private systemDate = dayjs().toDate();
  public passTime(): void {
    const savingAccounts = AccountsRepository.getAll().filter(
      account => account.accountType === AccountType.SAVINGS
    ) as SavingsAccountModel[];

    const nextSystemDate = dayjs(this.systemDate).add(1, 'months');

    savingAccounts.forEach(savingAccount => {
      if (savingAccount.interestFrequency === CapitalizationFrequency.MONTHLY) {
        this.addMonthlyInterest(savingAccount, nextSystemDate);
      }

      if (
        savingAccount.interestFrequency === CapitalizationFrequency.QUARTERLY &&
        !nextSystemDate.isSame(this.systemDate, 'quarter')
      ) {
        this.addQuarterlyInterest(savingAccount, nextSystemDate);
      }
    });

    this.systemDate = nextSystemDate.toDate();
  }

  private addMonthlyInterest(savingAccount: SavingsAccountModel, currentInterestMonth: dayjs.Dayjs): void {
    const nextInterestDateForAccount = dayjs(savingAccount.lastInterestAppliedDate).add(1, 'months');

    const sameMonth = currentInterestMonth.isSame(nextInterestDateForAccount, 'month');
    const sameYear = currentInterestMonth.isSame(nextInterestDateForAccount, 'year');

    if (sameMonth && sameYear) {
      this.addInterest(savingAccount);
      savingAccount.lastInterestAppliedDate = currentInterestMonth.toDate();
    }
  }

  private addQuarterlyInterest(savingAccount: SavingsAccountModel, currentInterestMonth: dayjs.Dayjs): void {
    const nextInterestDateForAccount = dayjs(savingAccount.lastInterestAppliedDate).add(3, 'months');

    const sameYear = currentInterestMonth.isSame(nextInterestDateForAccount, 'year');
    const sameQuarter = currentInterestMonth.isSame(nextInterestDateForAccount, 'quarter');

    if (sameQuarter && sameYear) {
      this.addInterest(savingAccount);
      savingAccount.lastInterestAppliedDate = currentInterestMonth.toDate();
    }
  }

  private addInterest(savingAccount: SavingsAccountModel): void {
    savingAccount.balance.amount += savingAccount.balance.amount * savingAccount.interest; // update balance with interest
  }
}

export const SavingsManagerServiceInstance = new SavingsManagerService();
