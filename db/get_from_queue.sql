SELECT  w.job_id, w.date_created, w.time_created, p.property_street, p.property_city, p.property_state, p.property_zipcode
FROM work_order_queue w, property_information p
WHERE w.property_id = p.property_id AND w.owner_id = $1;