# Run server
- Run and create data file (bytes)
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