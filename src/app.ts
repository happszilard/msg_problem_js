import { checkingAccountA, checkingAccountB, savingsAccountA, savingsAccountB } from './seed/accounts.seed';
import { TransactionManagerServiceInstance } from './services/transaction-manager.service';
import { SavingsManagerServiceInstance } from './services/savings-manager.service';
import { seedInitializer } from './seed/seed-initializer';
import { MoneyModel } from './domain/money.model';
import { CurrencyType } from './domain/currency-type.enum';

console.log('[SYSTEM]', 'Initialize Application \n');
seedInitializer();
console.log('[SYSTEM]', 'Running Application \n\n');

// TRANSACTION MANAGER FUNCTIONALITY

console.log('[Transaction Manager] 1.', TransactionManagerServiceInstance.checkFunds(checkingAccountA.id));
console.log('[Transaction Manager] 2.', TransactionManagerServiceInstance.checkFunds(checkingAccountB.id));

const transaction1 = TransactionManagerServiceInstance.transfer(
  checkingAccountA.id,
  checkingAccountB.id,
  new MoneyModel({ amount: 50, currency: CurrencyType.RON })
);

console.log('[Transaction Manager] 3.', transaction1);
console.log('[Transaction Manager] 4.', TransactionManagerServiceInstance.checkFunds(checkingAccountA.id));
console.log('[Transaction Manager] 5.', TransactionManagerServiceInstance.checkFunds(checkingAccountB.id));

// console.log(
//   '[Transaction Manager] 6.',
//   TransactionManagerServiceInstance.withdraw(
//     checkingAccountC.id,
//     new MoneyModel({ amount: 5, currency: CurrencyType.EUR })
//   )
// );

console.log('\n------------------------------------\n');

// SAVINGS MANAGER FUNCTIONALITY

console.log('[Saving Manager] 1.', TransactionManagerServiceInstance.checkFunds(savingsAccountA.id));

SavingsManagerServiceInstance.passTime();
console.log('[Saving Manager] 2.', TransactionManagerServiceInstance.checkFunds(savingsAccountA.id));
SavingsManagerServiceInstance.passTime();
console.log('[Saving Manager] 3.', TransactionManagerServiceInstance.checkFunds(savingsAccountA.id));
console.log('[Saving Manager] 4.', TransactionManagerServiceInstance.checkFunds(savingsAccountB.id));
console.log('[Saving Manager] 5.', TransactionManagerServiceInstance.checkFunds(checkingAccountA.id));

console.log('\n[SYSTEM]', 'Application closed\n');
