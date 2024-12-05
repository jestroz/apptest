# APPTEST
# ci-test
## DevOps testing app using Bun/Elysia

### This app is built for testing purposes on Docker and Kubernetes.

---

## Configuration Envs
These environment variables are required to run the application:

- `PORT`: Port for the web service (default: 8080).
- `NODE_ENV`: Application environment (`development`, `testing`, `production`), default is `development`.
- `DB_URI`: Full PostgreSQL connection string, including host, user, password, and database name.


---



## Usage with Docker:

### Build the Docker image:
```bash
$ docker build . -t apptest:multistage  
```

DataBase required, docker example and db running on same virtual network

Run a PostgreSQL container:

` $ docker run -d --rm -e POSTGRES_DB=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -p 5432:5432 --name postgres-svc --network net-test postgres:14-alpine `

Then run the App image with environment variables:

` $ docker run -d --rm -e DB_URI='postgresql://postgres:postgres@192.168.100.35:5432/postgres' -e PORT=8080 -e NODE_ENV=development --name apptest --network net-test -p 8080:8080 apptest:multistage
`

---

Kubernetes Resources for apptest

This project deploys a simple web application (apptest) along with a PostgreSQL database into a Kubernetes cluster. Below is a breakdown of the resources used, including ConfigMaps, Secrets, Deployments, Services, and an Ingress.
1. **ConfigMap** (`apptest-configmap.yaml`):
   Stores environment variables for both the application and the database.

2. **Secret** (`apptest-secret.yaml`):
   Contains sensitive information like the database username and password in Base64 format.

3. **PostgreSQL Deployment and Service** (`postgres-deployment-svc.yaml`):
   - Deploys a single instance of PostgreSQL (`postgres:14-alpine`), exposing port **5432**.
   - The app connects to this service (`postgres-svc`) internally.

4. **Application Deployment** (`apptest-deployment.yaml`):
   - Deploys the web app from the image `aioria84/apptest-devops:v3`.
   - Includes **liveness** and **readiness probes** for health checks.

5. **Application Service** (`apptest-service.yaml`):
   Exposes the app internally on port **8080** for use within the cluster.

6. **Ingress** (`apptest-ingress.yaml`):
   Routes external traffic to the app via HTTP on port **8080**.

### Directory with manifests

```
k8s/
├── apptest-configmap.yaml        # Stores environment variables for the app and database (non-sensitive).
├── apptest-deployment.yaml       # Deployment configuration for the apptest web application, including probes and DB connection.
├── apptest-ingress.yaml          # Ingress rules to expose the apptest service externally via HTTP.
├── apptest-secret.yaml           # Contains sensitive data (e.g., DB username/password) used by the app and PostgreSQL.
├── apptest-service.yaml          # Service to expose the apptest application internally within the cluster on port 8080.
└── postgres-deployment-svc.yaml  # Deployment and Service configuration for the PostgreSQL database (including environment variables).

```
---

### The configmap is preconfigured with the default variables, they are set in the database.
 To start simply execute:

`$ kubectl apply -f k8s/`

---

## Test APP

### For the default app:
` $ curl http://localhost/`
- It returns a simple: ` "hello": "world" `

### Health checks:
` $ curl http://localhost/status/health `
- For status app start, if ok it returns: ` "health":"ok" `

` $ curl http://localhost/status/ready `

- For status app ready to recive traffic, if ok it returns: ` "ready":true `

### Test data insert:

`$ curl -X POST http://localhost/posts/create -H "Content-Type: application/json"\
    -d '{"title": "My First Post", "content": "This is the content of the first post"}' `

### Get data:
```$ curl http://localhost/posts ```
