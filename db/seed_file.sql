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
    property_id INTEGER PRIMARY KEY REFERENCES property_information(property_id) ON DELETE CASCADE,
    property_rent float
);


CREATE TABLE property_tenants(
    property_id INTEGER PRIMARY KEY REFERENCES property_information(property_id) ON DELETE CASCADE,
    tenant_name VARCHAR(100),
    tenant_phone VARCHAR(20),
    tenant_email VARCHAR(200)
)

CREATE TABLE work_orders(
    property_id INTEGER PRIMARY KEY,
    company_name VARCHAR(100),
    company_phone VARCHAR(100),
    company_charge FLOAT,
    company_email VARCHAR(200),
    job_description TEXT,
    date_time TIMESTAMP
)