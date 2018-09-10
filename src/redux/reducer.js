let initialState = {
    propertyStreet: '',
    propertyCity: '',
    propertyState: '',
    propertyZipcode: '',
    propertyLoanAmount: '',
    propertyMortgage: '',
    propertyRent: '',
    propertyTenantName: '',
    propertyTenantContactNumber: '',
    propertyTenantEmail: '',
    propertImg: ''
}

const SET_PROPERTY_ADDRESS = 'PROPERTY_ADDRESS';
const SET_FINANCIAL_INFORMATION = 'SET_FINANCIAL_INFORMATION';


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PROPERTY_ADDRESS:
            let { propertyStreet, propertyCity, propertyState, propertyZipcode } = action.payload;
            return Object.assign({}, state, { propertyStreet, propertyCity, propertyState, propertyZipcode });
        case SET_FINANCIAL_INFORMATION:
            let {propertyLoanAmount, propertyMortgage, propertyRent } = action.payload;
            console.log(action.payload);
            return Object.assign({}, state, {propertyLoanAmount, propertyMortgage, propertyRent});
        default:
            return state;
    }
}

export function setPropertyAddress(propertyStreet, propertyCity, propertyState, propertyZipcode) {
    return {
        type: SET_PROPERTY_ADDRESS,
        payload: {
            propertyStreet, propertyCity, propertyState, propertyZipcode
        }
    }
}

export function setFinancialInformation(propertyLoanAmount, propertyMortgage, propertyRent) {
    return {
        type: SET_FINANCIAL_INFORMATION,
        payload: {
            propertyLoanAmount, propertyMortgage, propertyRent
        }
    }
}


