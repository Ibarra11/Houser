module.exports = {
    addProperty: async (req, res) => {

        // Seperate the data into their respective table

        const db = req.app.get('db');

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
        let { propertyTenantName, propertyTenantContactNumber, propertyTenantEmail, propertyTenantSSN } = req.body
        async function setPropertyTenants(property_id) {
            await db.add_property_tenants(property_id, propertyTenantName, propertyTenantContactNumber, propertyTenantEmail, +propertyTenantSSN)
                .then(() => res.sendStatus(200))
                .catch(err => console.log(err))
        }

        /* 
        Function invocation of all three functions in order
            setPropertyInformation => setPropertyFinances => setPropertyTenants
         */
        setPropertyInformation();
    },
    getProperties: (req, res) => {
        let { ownerId } = req.session;
        req.app.get('db').get_properties([ownerId])
            .then(properties => {
                res.send(properties);
            })
            .catch(err => console.log(err));
    },
    deleteProperty: (req, res) => {
        let { propertyId } = req.params;
        req.app.get('db').delete_property([propertyId])
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => res.status(500).send(err))
    },
    updateProperty: (req, res) => {
        let { propertyId } = req.params;
        let {
            property_city, property_state, property_zipcode, property_street,
            property_rent, tenant_name, tenant_email, tenant_phone
        } = req.body;
        req.app.get('db').update_property([
            propertyId, property_street, property_city, property_state, property_zipcode,
            property_rent, tenant_name, tenant_phone, tenant_email
        ])
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => console.log(err))
    }
}