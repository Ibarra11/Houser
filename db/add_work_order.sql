INSERT INTO work_orders 
(property_id, owner_id, company_id, work_description, date_created, time_created, work_order_status)
VALUES($1, $2, $3, $4, $5, $6, $7);