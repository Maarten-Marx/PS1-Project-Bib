create schema library;
use library;

create table Timeslot(
timeslot_id int auto_increment not null primary key,
start_time timestamp not null,
end_time timestamp not null,
date date,
number_of_seats int
);

create table Schedule_Exception(
schedule_exception_id int auto_increment not null primary key,
date date not null,
opening_time timestamp not null,
closing_time timestamp not null
);

create table Schedule(
schedule_id int auto_increment not null primary key,
week_day_index int not null,
opening_time timestamp not null,
closing_time timestamp not null
);

create table Reservation(
reservation_id int auto_increment not null primary key,
name varchar(20),
first_name varchar(30),
email varchar(180),
timestamp timestamp,
cancel_hash char(64)
);


create table Reservation_Timeslot(
reservation_timeslot_id int auto_increment not null primary key,
reservation_id int not null,
timeslot_id int not null,
constraint FK_Timeslot foreign key (timeslot_id) references Timeslot(timeslot_id),
constraint FK_Reservation foreign key (reservation_id) references Reservation(reservation_id)
);