FROM golang:1.15.8-alpine AS builder

WORKDIR /usr/src/app

COPY . .
RUN go build -ldflags "-s -w" /usr/src/app/hello.go

FROM scratch

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/hello .
CMD [ "./hello" ]