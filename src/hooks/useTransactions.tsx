import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  created_at: Date;
}

type TransactionInput = Omit<Transaction, 'id' | 'created_at'>;

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadingTransactions = async () => {
    try {
      const res = await api.get('/transactions');
      const transaction = res.data.transactions;
      setTransactions(transaction);
    } catch (err) {
      console.log(err);
    }

  }

  const createTransaction = async (transactionInput: TransactionInput) => {
    const res = await api.post('/transactions', {
      ...transactionInput,
      created_at: new Date()
    });
    const { transaction } = res.data;

    setTransactions([...transactions, transaction]);
  }

  useEffect(() => {
    loadingTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  const {
    transactions,
    createTransaction
  } = context;
  if (!context) throw new Error('Contexto não usado');

  return {
    transactions,
    createTransaction
  };
}