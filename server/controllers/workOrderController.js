module.exports = {
    createWorkOrder: (req, res) => {
        let { propertyId, companyName, companyPhone, companyCharge, companyEmail, description, time, date } = req.body;
        req.app.get('db').create_work_order([propertyId, companyName, companyPhone, companyCharge, companyEmail, description, date, time])
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => console.log(err))
    },
    getWorkOrders: (req,res) =>{
        req.app.get('db').get_work_orders()
        .then(workOrders =>{
            console.log(workOrders);
            res.send(workOrders);
        })
        .catch(err => res.status(500).send(err))
    }
}