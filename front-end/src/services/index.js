import singIn from './commonApi';
import * as adminApi from './adminApi';
import * as costumerApi from './costumerApi';
import * as sellerApi from './sellerApi';

/* exporta todas as funções da API como default */
export default {
  singIn,
  ...adminApi,
  ...costumerApi,
  ...sellerApi,
};
