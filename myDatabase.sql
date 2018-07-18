

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
    url VARCHAR(400),
    user_id VARCHAR REFERENCES users(email)
)


INSERT INTO items
    (name, price, user_id, url)
VALUES
    ('Banana', '0.60', 'fis17001@byui.edu', 'https://i5.walmartimages.com/asr/209bb8a0-30ab-46be-b38d-58c2feb93e4a_1.1a15fb5bcbecbadd4a45822a11bf6257.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF');

INSERT INTO items
    (name, price, user_id, url)
VALUES
    ('Cereal', '3.28', 'fis17001@byui.edu', 'https://i5.walmartimages.com/asr/a81a4e80-7b0b-4ee8-ba61-44e136504136_1.be68ff254c6eb8e021ff44fb60959278.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF');

INSERT INTO items
    (name, price, user_id, url)
VALUES
    ('Peaches', '1.89', 'fis17001@byui.edu', 'https://i5.walmartimages.com/asr/f1a3b127-a482-4e98-af1a-d5ded4c72dc6_1.3bcd8980bbf7adbfb802b57b33376b40.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF');

INSERT INTO items
    (name, price, user_id, url)
VALUES
    ('Almond Milk', '2.15', 'fis17001@byui.edu', 'https://i5.walmartimages.com/asr/f180f0cc-6425-48d0-aa92-246ef123f5c1_1.68cb582f308d2a896c4d1af42583666b.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF');

INSERT INTO items
    (name, price, user_id, url)
VALUES
    ('Rice', '1.48', 'fis17001@byui.edu', 'https://i5.walmartimages.com/asr/e656e6fa-c7f7-4b9c-a5e0-4f7b664a3159_1.724d8c274ec8f0326c626bf0fa994160.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF');

INSERT INTO items
    (name, price, user_id, url)
VALUES
    ('Pasta', '1.48', 'fis17001@byui.edu', 'https://i5.walmartimages.com/asr/9c3f1c31-e48c-4041-9fad-17fa7e2c1f9a_1.78afa36997dc177cc1310dcb6588f5d8.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff');

INSERT INTO items
    (name, price, user_id, url)
VALUES
    ('Potatoes', '2.78', 'fis17001@byui.edu', 'https://i5.walmartimages.com/asr/84458cb4-0faa-4ad2-bf9a-8d9f84dcc623_3.f90a7f5e30dbeeed4f3e45a5b73d7fa2.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF');

INSERT INTO items
    (name, price, user_id, url)
VALUES
    ('Juice', '2.48', 'fis17001@byui.edu', 'https://i5.walmartimages.com/asr/ef07cf19-9007-4447-a1ad-1a8d91c8a3ae_1.c43642c8f700c8be416a8f0ee1d33c30.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF');

INSERT INTO items
    (name, price, user_id, url)
VALUES
    ('Tuna', '1.65', 'fis17001@byui.edu', 'https://i5.walmartimages.com/asr/1f8192d6-b37f-42b7-82b7-d2174985860a_2.c8e45bf36547131b9eee67095cf56b53.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF');

INSERT INTO items
    (name, price, user_id, url)
VALUES
    ('Oreo', '2.98', 'fis17001@byui.edu', 'https://i5.walmartimages.com/asr/324ff536-aeb9-4e14-bad4-59c230523e21_1.81fa866b27d2480b10664b1b453ae56e.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF');
