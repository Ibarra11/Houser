INSERT INTO company (company_name, company_address, company_city, company_state, company_zipcode, company_phone)
VALUES($1, $2, $3, $4, $5, $6)
RETURNING *;