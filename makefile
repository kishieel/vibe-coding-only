.PHONY: bootstrap environment wait-for-services install migrate truncate prestart start stop watch prune
.DEFAULT_GOAL: watch

bootstrap: environment install prestart wait-for-services migrate watch

environment: 
	@test -f .env || cp .env.example .env

wait-for-services:
	@docker compose exec postgres sh -c '/wait-for-postgres.sh'

install:
	@yarn install

migrate:
	@docker compose run --rm backend yarn migrate

truncate:
	@docker compose run --rm backend yarn truncate

prestart:
	@docker compose up -d postgres

start:
	@docker compose up -d

stop:
	@docker compose down

watch:
	@docker compose watch

prune:
	@docker compose down -v