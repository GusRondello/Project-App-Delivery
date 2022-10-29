import getCart from './getCart';

const MENOS_UM = -1;

export default function updateCartItem(cartItemObj) {
  // procura o produto no carrinho o produto correspondente ao que está sendo atualizado
  // e o atualiza, mantém os demais produtos como estão. Se o produto não estiver no carrinho
  // ele é adicionado. Se o produto estiver no carrinho e a quantidade for 0, ele é removido.
  // Salva o resultado no localStorage.
  const cart = getCart();
  const cartItemIndex = cart.findIndex((item) => item.id === cartItemObj.id);
  if (cartItemIndex === MENOS_UM) {
    localStorage.setItem('appDeliveryCart', JSON.stringify([...cart, cartItemObj]));
  }
  if (cartItemObj.quantity === 0) {
    cart.splice(cartItemIndex, 1);
    localStorage.setItem('appDeliveryCart', JSON.stringify(cart));
  }
  cart[cartItemIndex] = cartItemObj;
  localStorage.setItem('appDeliveryCart', JSON.stringify(cart));
}
