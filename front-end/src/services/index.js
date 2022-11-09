import singIn from './commonApi';
import * as adminApi from './adminApi';
import * as costumerApi from './costumerApi';
import * as sellerApi from './sellerApi';

export default {
  singIn,
  ...adminApi,
  ...costumerApi,
  ...sellerApi,
};
