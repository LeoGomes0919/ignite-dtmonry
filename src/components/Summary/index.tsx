import { Container, CardTotal } from './styles';
import { numberFormat } from '../../utils/formatters';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
  const { transactions } = useTransactions();

  const balance = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposit += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraw += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposit: 0,
    withdraw: 0,
    total: 0,
  })

  return (
    <Container>
      <div>
        <header>
          <h2>Entradas</h2>
          <img src={incomeImg} alt='Entradas' />
        </header>
        <strong>{numberFormat(balance.deposit)}</strong>
      </div>

      <div>
        <header>
          <h2>Saídas</h2>
          <img src={outcomeImg} alt='Saídas' />
        </header>
        <strong>-{numberFormat(balance.withdraw)}</strong>
      </div>

      <CardTotal
        isNegative={balance.total}
      >
        <header>
          <h2>Total</h2>
          <img src={totalImg} alt='Total' />
        </header>
        <strong>{numberFormat(balance.total)}</strong>
      </CardTotal>
    </Container>
  );
}