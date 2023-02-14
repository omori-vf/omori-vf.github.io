FROM node:lts AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.23.3
COPY --from=builder /app/dist /usr/share/nginx/html