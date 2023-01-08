sudo docker stop postgres
sudo docker container rm postgres
sudo docker container run --name postgres --env-file .env -it -d -p 5433:5432 postgres