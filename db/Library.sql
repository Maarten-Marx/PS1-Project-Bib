DROP SCHEMA IF EXISTS library;
CREATE SCHEMA library;
USE library;

CREATE TABLE Timeslot (
    timeslot_id INT AUTO_INCREMENT PRIMARY KEY,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    date DATE NOT NULL,
    number_of_seats INT NOT NULL
);

CREATE TABLE Schedule_Exception (
    schedule_exception_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    number_of_seats INT NOT NULL,
    opening_time TIME,
    closing_time TIME
);

CREATE TABLE Schedule (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    week_day_index INT NOT NULL,
    number_of_seats INT NOT NULL,
    opening_time TIME,
    closing_time TIME
);

CREATE TABLE Reservation
(
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    email VARCHAR(180) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    cancel_hash CHAR(64) NOT NULL
);

CREATE TABLE Reservation_Timeslot
(
    reservation_timeslot_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT NOT NULL,
    timeslot_id INT NOT NULL,
    CONSTRAINT unq_reservation_timeslot UNIQUE (reservation_id, timeslot_id),
    CONSTRAINT FK_Timeslot FOREIGN KEY (timeslot_id) REFERENCES Timeslot (timeslot_id),
    CONSTRAINT FK_Reservation FOREIGN KEY (reservation_id) REFERENCES Reservation (reservation_id) ON DELETE CASCADE
);