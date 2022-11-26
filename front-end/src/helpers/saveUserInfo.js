/* Função responsável por salvar no localStorage o usuário */
export default function saveUserInfo(userInfo) {
  localStorage.setItem('user', JSON.stringify(userInfo));
}
