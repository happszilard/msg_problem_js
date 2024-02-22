import { AccountModel } from './account.model';
import { AccountType } from './account-type.enum';
import { CardModel } from './card.model';

export class CheckingAccountModel extends AccountModel {
  associatedCard?: CardModel;

  constructor(values: Omit<CheckingAccountModel, 'accountType'>) {
    super({
      id: values.id,
      accountType: AccountType.CHECKING,
      balance: values.balance,
      transactions: values.transactions || [],
    });
    this.associatedCard = values.associatedCard;
  }
}
