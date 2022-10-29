export default function updateCart(updatedCart) {
  localStorage.setItem('appDeliveryCart', JSON.stringify(updatedCart));
}
