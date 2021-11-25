import { useState } from 'react';

import { Dashboard } from './components/Dashboard';
import { createServer, Model } from 'miragejs';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          amount: 3000,
          category: 'Densevolvimento de sites',
          created_at: new Date('2021-11-20 19:09:12'),
          type: 'deposit'
        },
        {
          id: 2,
          title: 'Aluguel',
          amount: 800,
          category: 'Aluguél mensal',
          created_at: new Date('2021-11-06 14:09:12'),
          type: 'withdraw'
        },
        {
          id: 3,
          title: 'Trabalho CastGroup',
          amount: 3000,
          category: 'Densevolvimento de SEFAZ-GO',
          created_at: new Date('2021-11-05 16:09:12'),
          type: 'deposit'
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  const handleToggleNewTransactionModal = () => setIsNewTransactionModalOpen(!isNewTransactionModalOpen);

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleToggleNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleToggleNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
