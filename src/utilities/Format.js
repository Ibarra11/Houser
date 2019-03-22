/* 
      This function is responsible for formatting the phone number
      Format: (209) 111-2234
  */

module.exports = {
    formatPhoneNumber: (phnNumber, length) => {
        if (length === 3) {
            return `(${phnNumber})`;
        }
        else if (length === 4) {
            if (phnNumber[0] === "(") {
                return phnNumber.substring(1, 3);
            }
        }
        else if (length === 9) {
            return `${phnNumber.substring(0, 8) + '-' + phnNumber.substring(8)}`;
        }
        else if (length === 10) {
            return phnNumber.substring(0, 8);
        }
        else {
            return phnNumber;
        }
    }
}
