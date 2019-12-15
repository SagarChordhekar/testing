FROM node:8.9.4
# alpine -- for downloading limited dependancies 

# Change working directory
WORKDIR "/Xpress-Connect-WEB-APP"

# Update packages and install dependency packages for services
# RUN apt-get update \
#  && apt-get dist-upgrade -y \
#  && apt-get clean \
#  && echo 'Finished installing dependencies'

# Install npm production packages 
COPY package.json /Xpress-Connect-WEB-APP/
RUN cd /Xpress-Connect-WEB-APP; npm install

COPY . /Xpress-Connect-WEB-APP

ENV NODE_ENV production
ENV PORT 4200

EXPOSE 4200
EXPOSE 4201


CMD ["npm", "start"]
