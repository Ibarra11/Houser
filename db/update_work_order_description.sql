
UPDATE work_orders
SET work_description = $2
WHERE job_id = $1
RETURNING *;