UPDATE work_orders
SET work_order_status = 'Finished'
WHERE job_id = $1;