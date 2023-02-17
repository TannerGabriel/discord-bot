FROM node:18 AS build
WORKDIR /app
COPY . /app
COPY --from=mwader/static-ffmpeg:5.1.2 /ffmpeg /ffmpeg
RUN npm ci --omit=dev
RUN apt update && \
    apt install -y upx && \
    upx -1 /ffmpeg

FROM gcr.io/distroless/nodejs18
WORKDIR /app
COPY --from=build /app /app
COPY --from=build /ffmpeg /bin/
USER nonroot
CMD [ "index.js" ]
