import { CurrencyType } from './currency-type.enum';

export class MoneyModel {
  amount!: number;
  currency!: CurrencyType;

  constructor(values: MoneyModel) {
    this.amount = values.amount;
    this.currency = values.currency;
  }
}
