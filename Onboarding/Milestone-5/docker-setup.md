# Setting up Docker and Docker Compose

## Useful commands (GTP generated. Intend to use as a quick-reference)

### Containers

- docker ps — list running containers
- docker ps -a — list all containers, including stopped
- docker run -it --rm ubuntu bash — run, attach shell, auto-remove on exit
- docker start <container> — start a stopped container
- docker stop <container> — stop a running container
- docker restart <container> — restart a container
- docker rm <container> — remove a container (-f to force)
- docker exec -it <container> bash — run a command in a container
- docker logs -f <container> — follow container logs
- docker stats — live CPU and memory usage of containers
- docker top <container> — show processes in a container
- docker inspect <name-or-id> — detailed JSON info
- docker run -p 8080:80 nginx — map host port 8080 to container port 80
- docker cp <ctr>:/path /host/path — copy files to/from a container

### Images

- docker pull nginx:latest — download an image
- docker images — list local images
- docker rmi <image> — remove an image
- docker build -t myapp:dev . — build from a Dockerfile
- docker tag myapp:dev myrepo/myapp:dev — add a new tag
- docker push myrepo/myapp:dev — push to a registry
- docker save -o img.tar myrepo/myapp:dev — save image to a tar file
- docker load -i img.tar — load an image from a tar file
- docker export <container> -o fs.tar — export container filesystem
- docker import fs.tar myimg:imported — create image from a tar filesystem

### Volumes and mounts

- docker volume ls — list volumes
- docker volume create myvol — create a named volume
- docker volume rm myvol — remove a volume
- docker run -v myvol:/data busybox — attach a named volume
- docker run -v "$(pwd)"/app:/app node:20 — bind mount a host directory

### Networks

- docker network ls — list networks
- docker network create mynet — create a network
- docker network connect mynet <container> — attach a container to a network

### Cleanup

- docker container prune — remove stopped containers
- docker image prune — remove dangling images
- docker system prune -a — remove all unused data

### Docker Compose (v2+)

- docker compose up -d — start services in the background
- docker compose down — stop and remove services
- docker compose logs -f — follow service logs
- docker compose up -d --build — rebuild images and restart services

### Handy flags

- -d — run in background
- -p host:container — publish a port
- -e KEY=VALUE — set environment variables
- --name NAME — name the container
- --restart unless-stopped — set an auto-restart policy

## Reflection

### What is the difference between docker run and docker-compose up?

- Docker run starts a docker container while docker-compose up both builds and starts multiple docker containers defined in docker-compose.yml.

### How does Docker Compose help when working with multiple services?

- Allows batch-starting/stopping/building of multiple services at once.
- Network is shared between the docker environment and well as auto service discovery between docker services.
- YAML conf file can be shared to other people as to share a specific multi-container configuration.
- Easily scale specific containers (replicate services with a single command either up or down)

### What commands can you use to check logs from a running container?

#### Single container:

- docker logs <container>
- docker logs -f <container> # follow (tail)
- docker logs --since 10m <container> # last 10 minutes
- docker logs --tail 200 <container> # last 200 lines

#### Compose:

- docker compose logs # all services
- docker compose logs -f api # follow one service
- docker compose logs --since=1h db # last hour, db only

### What happens when you restart a container? Does data persist?

- Nope. Directories must named and or bound to the host system for data to be persistent.
- Files can be written to a writeable layer however this is lost if the container is deleted/recreated.
