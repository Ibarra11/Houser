SELECT  w.job_id, c.company_name, c.company_address, c.company_city, c.company_state, c.company_zipcode, c.company_phone, 
w.work_description, w.date_created, w.time_created, p.property_img, p.property_street, p.property_city, p.property_state, p.property_zipcode
FROM work_orders w, property_information p, company c
WHERE w.owner_id = $1 AND w.property_id = p.property_id AND w.company_id = c.company_id AND w.work_order_status = 'Finished';

