import { SavingsAccountModel } from '../domain/savings-account.model';
import { MoneyModel } from '../domain/money.model';
import { CurrencyType } from '../domain/currency-type.enum';
import dayjs from 'dayjs';
import { CapitalizationFrequency } from '../domain/capitalization-frequency.enum';
import { InterestRate } from '../domain/interest-rate.enum';
import { CheckingAccountModel } from '../domain/checking-account.model';
import { card1, card2, card3, card4 } from './cards.seed';

export const savingsAccountA = new SavingsAccountModel({
  id: 'ROBMSG100001',
  transactions: [],
  balance: new MoneyModel({ amount: 1000, currency: CurrencyType.RON }),
  interestFrequency: CapitalizationFrequency.MONTHLY,
  lastInterestAppliedDate: dayjs().toDate(),
  interest: InterestRate.THREE_MONTH_ACCOUNT,
});
export const savingsAccountB = new SavingsAccountModel({
  id: 'ROBMSG100002',
  transactions: [],
  balance: new MoneyModel({ amount: 2000, currency: CurrencyType.EUR }),
  interestFrequency: CapitalizationFrequency.QUARTERLY,
  lastInterestAppliedDate: dayjs().toDate(),
  interest: InterestRate.SIX_MONTH_ACCOUNT,
});

export const checkingAccountA = new CheckingAccountModel({
  id: 'ROBMSG200001',
  transactions: [],
  balance: new MoneyModel({ amount: 100, currency: CurrencyType.RON }),
  associatedCard: card1,
});
export const checkingAccountB = new CheckingAccountModel({
  id: 'ROBMSG200002',
  transactions: [],
  balance: new MoneyModel({ amount: 300, currency: CurrencyType.RON }),
  associatedCard: card2,
});
export const checkingAccountC = new CheckingAccountModel({
  id: 'ROBMSG200003',
  transactions: [],
  balance: new MoneyModel({ amount: 10, currency: CurrencyType.EUR }),
  associatedCard: card3,
});
export const checkingAccountD = new CheckingAccountModel({
  id: 'ROBMSG200004',
  transactions: [],
  balance: new MoneyModel({ amount: 1000, currency: CurrencyType.EUR }),
  associatedCard: card4,
});
