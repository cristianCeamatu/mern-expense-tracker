import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);
  const result = amounts.reduce((total, next) => (total += next), 0).toFixed(2);
  return (
    <>
      <h4>Your Balance</h4>
      <h1 id="balance">${result}</h1>
    </>
  );
};

export default Balance;
