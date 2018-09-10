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
const SET_TENANT_INFORMATION = 'SET_TENTANT_INFORMATION';


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PROPERTY_ADDRESS:
            let { propertyStreet, propertyCity, propertyState, propertyZipcode } = action.payload;
            return Object.assign({}, state, { propertyStreet, propertyCity, propertyState, propertyZipcode });
        case SET_FINANCIAL_INFORMATION:
            let {propertyLoanAmount, propertyMortgage, propertyRent } = action.payload;
            return Object.assign({}, state, {propertyLoanAmount, propertyMortgage, propertyRent});
        case SET_TENANT_INFORMATION:
            let {propertyTenantName, propertyTenantContactNumber, propertyTenantEmail} = action.payload;
            return Object.assign({}, state, {propertyTenantName, propertyTenantContactNumber, propertyTenantEmail});
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

export function setTenantInformation(propertyTenantName, propertyTenantContactNumber, propertyTenantEmail){
    return {
        type: SET_TENANT_INFORMATION,
        payload: {
            propertyTenantName, propertyTenantContactNumber, propertyTenantEmail
        }
    }
}

