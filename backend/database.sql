create TABLE survey(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255)
);

create TABLE feature(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
	description TEXT,
	survey_id INTEGER NOT NULL,
	FOREIGN KEY (survey_id) REFERENCES survey (id)
	ON DELETE CASCADE
);

create TABLE choice(
    id SERIAL PRIMARY KEY,
    feature_id INTEGER not null,
    survey_id INTEGER not null,
	positive INTEGER not null,
	negative INTEGER not null,
    FOREIGN KEY (survey_id) REFERENCES survey (id)
    	on delete cascade,

    FOREIGN KEY (feature_id) REFERENCES feature (id)
	on delete cascade
)