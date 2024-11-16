
docker network create pg-network
docker run --name postgrebd -e POSTGRES_USER=ingressarme -e POSTGRES_PASSWORD=12345678 --network=pg-network -p 5432:5432 -d postgres
docker run --name pgadmin --network=pg-network -e PGADMIN_DEFAULT_EMAIL=ingressarme@admin.com -e PGADMIN_DEFAULT_PASSWORD=12345678 -p 80:80 -d dpage/pgadmin4
