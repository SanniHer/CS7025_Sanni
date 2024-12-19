CREATE TABLE teams (
    teamID varchar(255),
    teamName varchar(255)

);

INSERT INTO teams (teamID, teamName) VALUES ("1", "England");
INSERT INTO teams (teamID, teamName) VALUES ("2", "Ireland");
INSERT INTO teams (teamID, teamName) VALUES ("3", "Scotland");


CREATE TABLE matches (
    matchID varchar(255),
    homeTeam varchar(255)

);

INSERT INTO matches (matchID, homeTeam) VALUES ("14234", "England");
INSERT INTO matches (matchID, homeTeam) VALUES ("25342", "England");
INSERT INTO matches (matchID, homeTeam) VALUES ("32342", "Ireland");



SELECT *
FROM matches
INNER JOIN teams ON homeTeam = teamName AND teamName = "Ireland";


SELECT *
FROM matches
JOIN teams ON homeTeam=teamName
WHERE teamName LIKE "%gla%";


SELECT COUNT(teamID), teamName
FROM teams
JOIN matches ON teamName = homeTeam
GROUP BY teamName
ORDER BY COUNT(teamName) DESC, teamName;