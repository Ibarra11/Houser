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
    tenant_email VARCHAR(200),
    tenant_SSN INTEGER
)

CREATE TABLE work_order_queue(
    job_id SERIAL PRIMARY KEY,
    property_id INTEGER,
    owner_id VARCHAR(50) REFERENCES owners(owner_id),
    company_name VARCHAR(100),
    company_address VARCHAR(100),
    company_city VARCHAR(100),
    company_zipcode VARCHAR(5),
    company_phone VARCHAR(15),
    work_description TEXT,
    date_created VARCHAR(50),
    time_created VARCHAR(50)
)

CREATE TABLE completed_work_orders(
    job_id SERIAL PRIMARY KEY,
    property_id INTEGER,
    owner_id VARCHAR(50) REFERENCES owners(owner_id),
    company_name VARCHAR(100),
    company_phone VARCHAR(100),
    company_charge FLOAT,
    company_email VARCHAR(200),
    job_description TEXT,
    date_created VARCHAR(50),
    time_created VARCHAR(50)
)


CREATE TABLE payments(
    payment_id SERIAL PRIMARY KEY,
    property_id INTEGER,
    payment_amount FLOAT,
    payment_date DATE,
    stripe_ID VARCHAR(100)
);


