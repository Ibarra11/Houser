SELECT pay.payment_id, t.tenant_name, pay.payment_amount, payment_date,  p.property_street, p.property_city, p.property_state, p.property_zipcode 
FROM property_information p, payments pay, property_tenants t
WHERE p.owner_id = $1 AND  pay.property_id = p.property_id AND pay.property_id = t.property_id;
