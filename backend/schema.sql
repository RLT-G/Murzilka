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

INSERT INTO public.api_project (id, name, description, end_event, start_event, logo_url, website_url, whitepaper_url, token, status) VALUES (2, 'MON Protocol', 'Building the Nintendo of Web3, publishing and developing blockchain-native IPs and games.', '2024-07-24 18:17:13.118+03', '2024-07-24 18:17:13.118+03', 'https://img.cryptorank.io/coins/mon_protocol1716287729305.png', 'https://www.monprotocol.ai/', 'https://www.monprotocol.ai/tokenomics', 'MON', 'Закончен');
INSERT INTO public.api_project (id, name, description, end_event, start_event, logo_url, website_url, whitepaper_url, token, status) VALUES (13, '1', NULL, '2024-07-25 17:45:09.15+03', '2024-07-25 17:45:09.15+03', NULL, NULL, NULL, '1', 'Аирдроп 27 апр');
INSERT INTO public.api_project (id, name, description, end_event, start_event, logo_url, website_url, whitepaper_url, token, status) VALUES (14, '23', NULL, '2024-07-25 17:45:09.15+03', '2024-07-25 17:45:09.15+03', NULL, NULL, NULL, '23', 'Закончен');
INSERT INTO public.api_project (id, name, description, end_event, start_event, logo_url, website_url, whitepaper_url, token, status) VALUES (5, '123453214', NULL, '2024-07-25 17:37:36.206+03', '2024-07-25 17:37:36.206+03', NULL, NULL, NULL, '1234', 'Аирдроп 27 апр');


--
-- Data for Name: api_task; Type: TABLE DATA; Schema: public; Owner: danosmac
--

INSERT INTO public.api_task (id, title, description, reward, check_type) VALUES (2, 'Отпразднуй день Мурзилки в Теремке!', 'Ты готов делать историю с семьей Мурзилки?', 3000, 'photo');
INSERT INTO public.api_task (id, title, description, reward, check_type) VALUES (3, 'Сыграй в Quantum eggs', 'Сыграй в игру с любым количеством капитала', 3000, 'photo');
INSERT INTO public.api_task (id, title, description, reward, check_type) VALUES (4, 'Сыграй в DOTA', 'Сыграй в игру с любым количеством капитала', 3000, 'photo');
INSERT INTO public.api_task (id, title, description, reward, check_type) VALUES (5, 'Сыграй в PUBG', 'Сыграй в игру с любым количеством капитала', 3000, 'photo');
INSERT INTO public.api_task (id, title, description, reward, check_type) VALUES (1, 'Подключи аккаунт ВК', 'Подключи свой ВК аккаунт, чтобы начать фармить. Убедись, что ссылка на твой аккаунт и кошелек правильные. ТЫ НЕ СМОЖЕШЬ ИХ ПОМЕНЯТЬ В ДАЛЬНЕЙШЕМ!', 0, 'link');

COMMIT;