up:
	docker-compose up -d
db-up:
	docker-compose up --detach db
down:
	docker-compose down

pgweb:
	docker-compose up -d pgweb

