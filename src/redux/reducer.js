let initialState = {
    propertyStreet: '',
    propertyCity: '',
    propertyState: '',
    propertyZipcode: '',
    propertyRent: '',
    propertyTenantName: '',
    propertyTenantContactNumber: '',
    propertyTenantEmail: '',
    propertyImgFile: '',

}

const SET_PROPERTY_ADDRESS = 'SET_PROPERTY_ADDRESS';
const SET_FINANCIAL_INFORMATION = 'SET_FINANCIAL_INFORMATION';
const SET_TENANT_INFORMATION = 'SET_TENTANT_INFORMATION';
const SET_PROPERTY_IMG = 'SET_PROPERTY_IMG';
const CLEAR_STATE = 'CLEAR_STATE';

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PROPERTY_ADDRESS:
            let { propertyStreet, propertyCity, propertyState, propertyZipcode } = action.payload;
            return Object.assign({}, state, { propertyStreet, propertyCity, propertyState, propertyZipcode });
        case SET_FINANCIAL_INFORMATION:
            let { propertyRent } = action.payload;
            return Object.assign({}, state, { propertyRent });
        case SET_TENANT_INFORMATION:
            let { propertyTenantName, propertyTenantContactNumber, propertyTenantEmail } = action.payload;
            return Object.assign({}, state, { propertyTenantName, propertyTenantContactNumber, propertyTenantEmail });
        case SET_PROPERTY_IMG:
            let { propertyImgFile } = action.payload;
            return Object.assign({}, state, { propertyImgFile });
        case CLEAR_STATE:
            return initialState;
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

export function setFinancialInformation(propertyRent) {
    return {
        type: SET_FINANCIAL_INFORMATION,
        payload: {
            propertyRent
        }
    }
}

export function setTenantInformation(propertyTenantName, propertyTenantContactNumber, propertyTenantEmail) {
    return {
        type: SET_TENANT_INFORMATION,
        payload: {
            propertyTenantName, propertyTenantContactNumber, propertyTenantEmail
        }
    }
}

export function setPropertyImg(propertyImgFile) {
    return {
        type: SET_PROPERTY_IMG,
        payload: { propertyImgFile }
    }
}

export function clearState(){
    return{
        type: CLEAR_STATE
    }
}

