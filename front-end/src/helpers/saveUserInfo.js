// A estrutura de dados do usuário é salva no localStorage no seguinte modelo
// {
//   name: "Nome Da Pessoa Usuária",
//   email: "email@dominio.com",
//   role: "customer",
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTm9tZSBEYSBQZXNzb2EgVXN1w6FyaWEiLCJlbWFpbCI6ImVtYWlsQGRvbWluaW8uY29tIiwicm9sZSI6ImN1c3RvbWVyIn0.s5cmiyY16yViCXkHuzWekxkMeYBi75eT8uJnSbfadNE"
// }

export default function saveUserInfo(userInfo) {
  localStorage.setItem('user', JSON.stringify(userInfo));
}
