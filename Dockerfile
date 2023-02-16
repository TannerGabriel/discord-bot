FROM node:18 AS build
WORKDIR /app
COPY . /app
RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs18
WORKDIR /app
COPY --from=build /app /app
COPY --from=mwader/static-ffmpeg:5.1.2 /ffmpeg /bin/
USER nonroot
CMD [ "index.js" ]
