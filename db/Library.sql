create schema library;
use library;

create table Timeslot
(
    timeslot_id int auto_increment not null primary key,
    start_time timestamp not null,
    end_time timestamp not null,
    date date not null,
    number_of_seats int not null
);

create table Schedule_Exception
(
    schedule_exception_id int auto_increment not null primary key,
    date date not null,
    number_of_seats int not null,
    opening_time time,
    closing_time time
);

create table Schedule
(
    schedule_id int auto_increment not null primary key,
    week_day_index int not null,
    number_of_seats int not null,
    opening_time time,
    closing_time time
);

create table Reservation
(
    reservation_id int auto_increment not null primary key,
    name varchar(20) not null,
    first_name varchar(30) not null,
    email varchar(180) not null,
    timestamp timestamp not null,
    cancel_hash char(64) not null
);

create table Reservation_Timeslot
(
    reservation_timeslot_id int auto_increment not null primary key,
    reservation_id int not null,
    timeslot_id int not null,
    constraint unq_reservation_timeslot unique (reservation_id, timeslot_id),
    constraint FK_Timeslot foreign key (timeslot_id) references Timeslot (timeslot_id),
    constraint FK_Reservation foreign key (reservation_id) references Reservation (reservation_id) on delete cascade
);