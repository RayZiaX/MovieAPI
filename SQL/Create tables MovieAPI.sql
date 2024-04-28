
DROP TABLE IF EXISTS "movies" CASCADE;
CREATE TABLE movies(
	id_movie SERIAL NOT NULL,
	name VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	date TIMESTAMP WITH TIME ZONE NOT NULL,
	CONSTRAINT pk_movies PRIMARY KEY (id_movie)
);

DROP TABLE IF EXISTS "categories" CASCADE;
CREATE TABLE categories(
	id_categorie SERIAL NOT NULL,
	name VARCHAR(255) NOT NULL,
	active BOOLEAN NOT NULL,
	CONSTRAINT pk_categories PRIMARY KEY (id_categorie)
);

DROP TABLE IF EXISTS "movies_categories";
CREATE TABLE movies_categories(
	id_movie INT NOT NULL,
	id_categorie INT NOT NULL,
	CONSTRAINT pk_movies_categories PRIMARY KEY(id_movie,id_categorie),
	CONSTRAINT fk_movies_movies_categories FOREIGN KEY (id_movie) REFERENCES movies(id_movie) ON DELETE CASCADE,
	CONSTRAINT fk_categories_movies_categories FOREIGN KEY (id_categorie) REFERENCES categories(id_categorie)
);