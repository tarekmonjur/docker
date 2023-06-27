FROM ubuntu

LABEL maintainer="Tarek Monjur <engr.tarekmonjur@gmail.com>"

USER root

COPY ./entrypoint.bash /

RUN apt -y update
RUN apt -y install curl bash
RUN chmod 755 /entrypoint.bash

USER nobody

ENTRYPOINT [ "/entrypoint.bash" ]
