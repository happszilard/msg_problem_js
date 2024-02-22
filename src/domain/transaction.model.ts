import { MoneyModel } from './money.model';

export class TransactionModel {
  id!: string;
  from!: string;
  to!: string; // another account if transfer or the same account (as from) if money is withdrawn
  amount!: MoneyModel;
  timestamp!: Date;

  constructor(values: TransactionModel) {
    if (values) {
      this.id = values.id;
      this.from = values.from;
      this.to = values.to;
      this.amount = values.amount;
      this.timestamp = values.timestamp;
    }
  }
}
