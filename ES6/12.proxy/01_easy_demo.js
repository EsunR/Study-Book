var proxy = new Proxy(
  {},
  {
    get(target, property) {
      console.log(target);
      console.log(property);
      return "data";
    }
  }
);

console.log(proxy.name);
