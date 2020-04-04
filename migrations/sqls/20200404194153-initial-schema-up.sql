CREATE EXTENSION "uuid-ossp";

CREATE TABLE games (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp,
  title text NOT NULL,
  currency_name text NOT NULL DEFAULT 'Dollar'
);

CREATE TABLE settings (
  id serial PRIMARY KEY NOT NULL,
  name text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp
);

CREATE TABLE game_settings (
  id serial PRIMARY KEY NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp,
  game_id uuid REFERENCES games (id) NOT NULL,
  setting_id int REFERENCES settings (id) NOT NULL,
  value boolean NOT NULL DEFAULT FALSE
);

CREATE TYPE transaction_types_enum AS ENUM (
  'pay',
  'charge',
  'reject',
  'join',
  'leave'
);

CREATE TABLE transactions (
  id serial PRIMARY KEY NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp,
  transaction_type transaction_types_enum NOT NULL,
  sender_id text NOT NULL,
  recipient_id text,
  game_id uuid REFERENCES games (id)
);

