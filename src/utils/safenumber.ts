const safenumber = (value: any, fallback = 0) => {
  return Number(value) || fallback;
};
export default safenumber;
