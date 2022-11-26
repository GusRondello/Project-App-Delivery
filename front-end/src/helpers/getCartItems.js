/* Função responsável por pegar do localStorage o carrinho */
export default function getCart() {
  return JSON.parse(localStorage.getItem('appDeliveryCartItems'));
}
