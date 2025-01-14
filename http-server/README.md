# Sample HTTP-Server

This server includes [sample data](db.json) that HTTP clients can request and modify. It allows also to provide static resources for download.
This is based on [JSON Server](https://github.com/typicode/json-server).

To run the server and fetch the data, just use this command:

```bash
npm run server
# open http://localhost:3000 in the browser or fetch data using curl_
curl -i http://localhost:3000/receipts
```
