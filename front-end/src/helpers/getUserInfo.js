/* Função responsável por pegar do localStorage o usuário */
export default function getUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem('user'));
  return userInfo;
}
