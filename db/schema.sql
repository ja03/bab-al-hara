-- Applied by `npm run db:migrate`. Safe to run more than once.
CREATE TABLE IF NOT EXISTS quiz_results (
  id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  character_id text        NOT NULL,
  answers      jsonb       NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quiz_results_character_id_idx ON quiz_results (character_id);
