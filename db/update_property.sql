UPDATE property_information
SET property_street = $2, property_city=$3, property_state=$4, property_zipcode=$5
WHERE property_id = $1;

UPDATE property_finances
SET property_rent = $6
WHERE property_id = $1;

UPDATE property_tenants
SET tenant_name = $7, tenant_phone=$8, tenant_email=$9
WHERE property_id = $1;