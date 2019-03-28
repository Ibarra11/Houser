/* 
      This function is responsible for formatting the phone number
      Format: (209) 111-2234
  */

module.exports = {
    formatPhoneNumber: (inputValue, deletedChar) => {
        let lastInputChar = Number(inputValue.substring(inputValue.length - 1));
        // let numberCheck = lastInputChar === "-" || lastInputChar === "(" || lastInputChar === ")" && inputValue.length > 2 ? true : Number(lastInputChar);
        console.log(deletedChar);
        if (isNaN(lastInputChar)) {
            return null;
        }
        else {
            if (inputValue.length === 3) {
                return `(${inputValue})`;
            }
            else if (inputValue.length === 4) {
                if (inputValue[0] === "(") {
                    return inputValue.substring(1, 3);
                }
            }
            else if (inputValue.length === 9) {
                return `${inputValue.substring(0, 8) + '-' + inputValue.substring(8)}`;
            }
            else if (inputValue.length === 10) {
                return inputValue.substring(0, 8);
            }
            else {
                return inputValue;
            }
        }

    }
}
