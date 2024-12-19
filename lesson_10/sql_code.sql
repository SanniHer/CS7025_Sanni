CREATE TABLE people_table (
    PersonID int,
    PersonName varchar(255)

);

ALTER TABLE people_table Add age int;

ALTER TABLE people_table DROP age;

ALTER TABLE people_table MODIFY PersonID varchar(255);

INSERT INTO people_table (PersonID, PersonName)
VALUES ("1", "Sanni");  

SELECT *
FROM people_table
ORDER BY PersonID ASC;

UPDATE people_table
SET PersonID = "0"
WHERE PersonID = "1";

DELETE FROM people_table
WHERE PersonID = "0";