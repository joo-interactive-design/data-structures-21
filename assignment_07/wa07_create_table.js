const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = process.env.user;
db_credentials.host = process.env.host;
db_credentials.database = process.env.database;
db_credentials.password = process.env.password;
db_credentials.port = process.env.port;


// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();


// Sample SQL statement to create a table: 
var thisQuery = `
create table special_interests
(
    id       integer not null
        constraint special_interests_pk
            primary key,
    category varchar not null
);

alter table special_interests
    owner to joojoo;

create unique index special_interests_category_uindex
    on special_interests (category);

create table meeting_types
(
    id                    integer not null
        constraint meeting_types_pk
            primary key,
    meeting_type_acronyms varchar not null,
    meeting_type          varchar not null
);

alter table meeting_types
    owner to joojoo;

create unique index meeting_types_meeting_type_meeting_type_acronyms_uindex
    on meeting_types (meeting_type, meeting_type_acronyms);

create table days
(
    id   integer not null
        constraint days_pk
            primary key,
    days varchar not null
);

alter table days
    owner to joojoo;

create unique index days_days_uindex
    on days (days);

create table time
(
    id         integer not null
        constraint time_pk
            primary key,
    start_time time    not null,
    end_time   time    not null
);

alter table time
    owner to joojoo;

create table locations
(
    id              integer          not null
        constraint locations_pk
            primary key,
    building_name   varchar          not null,
    address         varchar          not null,
    address_detail  varchar,
    state           varchar          not null,
    city            varchar          not null,
    longitude       double precision not null,
    latitude        double precision not null,
    additional_info varchar
);

alter table locations
    owner to joojoo;

create unique index locations_building_name_uindex
    on locations (building_name);

create table meetings
(
    id                  integer not null
        constraint meetings_pk
            primary key,
    meeting_titles      varchar not null,
    location_id         integer
        constraint meetings_locations_id_fk
            references locations,
    meeting_type_id     integer
        constraint meetings_meeting_types_id_fk
            references meeting_types,
    special_interest_id integer
        constraint meetings_special_interests_id_fk
            references special_interests,
    day_id              integer
        constraint meetings_days_id_fk
            references days,
    time_id             integer
        constraint meetings_time_id_fk
            references time
);

alter table meetings
    owner to joojoo;
`;
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE aalocations;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});