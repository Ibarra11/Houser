/* 
      This function is responsible for formatting the phone number
      Format: (209) 111-2234
  */

module.exports = {
  formatPhoneNumber: (inputValue, deletedChar) => {
    let lastInputChar = inputValue.substring(inputValue.length - 1);
    let lastInputCharIntoNum = Number(lastInputChar);

    if (
      (isNaN(lastInputCharIntoNum) || lastInputChar === "") &&
      inputValue.length < 1
    ) {
      return "";
    } else if (/[0-9)-]/.test(lastInputChar)) {
      if (inputValue.length === 3) {
        return `(${inputValue})`;
      } else if (inputValue.length === 4) {
        if (inputValue[0] === "(") {
          return inputValue.substring(1, 3);
        }
      } else if (inputValue.length === 5) {
        return inputValue.substring(0, 5);
      } else if (inputValue.length === 9) {
        return lastInputCharIntoNum || lastInputCharIntoNum === 0
          ? `${inputValue.substring(0, 8) + "-" + inputValue.substring(8)}`
          : `${inputValue.substring(0, inputValue.length - 1)}`;
      } else if (inputValue.length === 10) {
        return inputValue.substring(0, 8);
      } else {
        if (lastInputChar !== "-" && lastInputChar !== ")") return inputValue;
      }
    }
  }
};
