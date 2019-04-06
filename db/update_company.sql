UPDATE company
SET company_name = $2, company_address = $3, company_city = $4, company_state = $5, company_zipcode = $6, company_phone = $7
where company_id = $1
RETURNING *;