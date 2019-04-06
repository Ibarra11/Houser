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
  getCompletedWorkOrders: (req, res) => {
    let { ownerId } = req.session;
    req.app
      .get("db")
      .completed_work_orders([ownerId])
      .then(workOrders => {
        res.send(workOrders);
      })
      .catch(err => res.status(500).send(err));
  },
  updateWorkOrder: (req, res) => {
    let { jobId } = req.params;
    let {
      companyName,
      companyPhone,
      companyAddress,
      companyCity,
      companyState,
      companyZipcode,
      workDescription
    } = req.body;
    req.app
      .get("db")
      .update_work_order_description([jobId, workDescription])
      .then(workOrder => {
        let { company_id } = workOrder[0];
        req.app
          .get("db")
          .update_company([
            company_id,
            companyName,
            companyAddress,
            companyCity,
            companyState,
            companyZipcode,
            companyPhone
          ])
          .then(companyInfo => {
            res.send({ ...workOrder[0], ...companyInfo[0] });
          })
          .catch(err => {
            res.status(500).send(err);
          });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  deleteWorkOrder: (req, res) => {
    let { id } = req.params;
    req.app
      .get("db")
      .delete_work_order([id])
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
};
