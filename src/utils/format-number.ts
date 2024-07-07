import safenumber from "./safenumber";

const formatNumber = (amount: number | string) => {
  const USDollar = new Intl.NumberFormat("en-US", {});

  return USDollar.format(safenumber(amount));
};

export default formatNumber;
