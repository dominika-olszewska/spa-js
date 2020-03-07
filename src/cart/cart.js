
export class Cart {

  constructor() {
    this.key = 'IT_SPA_CART';
  }

  cookie() {
    // PRZED: 'key1=val1; key2=val2; . . .'
    const cookies = document.cookie.split(';');
    // PO: ['key1=val1', 'key2=val2', . . .]
    const itSpaCookie = cookies.find(cookie => cookie.startsWith(this.key));
    // PO: 'IT_SPA_CART=wartosc' LUB undefined
    return itSpaCookie;
  }

  exists() {
    return this.cookie() !== undefined;
  }

  get() {
    if (this.exists()) {
      // 'IT_SPA_CART=wartosc'
      const itSpaCookie = this.cookie(); // 'IT_SPA_CART=[1,2,2]'
      const cookieValue = itSpaCookie.split('=')[1]; // ['IT_SPA_CART', '[1,2,2]']
      const parsedValue = JSON.parse(cookieValue); // wartosc

      return parsedValue;
    } else {
      this.set([]);
    }
  }

  set(value) {
    const stringifiedValue = JSON.stringify(value);
    document.cookie = `${this.key}=${stringifiedValue}`;
  }

  empty() {
    this.set([]);
  }
}
