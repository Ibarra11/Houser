INSERT INTO work_order_queue 
(property_id, owner_id, company_name, company_address, company_city, company_zipcode, company_phone, work_description, date_created, time_created)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);