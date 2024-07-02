FROM ubuntu:22.04


# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl ruby-full ruby-dev make build-essential git \
    && apt-get -y autoclean

RUN gem install compass

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.17.1

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# confirm installation
RUN node -v
RUN npm -v

RUN mkdir /usr/app

WORKDIR /usr/app
# Bundle app source
COPY . /usr/app
RUN npm i
RUN npm install bower -g
RUN bower install --allow-root
# Install app dependencies
EXPOSE  9000

CMD ["node_modules/.bin/grunt","server"]
