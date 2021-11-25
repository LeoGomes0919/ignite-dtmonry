import styled from 'styled-components';

export const Container = styled.article`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin-top: -6rem;

  div {
    flex-basis: 30%;
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        font-weight: 400;
        font-size: 1.5rem;
      }
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }
  }
`;

interface CardTotalProps {
  isNegative: number;
}

export const CardTotal = styled.div<CardTotalProps>`
  background: ${(props) => props.isNegative >= 0 ? '#33cc95' : '#e52e4d'} !important;
  color: #fff !important;
`;
