FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.23.3-alpine
COPY --from=builder /app/dist /usr/share/nginx/html