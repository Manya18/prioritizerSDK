create TABLE feature(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255)
)

create TABLE choice(
    id SERIAL PRIMARY KEY,
    priority INTEGER,
    feature_id INTEGER,
	is_positive BOOLEAN,
    FOREIGN KEY (feature_id) REFERENCES feature (id)
)