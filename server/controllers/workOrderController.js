module.exports = {
    createWorkOrder: (req, res) => {
        let { propertyId, companyName, companyPhone, companyCharge, companyEmail, description, time, date } = req.body;
        let {ownerId} = req.session;
        req.app.get('db').add_to_queue([propertyId, ownerId, companyName, companyPhone, companyCharge, companyEmail, description, date, time])
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => console.log(err))
    },
    getWorkOrders: (req,res) =>{
        let {ownerId} = req.session;
        req.app.get('db').get_from_queue([ownerId])
        .then(workOrders =>{
            res.send(workOrders);
        })
        .catch(err => res.status(500).send(err))
    },
    completedWorkOrder: (req,res) =>{
        let {job_id} = req.body;
       req.app.get('db').completed_work_order([job_id])
       .then( () =>{
            res.sendStatus(200);
       })
       .catch(err => console.log(err))
        
    },
    getCompletedWorkOrders: (req,res) =>{
        let {ownerId} = req.session;
        req.app.get('db').completed_work_orders([ownerId])
        .then(workOrders => res.send(workOrders))
        .catch(err => console.log(err))
    }
}