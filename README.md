# Postgress docker-compose
```
version: '3.8'
services:
  db:
    container_name: posgres
    image: postgres
    environment:
      POSTGRES_PASSWORD: 123
    restart: always
    ports:
      - "5432:5432"
```
- employee table
```
create table public.employee
(
    id         integer not null
        constraint employee_id_pk
            primary key,
    email      varchar,
    first_name varchar,
    last_name  varchar
);

alter table public.employee
    owner to postgres;
```
- employee_byte table
```
create table public.employee_byte (
  id integer primary key not null,
  data bytea
);
```

# Run server
- Run and fill up employee_byte table
```
node server -s
```

- Just run the sever
```
node server 
```

# Run client
- 
```
node client
```

# Some documentation

- https://www.freecodecamp.org/news/what-is-grpc-protocol-buffers-stream-architecture/


- I gotta use protocol buffres to create the bytes
NodeJs
https://www.npmjs.com/package/protobufjs
I gotta use the .encode() method
Java
https://www.baeldung.com/google-protocol-buffer
- After that storagin 
- To retrive information I hava to find the data from the storage
- Send the data (bytes) using gRpc
https://nodejs.org/api/stream.html#class-streamwritable
the Writable.write can receive <Uint8Array>

- https://snyk.io/blog/building-a-secure-api-with-grpc