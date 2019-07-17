module.exports = {
  addWorkOrder: async (req, res) => {
    let db = req.app.get("db");
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

    let company_data = await db.add_company([
      companyName,
      companyAddress,
      companyCity,
      companyState,
      companyZipcode,
      companyPhone
    ]);

    // This db call is getting the last current index of the property.  And, it's being incremented by 1.
    let job_data = await db.get_last_work_order([ownerId]);
    job_data[0].job_id += 1;

    db.add_work_order([
      job_data[0].job_id,
      propertyId,
      ownerId,
      company_data[0].company_id,
      workDescription,
      date,
      time,
      workOrderStatus
    ]).then(() => {
      res.sendStatus(200);
    });
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
        res.status(500).send(err);
      });
  }
};
