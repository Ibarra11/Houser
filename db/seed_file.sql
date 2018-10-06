CREATE TABLE owners(
    owner_id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(200)
)

CREATE TABLE property_information(
    property_id SERIAL PRIMARY KEY,
    owner_id VARCHAR(50) REFERENCES owners(owner_id),
    property_street VARCHAR(100),
    property_city VARCHAR(50),
    property_state VARCHAR(50),
    property_zipcode INTEGER,
    property_img VARCHAR(200)
);


CREATE TABLE property_finances(
    property_id INTEGER PRIMARY KEY,
    property_rent float
);


CREATE TABLE property_tenants(
    property_id INTEGER PRIMARY KEY,
    tenantName VARCHAR(100),
    tenantPhone VARCHAR(20),
    tenantEmail VARCHAR(200)
)