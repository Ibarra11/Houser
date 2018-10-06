module.exports = {
    addProperty: async (req, res) => {
        const db = req.app.get('db');
        // Seperate the data into their respective tabl
        // 1. Property Information
        let { propertyStreet, propertyCity, propertyState, propertyZipcode, imgUrl } = req.body;
        let { ownerId } = req.session;

        async function setPropertyInformation() {
            await db.add_property_info(ownerId, propertyStreet, propertyCity, propertyState, propertyZipcode, imgUrl)
                .then(res => {
                    let { property_id } = res[0];
                    setPropertyFinances(property_id);
                })
                .catch(err => res.send(err + 'step1'));
        }

        // 2. Financial Information
        let { propertyRent } = req.body;
        async function setPropertyFinances(property_id) {
            await db.add_property_finances(property_id, propertyRent)
                .then(() => setPropertyTenants(property_id))
                .catch(err => console.log(err))
        }

        // 3. Tenant Information
        let { propertyTenantName, propertyTenantContactNumber, propertyTenantEmail } = req.body
        async function setPropertyTenants(property_id) {
            await db.add_property_tenants(property_id, propertyTenantName, propertyTenantContactNumber, propertyTenantEmail)
                .then(() => res.sendStatus(200))
                .catch(err => console.log(err))
        }

        /* 
        Function invocation of all three functions in order
            setPropertyInformation => setPropertyFinances => setPropertyTenants
         */
        setPropertyInformation();
    }
}