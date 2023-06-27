FROM nginx:latest

ARG VERSION;
ENV VERSION=${VERSION}

COPY ./run.sh .
RUN chmod 755 ./run.sh

CMD [ "./run.sh" ]
