import { Container } from './styles';
import { dateFormat, numberFormat } from '../../utils/formatters';
import { useTransactions } from '../../hooks/useTransactions';

export function TransactionsTable() {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type === 'deposit' ? 'deposit' : 'withdraw'}>
                {numberFormat(transaction.amount)}
              </td>
              <td>
                {transaction.category}
              </td>
              <td>
                {dateFormat(transaction.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}