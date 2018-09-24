CREATE TABLE Users (
  id           INT PRIMARY KEY AUTO_INCREMENT         NOT NULL,
  firstName    VARCHAR(100)                            NULL,
  lastName     VARCHAR(100)                            NULL,
  email        VARCHAR(100)                            NULL,
  password     VARCHAR(100)                            NULL
)
ENGINE = INNODB;

