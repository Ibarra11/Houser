module.exports = {
    createWorkOrder: (req, res) => {
        console.log(req.body);
        let { propertyId, companyName, companyPhone, companyCharge, companyEmail, description, timeStamp } = req.body;
        req.app.get('db').create_work_order([propertyId, companyName, companyPhone, companyCharge, companyEmail, description, timeStamp])
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => console.log(err))
    }
}