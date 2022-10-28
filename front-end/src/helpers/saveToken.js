export default function saveToken(token) {
  localStorage.setItem('tokenDelivery', JSON.stringify(token));
}
