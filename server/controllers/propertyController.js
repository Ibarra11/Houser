module.exports = {
    addProperty: async (req, res) => {
        const db = req.app.get('db');
        // Seperate the data into their respective tabl
        // 1. Property Information
        let { propertyStreet, propertyCity, propertyState, propertyZipcode, imgUrl } = req.body;
        let { ownerId } = req.session;

        async function setPropertyInformation() {
            let fn;
           await db.add_property_info(ownerId, propertyStreet, propertyCity, propertyState, propertyZipcode, imgUrl)
                .then(res => {
                    console.log(res);
                    console.log('test');
                    let { property_id } = res.data;
                    console.log(1);
                    console.log(res.data)
                    fn = setPropertyFinances(property_id);
                    return fn;
                })
                .catch(err => res.send(err + 'step1'))
            
        }

        // 2. Financial Information
        let { propertyRent } = req.body;
        function setPropertyFinances(property_id) {
            console.log(2);
            db.add_property_finances(property_id, propertyRent)
                .then(() => setPropertyTenants(property_id))
                .catch(res.status(500).send(err))
        }

        // 3. Tenant Information
        let { propertyTenantName, propertyTenantContactNumber, propertyTenantEmail } = req.body
        function setPropertyTenants(property_id) {
            console.log(3);
            db.add_property_tentants(property_id, propertyTenantName, propertyTenantContactNumber, propertyTenantEmail)
                .then(() => res.sendStatus(200))
                .catch(res.status(500).send(err))
        }

        // Function Invocation of all three functions in order
        let firstAsyncFn = await setPropertyInformation();
        let secondAsyncFn = await firstAsyncFn();
        secondAsyncFn();
    }
}