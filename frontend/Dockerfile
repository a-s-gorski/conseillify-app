FROM node:19-alpine
ADD frontend/frontend app
WORKDIR /app
RUN npm install
RUN npm install -g serve
RUN npm run build
CMD ["serve", "-s", "build"]
