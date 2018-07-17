

CREATE TABLE users
(
    id SERIAL NOT NULL,
    first_name VARCHAR(40),
    last_name VARCHAR(100),
    email VARCHAR(70) UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR(255)
);

INSERT INTO users
    (first_name, last_name, email, password)
VALUES
    ('Emma', 'Fisher', 'fis17001@byui.edu', 'myPassword');
INSERT INTO users
    (first_name, last_name, email, password)
VALUES
    ('Kate', 'Carter', 'car13044@byui.edu', 'KatePassword');
INSERT INTO users
    (first_name, last_name, email, password)
VALUES
    ('Zach', 'Fisher', 'zach@byui.edu', 'ZachPassword');



CREATE TABLE items
(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price MONEY,
    user_id VARCHAR REFERENCES users(email)
)


INSERT INTO items
    (name, price, user_id)
VALUES
    ('Banana', '0.54', 'fis17001@byui.edu');

INSERT INTO items
    (name, price, user_id)
VALUES
    ('Cereal', '3.28', 'fis17001@byui.edu');
