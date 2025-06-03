import axios from "axios";
import { BACKEND_URL } from "./constants";

function calculateAgentCommission(amount,settings) {
  if (amount < 0) {
    return "Amount cannot be negative";
  }else if (amount === 0) {
    return 0;
  }

      if (amount <= 499) return 5;
      if (amount <= 999) return Math.round(amount * (settings.transactionFee500to999/100 ?? 0.01));
      if (amount <= 4999) return Math.round(amount * (settings.transactionFee1000to4999/100 ?? 0.015));
      if (amount <= 9999) return Math.round(amount * (settings.transactionFee5000to9999/100 ?? 0.02));
      return Math.round(amount * (settings.transactionFee10000/100 ?? 0.025));

}


export default calculateAgentCommission;