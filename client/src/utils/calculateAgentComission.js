function calculateAgentCommission(amount) {
  if (amount < 0) {
    return "Amount cannot be negative";
  }

  if (amount <= 499) return 5;
  if (amount <= 999) return Math.round(amount * 0.01);
  if (amount <= 4999) return Math.round(amount * 0.015);
  if (amount <= 9999) return Math.round(amount * 0.02);
  return Math.round(amount * 0.025);
}


export default calculateAgentCommission;