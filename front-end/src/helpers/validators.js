/* Funções resposáveis por validar os dados na tela de administrador */
export function validateMinLength(length) {
  return (value) => value.length >= length;
}

export function validateEmail(email) {
  const re = new RegExp(
    '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|'
      + '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])'
      + '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
  );

  return re.test(email);
}
