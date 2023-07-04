# What is Docker?
Docker is an open source platform that enables developers to build, deploy, run, update and manage containers—standardized, executable components that combine application source code with the operating system (OS) libraries and dependencies required to run that code in any environment.
Docker uses image and containers to allow apps to run anywhere, consistently.

<br />

## Docker Main Components:
* **Docker Image**
* **Docker Container**
* **Docker Volume**
* **Docker Network**

<br>

# Container vs Virtual Machines:
|                    Containers                  |                     Virtual Machines                         |
|------------------------------------------------|--------------------------------------------------------------|
| Run in container runtimes                      | Run on top of hypervisors                                    |
| Do not emulate any hardware                    | Need hardware emulation                                      |
| Do not rquire OS configuration                 | Require OS configuration                                     |
| Run one app at a time (normaly)                | Can run many apps at once                                    |
| Work alongside operating systems               | Can take up a lot of space                                   |
| Take up much less space                        | Cannot interact with their hosts                             |
| Can interact with their host                   |                                                              |

![Docker vs Virtual machine](https://github.com/tarekmonjur/docker/blob/master/dist/docker-vs-virtual.png?raw=true)

<br />

# What is Container?
A container is a sandboxed process on your machine that is isolated from all other processes on the host machine. A technology that bundles the code for an application and the configuration required to run the code itself in out unit.

- **Containers use control groups and namespaces to package applications**
- **Contrainers are created and managed by container runtimes and container engines**

## Creating container means
A container is composed of two things that is acutally use kernel namespaces and cgroups, features that have been in Linux for a long time.

![Create Container](https://github.com/tarekmonjur/docker/blob/master/dist/create-container.png?raw=true)

### Linux Namespaces
Namespaces is linux kernel feature that provide different `views` of your system.

|   Name    |   Description     |
|-----------|-------------------|
| USERNS    | User lists        |
| MOUNT     | Access to file systems |
| NET       | Network communication  |
| IPC       | Interprocess communication |
| TIME      | The ability to change time |
| PID       | Process ID Management      |
| CGROUP    | Create control groups      |
| UTC       | Create host/domain names   |

### Control Groups
Control groups is linux kernel feature that limit how much of any resource you can use. Its providing the ability to restrict how much hardware each process can use.
Docker uses control groups for -

* **Monitor and restrict CPU usage**
* **Monitor and restrict network and disk bandwidth**
* **Monitor and restrict memory consumption**

<br/>

# What is Docker Image?
Images are the building blocks of the Docker world. You launch your containers from images. Container images are prepackaged filesystems for containers. Images are the ”build” part of Docker’s life cycle. They are a layered format, using Union file systems, that are built step-by-step using a series of instructions. For example:

* Add a file.
* Run a command.
* Open a port.

You can consider images to be the ”source code” for your containers. They are highly portable and can be shared, stored, and updated.

<br/>

# Install Docker:
Follow docker doc [here](https://docs.docker.com/desktop/install).

## Where Configuration Files?
- **/var/lib/docker:** containers, volumes, and metadata
- **/var/lib/docker/overlay:** container volumes
- **/var/lib/docker.sock:** the pipeline between docker client and docker engine
- **/etc/docker/daemon.json:** docker engine configuration and other property like HTTP proxy and runtime configuration.

## How Docker Works:

![How Docker Works](https://github.com/tarekmonjur/docker/blob/master/dist/how-docker-works.png?raw=true)

1. The Docker client contacted the Docker daemon.
2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
3. The Docker daemon created a new container from that image.
4. The Docker daemon streamed that output to the Docker client, which sent it to the terminal.

<br/>

# Docker Commands:

### Show docker version and info
```
docker --version
docker version
docker info
```

### Help command to see available commands
```
docker --help
docker network --help
docker network create --help
```

<br>

## Docker Container Commands:

### Create container
```
docker create container hello-world:linux
```

### Show only running containers
```
docker ps
docker container ls
```

### Show newly containers
```
docker ps -all
docker container ls -all
```

### Show all containers
```
docker ps --all
doker container ls -all
```

### Show Formatting
```
docker container ls -a --format '{{.ID}}: {{.Image}}: \t{{.Status}}'
docker container ls -a --format 'table {{.ID}}\t{{.Image}}\t{{.Command}}\t{{.Status}}'
```

### Start container
```
docker start container <container-id>
docker start container --attach <container-id> // attach terminal
```

### See container logs
```
docker container logs <container-id>
```

### Run docker container shortly from image
```
docker run hello-world:linux
```
docker run = docker container create + docker container start + docker container attach

### Stop container
```
docker container stop <container-id>
```

### Force stop container
```
docker container kill <container-id>
```

### Delete container
```
docker container rm <container-id>
```

<br>

## Docker Image Commands:

### Pull docker image from docker hub
```
docker pull hello-world:linux
docker image pull hello-world:linux
```

### Show docker images
```
docker images
docker image ls
docker image ls -a
```

### Remove docker images
```
docker image rm <image-id>
docker rmi <image-id>
docker rmi $(docker images | grep "<none>")
```

<br>

## Create & Run Docker Image:

```
cd first-image
docker build -t our-first-image .
```
Given challenge to run this image

<br>

### Run created docker image
```
docker run our-fist-image
```

### Create image using flags
```
docker build --file server.Dockerfile --tag our-first-server .
```
Run this image and given challenge to exit it.

<br>

### Run docker image on detach mode
```
docker run -d our-first-server
```

### Run docker image on attach mode
```
docker run -it our-first-server
```

### Run command from inside container
```
docker exec <container-id> date
docker exec <container-id> bash -c "date"
```

### Insert into the container then run command from container
```
docker exec --interactive --tty <container-id> bash
docker exec --it <container-id> bash
```

<br>

## Container Name & Port:
buid an nginx image and run a web server using docker port

### Build docker image:
```
cd first-webserver
docker build -t first-webserver/latest .
```

### Run container using name and port:
```
docker run -d --name my-server -p 8080:80 -e VERSION=v3 first-webserver/latest
```

### Auto remove after exit container
```
docker run -it --rm --name my-server -p 8080:80 -e VERSION=v3 first-webserver/latest
```

## Container Volumes
Volumes allow to save data from continer and share data with container. Docker uses the local volume driver by default. When a volume is into a container, docker transparently maps a folder into a mound point within the container. Docker managed create and present folder by the volume driver.

### **See Volumes:**
```
docker volume ls
```

### **Create Volumes:**
```
docker volume create <volume-name>
```

### **Mounted Volume:**
```
docker run -it --name my-db -v <volume-name>:/data/db -p 27017:27017 --rm mongo/latest
```
```
docker run -it --name my-db --mount 'type=volume,source=<volume-name>,destination=/data/db -p 27017:27017 --rm mongo/latest
```

### **Bind Mount Volume:**
Biind mounts maps directories on computer to directories in containers.
```
docker run -it --name my-server --v $(pwd):/var/www/html -p 8080:80 --rm first-webserver/latest
```
```
docker run -it --name my-server --mount 'type=bind,src="$(pwd)"/,target=/var/www/html -p 8080:80 --rm first-webserver/latest
```

<br>

## Container Network:
Docker has network model/package to connecting containers with each other into the outside world.

Docker container uses the bridge docker network by default. The bridge network driver connects docker containers to a virutal bridge network installed on the machine.

### Bridge Network:
A bridge network is a virtual network device that connects multiple networks together into a single network. Its very usefull to taking traffic from a real network adapter and forwarding it to the virtual network adapters.

### **See Networks:**
```
docker network ls
```

### **Create Network:**
```
docker network create network-a
```

### **Inspect Network:**
```
docker network inspect network-a
```

### **Create Container with Network:**
```
docker container create -it --name container-a --net network-a --entrypoint sh curlimages/curl
```

### **Create & Run Container with Network:**
```
docker container run -it --name container-b --net network-b --entrypoint sh curlimages/curl 
```

### **Connect Container with Network:**
```
docker network connect network-a container-b
```

### **Publish Network Port:**
```
docker container run -it --name container-b --net network-b --publish 8080:80 --entrypoint sh curlimages/curl 
```

## Practice:
Create two networks called network-a and newtwork-b then create two containers using those networks. Next ping one container from other container like vice versa. If not able to ping each other then connect those two containers under one network. Then try again ping each containers.


<br>

# Dockerfile:
The dockerfile is a language for easily building container images. Dockerfile is the name of the language as well as the default name of the file that docker looks for when creating container images.
Every docker file consist of a series of instructions.

### Example:
```
FROM ubuntu
LABEL maintainer="Tarek Monjur <engr.tarekmonjur@gmail.com>"
USER root
COPY ./entrypoint.bash /
RUN apt -y update
RUN apt -y install curl bash
RUN chmod 755 /entrypoint.bash
USER nobody
EXPOSE 8080
ENTRYPOINT [ "/entrypoint.bash" ]
```
Docker runs each Dockerfile command in an `intermediate container` and saves the result as an image layer.
[Here is the full example](https://github.com/tarekmonjur/docker/tree/master/first-image) of simple docker project.

<br>

## Build you first image from the Dockerfile:
### Create a Dockerfile:
```
FROM nginx:latest
COPY ./run.sh .
RUN chmod 755 ./run.sh
CMD [ "./run.sh" ]
```
### Run below command:
```
docker image build .
```
### Build image with tag/image name
```
docker image build -t first-image .
```

### Short build command
```
docker build -t tarekmonjur/first-image:latest .
```
[Here is the full example.](https://github.com/tarekmonjur/docker/tree/master/first-webserver)

<br>

## Exploring Dockerfile Command:

### **FROM Command:**
The FROM command describes the `base` image that is Dockerfile's image will be created from. This command must be the first command in the Dockerfile.
```
FROM $image:$tag as $name
# like as
FROM ubuntu
# Or by choose tag
FROM ubuntu:latest
# Or by given name
FROM ubuntu:latest as base
```
We can also use
```
FROM scratch
```
to create our own base image.

### **COPY Command:**
Copy command copies/adds files and directories into docker image from provided context.
```
COPY $src-file $dest-file
COPY $src-file $dest-dir
COPY $src-dir $dest-dir
# Like as
COPY ./my-file.txt /app/my-file.txt
COPY ./my-file.txt /app/
COPY ./my-dir /app/
COPY . ./app
# Using Wildcard
COPY ./assets/image-?.png /assets
COPY ./assets/image* /assets
```

### **RUN Command:**
Run command use for customize the docker image. Run command run shell command within temporary containers.
```
RUN apt -y install curl bash
```

### **ENTRYPOINT Command:**
ENTRYPOINT configures container to run stuff, Basically its confiures the container image to run an application.
```
ENTRYPOINT ["put command here"]
```
ENTRYPOINT can't not be overwriten by container run. You can using shell form for entrypoint, But best option to use exec form like this.

### **CMD Command:**
CMD is very simillar to ENTRYPOINT. Configure container to run staff, also to run application on startup.
```
CMD ["put command here"]
```
```
ENTRYPOINT ["/app/run.sh"]
CMD ["--argument"]
```
CMD is the best suited for porviding default arguments an ENTRYPOINT. CMD can be overwriten by container run.

## **ENV & ARG Command:**
we can allow user to change and set values on the image build or container run time.
```
FROM ubuntu
WORKDIR /app
ARG curl_version=curl
ENV port=8080
RUN apt -y update
RUN apt -y install "$curl_version" bash
COPY . /app
EXPOSE $port
CMD [ "--argument" ]
ENTRYPOINT [ "/app/run.sh" ]
```

### **Build Argument (ARG) Command:**
Build argemtn are variables that we provide to docker build. We can set build arguments with the ARG instruction. ARG allows to set a variable at docker build time.
```
ARG curl_version=curl
RUN apt -y install "$curl_version"
```
Set ARG variable with ```docker build``` with the ```--build-arg``` flag
```
docker build --build-arg curl_version="curl=7.8.0" -t my-test-image .
```

### **ENV Command:**
ENV use to confiurges environment variables for containers started from the image.
```
docker run --name my-test -e port=8000 --rm my-test-image
docker run --name my-test -env port=8000 --rm my-test-image
```

### Difference ENV vs ARG:
* **ENV variables live with every containers - ARG variable do not**
* **Can set ARG variables at build time - Can overwirte ENV variable at run time**
* **Cann't overwrite ENV variables at build time**

### **WORKDIR Command:**
WORKDIR command allow you to confiurge a working directory for run commands.
Can be use multiple times to change the working directory while building image.
The last working directory will be used by containers.
```
WORKDIR /
RUN PWD
WORKDIR /app
```

### **USER Command:**
Set the user to be used for RUN commands, can be used multiple time and the last user will be used by containers.
```
USER root
RUN apt -y update && apt -y install curl bash
RUN useradd -p secret newuser
USER newuser
ENTRYPOINT [ "/app/run.sh"] 
```

### **EXPOSE Command:**
Expose port that container created from image. 
```
EXPOSE 3000
```

<br>

# Multi Stage Dockerfile:
Multi-stage builds use intermediate images to produce smaller final images. Multi-stage builds can use multiple base image. Each group of commands under a base image is called a stage. You can copy files or directories from one stage to another stage by using `--from` COPY flag.

```
FROM ubuntu AS base
ENV curl_bin="curl"
RUN apt -y update && apt -y install "$curl_bin"
RUN date >> '/tmp/date.txt'

FROM bash
COPY . /app
COPY --from=base /tmp/date.txt /app/include/date.txt
ENTRYPOINT [ "/usr/local/bin/bash", "/app/app.sh" ]
CMD [ "--argument" ]
```
[Here is an example](https://github.com/tarekmonjur/docker/blob/master/backend/Dockerfile)

<br>

# Docker Hub:
Dccker hub is docker image registry where we can push our image and use it later like other docker images.
Go to [Docker HUB](https://hub.docker.com) and create a docker account.

## Login Docker
User the below command to login docker hub.
```
docker login
```

### Create image tag
```
docker tag my-server tarekmonjur/test-server:0.0.1
```

### Push image to docker hub
```
docker push tarekmonjur/test-server:0.0.1
```

<br>

# Docker Compose:
Its a tool that allow you to manage multiple containers.

## Running backend project using docker compose:

### First run mongodb service
```
cd backend
docker-compose -d up mono
```

### Secondly build and run app service
```
cd backend
docker-compose -d up app
```

### Check running containers
```
cd backend
docker-compose ps
```

### Running Frontend and Backend project using docker compose:
```
version: '3'

services:
  backend:
    container_name: "docker-backend"
    build:
      context: ./backend
      dockerfile: Dockerfile
      target: dev
    working_dir: /app
    command: npm run start-dev
    depends_on:
      - mongo
    ports:
      - 4001:4000
    volumes:
      - ./backend/:/app
    environment:
      PORT: 5000

  mongo:
    container_name: "docker-mongo"
    image: mongo
    volumes:
      - ./backend/data:/data/db
    ports:
      - 27018:27017

  frontend:
    image: node:alpine
    container_name: "dockder-frontend"
    working_dir: /app
    command: npm run start
    ports:
      - 3000:3000
    volumes:
      - ./frontend:/app  
```

### [Docker compose examples](https://github.com/tarekmonjur/docker-example)

<br>

# Docker Swarm
* **Its a tool that installed and enabled by default with Docker**
* **Allow to manage clusters of nodes**
* **Virtual or physical machines are nodes**
* **Features such as load balancing**
* **A cluster contains nodes and nodes contains containers**

## Start Swarm:
### Run swarm init commond
```
docker swarm init
```

### Swarm Stack
```
docker stack deploy -c docker-compose.yml my-test-stack
```

### Create service from image
```
docker servcie create --replicas 1 --name servicename <image> ping docker.com
```


