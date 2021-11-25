export const numberFormat = (value: number | bigint) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
export const dateFormat = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}