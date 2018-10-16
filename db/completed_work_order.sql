WITH tmp AS (DELETE FROM work_order_queue WHERE job_id = $1 RETURNING *)
    INSERT INTO completed_work_orderS (JOB_ID, property_id, owner_id, company_name, company_phone, company_charge, company_email, job_description, date_created, time_created)
    SELECT * FROM tmp;