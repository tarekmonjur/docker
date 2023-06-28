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
### Images are the building blocks of the Docker world. You launch your containers from images. Images are the ”build” part of Docker’s life cycle. They are a layered format, using Union file systems, that are built step-by-step using a series of instructions. For example:

* Add a file.
* Run a command.
* Open a port.

You can consider images to be the ”source code” for your containers. They are highly portable and can be shared, stored, and updated.

<br/>

# Install Docker:
Follow docker doc [here](https://docs.docker.com/desktop/install).

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

## Container Name, Port & Volume:
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

### Share files using volume:
```
docker run -it --name my-server -v $(pwd):/var/www/html -p 8080:80 --rm first-webserver/latest
```

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
## [Docker compose examples](https://github.com/tarekmonjur/docker-example)


