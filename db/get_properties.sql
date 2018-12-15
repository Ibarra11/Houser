SELECT  
    p1.property_id, p1.property_street, p1.property_city, p1.property_state, p1.property_zipcode, p1.property_img,
    p2.property_rent,
    p3.tenant_name, p3.tenant_phone, p3.tenant_email, p3.tenant_ssn
FROM property_information p1, property_finances p2, property_tenants p3
WHERE p1.owner_id = $1 AND p1.property_id = p2.property_id AND p1.property_id = p3.property_id
ORDER BY p1.property_id DESC;