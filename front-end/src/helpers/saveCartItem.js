import getCart from './getCart';

export default function saveCartItem(cartItemObj) {
  if (getCart() === null) {
    localStorage.setItem('appDeliveryCart', JSON.stringify([cartItemObj]));
  } else {
    localStorage.setItem(
      'appDeliveryCart',
      JSON.stringify([
        // ...getCart(),
        cartItemObj,
      ]),
    );
  }
}
