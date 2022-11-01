// recebe as ifnormações do usuário do localStorage e retorna um objeto com as informações
export default function getUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem('user'));
  return userInfo;
}
