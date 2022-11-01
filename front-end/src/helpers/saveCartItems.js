export default function saveCart(cartItems) {
  localStorage.setItem('appDeliveryCartItems', JSON.stringify(cartItems));
}
