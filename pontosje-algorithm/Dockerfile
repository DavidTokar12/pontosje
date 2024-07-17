FROM mcr.microsoft.com/devcontainers/python

RUN pip install poetry

ARG DOCKER_USERNAME
ARG DOCKER_PASSWORD

RUN set -x \
    \
    echo "Install Docker" \
    && apt-get update -y \
    && apt-get install docker.io -y \
    && apt-get clean \
    && usermod -aG docker vscode

CMD [ "/bin/bash" ]