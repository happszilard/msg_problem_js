import { CardModel } from '../domain/card.model';

export const card1 = new CardModel({
  cardNumber: 1234567890123456,
  cardHolderName: 'John Doe',
  cvv: 123,
  expirationDate: new Date('2026-12-31'),
  issueDate: new Date('2021-01-01'),
  contactless: true,
  active: true,
  dailyWithdrawalLimit: 5000,
  dailyTransactionLimit: 10000,
});

export const card2 = new CardModel({
  cardNumber: 2345678901234567,
  cardHolderName: 'Jane Smith',
  cvv: 456,
  expirationDate: new Date('2027-11-30'),
  issueDate: new Date('2022-02-15'),
  contactless: false,
  active: true,
  dailyWithdrawalLimit: 3000,
  dailyTransactionLimit: 7000,
});

export const card3 = new CardModel({
  cardNumber: 3456789012345678,
  cardHolderName: 'Alex Johnson',
  cvv: 789,
  expirationDate: new Date('2028-10-30'),
  issueDate: new Date('2023-03-20'),
  contactless: true,
  active: false,
  dailyWithdrawalLimit: 2000,
  dailyTransactionLimit: 5000,
});

export const card4 = new CardModel({
  cardNumber: 4567890123456789,
  cardHolderName: 'Chris Lee',
  cvv: 101,
  expirationDate: new Date('2025-09-25'),
  issueDate: new Date('2020-04-25'),
  contactless: true,
  active: true,
  dailyWithdrawalLimit: 4000,
  dailyTransactionLimit: 8000,
});
