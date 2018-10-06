INSERT INTO property_information (owner_id, property_street, property_city, property_state, property_zipcode, property_img)
VALUES($1, $2, $3, $4,, $5, $6)
RETURNING *;