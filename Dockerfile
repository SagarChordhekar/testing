FROM node:12.13.1
# alpine -- for downloading limited dependancies 
# Change working directory
RUN mkdir /ICICI_UI
RUN apt-get update
WORKDIR "/ICICI_UI"
RUN apt-get -y install supervisor && \
  mkdir -p /var/log/supervisor && \
  mkdir -p /etc/supervisor/conf.d
ADD ICICI_UI/supervisor.conf /etc/supervisor.conf
# Update packages and install dependency packages for services
# RUN apt-get update \
#  && apt-get dist-upgrade -y \
#  && apt-get clean \
#  && echo 'Finished installing dependencies'

# Install npm production packages 
COPY  ICICI_UI/ /ICICI_UI
#COPY ICICI_UI/package.json /ICICI_UI/
RUN cd /ICICI_UI
RUN npm install
RUN npm install -g @angular/cli
RUN ng build --prod
ENV NODE_ENV production
ENV PORT 4200
EXPOSE 4200
RUN echo "working "
#CMD ["npm", "start"]
CMD ["supervisord", "-c", "/etc/supervisor.conf"]
