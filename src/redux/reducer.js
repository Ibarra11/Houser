const intialState = {
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

export default function(state = intialState, action){
    switch(action.type){
        default:
            return state;
    }
}