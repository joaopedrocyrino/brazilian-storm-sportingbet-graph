create table championship (
    id text not null,
    name text NOT NULL,
    season SMALLINT NOT NULL,
    country text not null,
    primary key(id)
);
create table match (
    id text not null,
    champ_id text not null REFERENCES championship(id),
    house text NOT NULL,
    visitor text not null,
    "start" TIMESTAMPTZ not null,
    primary key(id, champ_id)
);
create table winner_bet (
    id text not null,
    champ_id text not null,
    match_id text not null,
    better text not null,
    "value" text not null,
    house boolean not null,
    FOREIGN KEY (champ_id, match_id) REFERENCES match(champ_id, id),
    primary key(id, champ_id, match_id)
);
create table score_bet (
    id text not null,
    champ_id text not null,
    match_id text not null,
    better text not null,
    "value" text not null,
    house SMALLINT not null,
    visitor SMALLINT not null,
    FOREIGN KEY (champ_id, match_id) REFERENCES match(champ_id, id),
    primary key(id, champ_id, match_id)
);
create table goals_bet (
    id text not null,
    champ_id text not null,
    match_id text not null,
    better text not null,
    "value" text not null,
    house boolean not null,
    goals SMALLINT not null,
    FOREIGN KEY (champ_id, match_id) REFERENCES match(champ_id, id),
    primary key(id, champ_id, match_id)
);
