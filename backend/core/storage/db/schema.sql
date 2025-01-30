BEGIN;

DROP TABLE IF EXISTS api_task_progress;
DROP TABLE IF EXISTS api_task;
DROP TABLE IF EXISTS api_profile;
DROP TABLE IF EXISTS api_history;
DROP TABLE IF EXISTS api_project;

DROP SEQUENCE IF EXISTS api_history_id_seq;
DROP SEQUENCE IF EXISTS api_profile_id_seq;
DROP SEQUENCE IF EXISTS api_projects_id_seq;
DROP SEQUENCE IF EXISTS api_task_id_seq;
DROP SEQUENCE IF EXISTS api_user_task_id_seq;


CREATE sequence api_history_id_seq as integer;

CREATE sequence api_profile_id_seq as integer;

CREATE sequence api_projects_id_seq as integer;

CREATE sequence api_task_id_seq as integer;

CREATE sequence api_user_task_id_seq as integer;

CREATE type check_type as enum ('link', 'photo');

CREATE TABLE IF NOT EXISTS api_history
(
    id              INTEGER,
    user_id         INTEGER,
    activity        VARCHAR(32),
    "number_of_MRK" INTEGER,
    data            timestamp with time zone default now() not null
);

CREATE TABLE IF NOT EXISTS api_profile
(
    id           INTEGER          default nextval('api_profile_id_seq'::regclass) not null
        constraint api_profile_pk
            primary key,
    wallet       varchar(128)                                                     not null
        constraint api_profile_unique_pk
            unique,
    total_staked double precision default 0.0,
    total_pics   double precision default 0.0
);

CREATE TABLE IF NOT EXISTS api_project
(
    id             integer default nextval('api_projects_id_seq'::regclass) not null
        constraint api_project_pk
            primary key,
    name           varchar(32)                                              not null,
    description    text,
    end_event      timestamp with time zone                                 not null,
    start_event    timestamp with time zone                                 not null,
    logo_url       varchar,
    website_url    varchar,
    whitepaper_url varchar,
    token          varchar(16),
    status         varchar(64)
);

CREATE TABLE IF NOT EXISTS api_task
(
    id          integer    default nextval('api_task_id_seq'::regclass) not null
        constraint api_task_pk
            primary key,
    title       varchar(64)                                             not null,
    description text                                                    not null,
    reward      integer    default 0                                    not null,
    check_type  check_type default 'link'::check_type                   not null
);

CREATE TABLE IF NOT EXISTS api_task_progress
(
    id         integer                  default nextval('api_user_task_id_seq'::regclass) not null
        constraint api_task_progress_pk
            primary key,
    user_id    integer
        constraint api_task_progress_api_profile_null_fk
            references api_profile,
    task_id    integer
        constraint api_task_progress_api_task_null_fk
            references api_task,
    is_done    boolean                  default false                                     not null,
    created_at timestamp with time zone default now()                                     not null,
    task_link  text
);

COMMIT;