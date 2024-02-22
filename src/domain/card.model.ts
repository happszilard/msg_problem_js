export class CardModel {
  cardNumber!: number;
  cardHolderName!: string;
  cvv!: number;
  expirationDate!: Date;
  issueDate!: Date;
  contactless!: boolean;
  active!: boolean; // A boolean indicating whether the card is currently active or has been deactivated
  dailyWithdrawalLimit!: number; // The maximum amount of money that can be withdrawn from the card in a day
  dailyTransactionLimit!: number; // The maximum amount of money that can be spent using the card in a day.

  constructor(values: CardModel) {
    if (values) {
      this.cardNumber = values.cardNumber;
      this.cardHolderName = values.cardHolderName;
      this.cvv = values.cvv;
      this.expirationDate = values.expirationDate;
      this.issueDate = values.issueDate;
      this.contactless = values.contactless;
      this.active = values.active;
      this.dailyWithdrawalLimit = values.dailyWithdrawalLimit;
      this.dailyTransactionLimit = values.dailyTransactionLimit;
    }
  }
}
