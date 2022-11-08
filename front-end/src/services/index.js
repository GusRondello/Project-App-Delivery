import singIn from './commonApi';
import registerAsAdmin from './adminApi';
import * as costumerApi from './costumerApi';
import * as sellerApi from './sellerApi';

export default {
  singIn,
  registerAsAdmin,
  ...costumerApi,
  ...sellerApi,
};
