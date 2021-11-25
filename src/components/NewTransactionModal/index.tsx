import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement('#root');

export function NewTransactionModal({
  isOpen,
  onRequestClose
}: NewTransactionModalProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  const { createTransaction } = useTransactions();


  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type
    });
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        type='button'
        className='react-modal-close'
        onClick={onRequestClose}
      >
        <img src={closeImg} alt='Fechar Modal' />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <header>
          <h2>Cadastrar transação</h2>
        </header>

        <input
          type='text'
          name='title'
          placeholder='Título'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type='number'
          name='amount'
          placeholder='Valor'
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type='button'
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor='green'
          >
            <img src={incomeImg} alt='Entrada' />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type='button'
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor='red'
          >
            <img src={outcomeImg} alt='Saída' />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type='text'
          name='category'
          placeholder='Categoria'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type='submit'>Cadastrar</button>
      </Container>
    </Modal>
  );
}