module.exports = {
  createWorkOrder: (req, res) => {
    let {
      propertyId,
      companyName,
      companyAddress,
      companyCity,
      companyZipcode,
      companyPhone,
      workDescription,
      date,
      time
    } = req.body;
    let { ownerId } = req.session;
    req.app
      .get("db")
      .add_to_queue([
        propertyId,
        ownerId,
        companyName,
        companyAddress,
        companyCity,
        companyZipcode,
        companyPhone,
        workDescription,
        date,
        time
      ])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => console.log(err));
  },
  getWorkOrders: (req, res) => {
    let { ownerId } = req.session;
    req.app
      .get("db")
      .get_from_queue([ownerId])
      .then(workOrders => {
        res.send(workOrders);
      })
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
