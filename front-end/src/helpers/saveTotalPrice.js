export default function saveTotalPrice(updatedCart) {
  localStorage.setItem('appDeliveryTotalPrice', JSON.stringify(updatedCart));
}
