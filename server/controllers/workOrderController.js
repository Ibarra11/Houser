module.exports = {
  addWorkOrder: (req, res) => {
    let {
      propertyId,
      companyName,
      companyAddress,
      companyCity,
      companyState,
      companyZipcode,
      companyPhone,
      workDescription,
      date,
      time,
      workOrderStatus
    } = req.body;
    let { ownerId } = req.session;
    req.app
      .get("db")
      .add_company([
        companyName,
        companyAddress,
        companyCity,
        companyState,
        companyZipcode,
        companyPhone
      ])
      .then(data => {
        let { company_id } = data[0];
        req.app
          .get("db")
          .add_work_order([
            propertyId,
            ownerId,
            company_id,
            workDescription,
            date,
            time,
            workOrderStatus
          ])
          .then(() => {
            res.sendStatus(200);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send(err);
          });
      })
      .catch(err => res.send(err));
  },
  getQueuedWorkOrders: (req, res) => {
    let { ownerId } = req.session;
    req.app
      .get("db")
      .get_queued_work_orders([ownerId])
      .then(workOrders => {
        res.send(workOrders);
      })
      .catch(err => {
        res.send(err);
      });
  },
  updateWorkOrderStatus: (req, res) => {
    let { jobId } = req.params;
    req.app
      .get("db")
      .update_work_order_status([jobId])
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err));
  },
  completedWorkOrder: (req, res) => {
    let { job_id } = req.body;
    req.app
      .get("db")
      .completed_work_order([job_id])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => console.log(err));
  },
  getCompletedWorkOrders: (req, res) => {
    let { ownerId } = req.session;
    req.app
      .get("db")
      .completed_work_orders([ownerId])
      .then(workOrders => res.send(workOrders))
      .catch(err => res.status(500).send(err));
  },
  updateWorkOrder: (req, res) => {
    let { id } = req.params;
    let {
      companyName,
      companyEmail,
      companyPhone,
      companyCharge,
      jobDescription
    } = req.body;
    req.app
      .get("db")
      .update_work_order([
        id,
        companyName,
        companyPhone,
        +companyCharge,
        companyEmail,
        jobDescription
      ])
      .then(workOrder => res.send(workOrder))
      .catch(err => res.status(500).send(err));
  },
  deleteWorkOrder: (req, res) => {
    let { id } = req.params;
    req.app
      .get("db")
      .delete_work_order([id])
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err));
  }
};
