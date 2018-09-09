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


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PROPERTY_ADDRESS:
            let {propertyStreet,  propertyCity, propertyState, propertyZipcode } = action.payload;
            return Object.assign({}, state, { propertyStreet, propertyCity, propertyState, propertyZipcode })
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


