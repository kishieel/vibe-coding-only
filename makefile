.PHONY: bootstrap environment wait-for-services install migrate truncate prestart start stop prune
.DEFAULT_GOAL: start

bootstrap: environment install prestart wait-for-services migrate start

environment: 
	@test -f .env || cp .env.example .env

wait-for-services:
	@docker compose exec postgres sh -c '/wait-for-postgres.sh'

install:
	@yarn install

migrate:
	@docker compose run --rm backend yarn migrate:deploy

truncate:
	@docker compose run --rm backend yarn migrate:truncate

prestart:
	@docker compose up -d postgres

start:
	@docker compose up -d

stop:
	@docker compose down

prune:
	@docker compose down -v