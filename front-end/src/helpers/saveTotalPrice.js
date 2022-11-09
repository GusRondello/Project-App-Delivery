/* Função responsável por salvar no localStorage o totalPrice */
export default function saveTotalPrice(totalPrice) {
  localStorage.setItem('appDeliveryTotalPrice', JSON.stringify(totalPrice));
}
