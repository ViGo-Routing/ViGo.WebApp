export const vndFormat = (balance: string | number) => {
  if (balance == null || balance == undefined || (balance != 0 && !balance)) {
    return '';
  }
  return balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'đ';
};
