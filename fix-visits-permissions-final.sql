-- 1) Dar acesso ao schema 'portfolio' para o service_role
GRANT USAGE ON SCHEMA portfolio TO service_role;

-- 2) Dar permissão completa na tabela portfolio.visits para o service_role
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE portfolio.visits TO service_role;

-- 3) Dar permissão na SEQUENCE usada pelo id (portfolio.visits_id_seq)
GRANT USAGE, SELECT ON SEQUENCE portfolio.visits_id_seq TO service_role;

-- Garantir pros próximos objetos que você criar no schema portfolio:
ALTER DEFAULT PRIVILEGES IN SCHEMA portfolio
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA portfolio
GRANT USAGE, SELECT ON SEQUENCES TO service_role;
