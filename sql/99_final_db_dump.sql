-- Step 0: Rename the old 'user_home' table to 'user_home_old'
ALTER TABLE `user_home` RENAME TO `user_home_old`;

-- Step 1: Creating the 'user' table
CREATE TABLE IF NOT EXISTS `user` (
    `username` VARCHAR(50) PRIMARY KEY,
    `email` VARCHAR(100)
);

-- Step 2: Creating the 'home' table
CREATE TABLE IF NOT EXISTS `home` (
    `street_address` VARCHAR(255) PRIMARY KEY,
    `state` VARCHAR(50),
    `zip` VARCHAR(10),
    `sqft` DECIMAL(10, 2),
    `beds` INT,
    `baths` INT,
    `list_price` DECIMAL(15, 2)
);

-- Step 3: Creating the new 'user_home' table to represent the many-to-many relationship where username and street_address are foreign keys
CREATE TABLE IF NOT EXISTS `user_home` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50),
    `street_address` VARCHAR(255),
    FOREIGN KEY (`username`) REFERENCES `user`(`username`),
    FOREIGN KEY (`street_address`) REFERENCES `home`(`street_address`)
);

-- Step 4: Populating the 'user' table from the old 'user_home_old' table
INSERT INTO `user` (`username`, `email`)
SELECT DISTINCT `username`, `email` FROM `user_home_old`;

-- Step 5: Populating the 'home' table
INSERT INTO `home` (`street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)
SELECT DISTINCT `street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price` FROM `user_home_old`;

-- Step 6: Populating the new 'user_home' table with the many-to-many relationships
INSERT INTO `user_home` (`username`, `street_address`)
SELECT `username`, `street_address` FROM `user_home_old`;

-- Step 7: Drop the old 'user_home_old' table 
-- DROP TABLE IF EXISTS `user_home_old`;
