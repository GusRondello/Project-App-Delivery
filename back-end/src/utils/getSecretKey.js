const fs = require('fs');
const path = require('path');

module.exports = () => {
  try {
    const secretKeyPath = path.resolve('jwt.evaluation.key');
    const data = fs.readFileSync(secretKeyPath, 'utf-8');

    return data;
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
};
