const formatAmount = (num) => {
    if (num === null || num === undefined) return "0";
    
    const isNegative = num < 0;
    num = Math.abs(num);
  
    const x = num.toString().split(".");
    const lastThree = x[0].slice(-3);
    const otherNumbers = x[0].slice(0, -3);
    
    const formattedNumber = otherNumbers
      ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
      : lastThree;
  
    const result = formattedNumber + (x.length > 1 ? "." + x[1] : "");
    return isNegative ? "-" + result : result;
  };
  
  export default formatAmount;
  