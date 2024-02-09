FROM node:20 AS build
WORKDIR /app
COPY . /app
COPY --from=mwader/static-ffmpeg:5.1.2 /ffmpeg /ffmpeg
RUN npm ci --omit=dev
RUN apt update && \
  apt install -y wget xz-utils && \
  wget https://github.com/upx/upx/releases/download/v3.96/upx-3.96-amd64_linux.tar.xz && \
  tar -xf upx-3.96-amd64_linux.tar.xz && \
  mv upx-3.96-amd64_linux/upx /usr/local/bin/
RUN upx -1 /ffmpeg

FROM gcr.io/distroless/nodejs20
WORKDIR /app
COPY --from=build /app /app
COPY --from=build /ffmpeg /bin/
USER nonroot
CMD [ "index.js" ]
