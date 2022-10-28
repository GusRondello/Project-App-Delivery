export default function saveToken(token) {
  localStorage.setItem('token', JSON.stringify(token));
}
