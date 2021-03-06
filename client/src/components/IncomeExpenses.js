import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((total, next) => (total += next), 0);

  const expense =
    amounts
      .filter((amount) => amount < 0)
      .reduce((total, next) => (total += next), 0) * -1;

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${numberWithCommas(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">${numberWithCommas(expense)}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
