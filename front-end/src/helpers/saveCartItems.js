/* Função responsável por salvar no localStorage o carrinho */
export default function saveCart(cartItems) {
  localStorage.setItem('appDeliveryCartItems', JSON.stringify(cartItems));
}
