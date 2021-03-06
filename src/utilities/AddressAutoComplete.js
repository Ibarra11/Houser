import axios from "axios";
const AddressAutoComplete = async address => {
  let { REACT_APP_ADDRESS_AUTH_ID, REACT_APP_ADDRESS_API } = process.env;
  let addressSuggestions = await axios
    .get(
      `${REACT_APP_ADDRESS_API}auth-id=${REACT_APP_ADDRESS_AUTH_ID}&prefix=${address}`
    )
    .then(addressRes => {
      return addressRes.data.suggestions || [];
    })
    .catch(() => []);
  return addressSuggestions;
};

export default AddressAutoComplete;
