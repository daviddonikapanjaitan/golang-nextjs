FROM golang:1.17

WORKDIR /app
COPY go.mod .
COPY go.sum .
COPY air.conf .
COPY ./src .
COPY main.go .

RUN go mod download
RUN go get -u github.com/cosmtrek/air

# RUN curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

CMD ["air"]

EXPOSE 8000