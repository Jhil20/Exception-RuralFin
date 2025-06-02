const findChange = ( newValue,oldValue) => {
  const oldNum = parseFloat(oldValue);
  const newNum = parseFloat(newValue);

  if (!isFinite(oldNum) || !isFinite(newNum) || oldNum === 0) {
    return "0.000";
  }


  const change = ((newNum - oldNum) / oldNum) * 100;
//   console.log(`Change from ${oldValue} to ${newValue}: ${Math.abs(change)}%`);
  return change.toFixed(1); // Returns a string, e.g., "12.345"
};

export default findChange;
