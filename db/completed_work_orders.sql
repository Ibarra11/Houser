SELECT w.*, p.property_street, p.property_city, p.property_state, p.property_img, p.property_zipcode
FROM property_information p, completed_work_orders w
WHERE w.owner_id = $1 AND p.property_id = w.property_id;

