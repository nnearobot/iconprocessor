# Icon Processor and Storage API

This is a simple icon storage API that implements the functions listed below:

- Upload an image file.
- Process the uploaded file and create a 100x100px thumbnail in a long-running job.
- List all jobs with their respective IDs and statuses.
- Fetch information about a job by its ID.
- Fetch a thumbnail file.


## Building the Production Server

To quickly launch the production version, we use a Docker container based on the node:20 image. The production server operates on port 8000.


### Initial Launch

For building an image for the first time, execute:

```bash
make build
```


### Stopping the Server

To stop the server, execute:

```bash
make stop
```


### Starting the Server

To start the server again, execute:

```bash
make start
```

## Testing Endpoints

You can test this API using tools like Postman.

### Endpoints:

**Upload an image:** [http://localhost:8000/images](http://localhost:8000/images)

- Method: POST
- Body: form-data
- Key: **image**, file

**List all jobs:** [http://localhost:8000/jobs](http://localhost:8000/jobs)

- Method: GET

**Check a job status:** [http://localhost:8000/jobs/:id](http://localhost:8000/jobs/:id)

- Method: GET
- Params: **id**, number


Additionally, for testing purposes, an endpoint to delete a job has been provided:  [http://localhost:8000/jobs/:id](http://localhost:8000/jobs/:id)

- Method: DELETE
- Params: **id**, number




## About this API
This API is built with the **Express** framework on Node.js and uses the **Typescript** language. Express is the most popular Node web framework that provides a set of common utilities for building servers and web applications. Express is free and open-source under the MIT license, so we won't have to spend any money on it. Additionally it has a great performance for web applications.

The API implements a job queue using the **Bull** module and a **Redis** database. Additionally, the **Multer** module is used for file uploading.

The API server runs in its own container, while a processing images in the job queue worker runs in another container.



### Directory structure

| Directory | Description |
| ----------- | ----------- |
| `config/` | Contains configuration files for this project |
| `dist/` | Contains *javascript* files for production server (created by running `npm run tsc`) |
| `node_mobules/` | Contains all the modules used in this API |
| `public/` | Houses processed thumbnails |
| `src/` | Contains *typescript* files of the API's source code |
| `test/` | Contains unit tests |
| `uploaded/` | Stores uploaded files |


### Uploading Images

In the current version of the API, only one image can be uploaded at a time as per the technical specification.

To emulate a long-running job, a specific piece of code has been added to the `./src/worker.ts` file:

```javascript
    let counter = 0;
    for (let i = 0; i < 10_000_000_000; i++) {
      counter++;
    };
```

After uploading the image to the `./uploaded` directory, a job with the image's filename is created in the queue. The worker processes this job, creates a thumbnail in the `./public` directory, and then deletes the original file to save storage space.


## Testing

The **Jest** testing framework is used for testing purposes due to its simplicity, ease of implementation, and power.

All tests are located in the `./test` directory.

Image process testing has been implemented in this assignment.

To run tests, execute:

```bash
npm run test
```



## Potential Improvements

As the purpose of this API is to upload an image and create an icon thumbnail for it, it would be beneficial to enable the upload of not just a single image at a time, but a collection of images as an icon pack.

We could upgrade the uploading endpoint to accept multiple images in one request and add all of them to a single job in the queue. As jobs are long-running processes, this method of image processing aligns perfectly with the API requirements.

We could also implement more comprehensive tests for the queue and all endpoints.

For the production server, we could use Nginx as a reverse proxy in front of the Node.js application.

To scale this application, we could create multiple container nodes and use a load balancer (Nginx is an excellent choice for this purpose).


## Developing mode

For development purposes, you should run `npm install` for dependency management. Then, from the application root directory, run:

```bash
npm run dev
```
Developing server operates on port 3030: [http://localhost:3030/](http://localhost:3030/)


