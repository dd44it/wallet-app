export type TransactionType = 'Payment' | 'Credit';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  name: string;
  description: string;
  date: string;
  pending?: boolean;
  authorizedUser?: string;
  icon?: string;
  status?: 'Approved' | 'Declined';
  bank?: string;
  cardNumber?: string;
}

export interface CardData {
  limit: number;
  balance: number;
  available: number;
}

