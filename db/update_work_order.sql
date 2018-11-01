UPDATE completed_work_orders 
set company_name = $2,  company_phone = $3, company_charge = $4, company_email = $5, job_description = $6 
WHERE job_id = $1
RETURNING *;