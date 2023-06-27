### Creating a Docker image using a Dockerfile

```
docker build . -t tarekmonjur/test:latest
```

### Run docker image that create a docker container
```
docker run -rm --name test -p 8081:80 -e VERSION=v3 tarekmonjur/test:latest
```

### Test the app
```
curl localhost:8081/version/
curl localhost:8081/version/
```

### Then finaly clean up
```
// stop container
docker stop test

// remove docker image
docker rmi tarekmonjur/test:latest
```


