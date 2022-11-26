/* Função responsável por pegar do localStorage o totalPrice */
export default function getTotalPrice() {
  return JSON.parse(localStorage.getItem('appDeliveryTotalPrice'));
}
