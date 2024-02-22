import { InMemoryDbClient } from './clients/in-memory-db.client';
import { AccountModel } from '../domain/account.model';

export const AccountsRepository = new InMemoryDbClient<AccountModel>();
