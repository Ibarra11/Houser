SELECT job_id 
FROM work_orders 
WHERE owner_id = $1
ORDER BY 1 DESC
LIMIT 1;