# Database connections

A DeepSeek Harness bundle that owns database connection settings, managed
connection pools, health checks, and automatic reconnects for PostgreSQL,
Redis, MinIO, and the vector-store fallback Milvus. Open **Settings → Plugins**,
open the **Database connections** bundle, and edit its form.

## Configuration

All fields live in the plugin's volatile Config, so saving reconnects only the
pools whose settings changed:

| Service | Fields |
| --- | --- |
| PostgreSQL | host, port, user, password, database, TLS |
| Vector store | `postgresqlSupportsVector`; when false, Milvus address, user, password, database |
| Redis | host, port, ACL user, password, database index |
| MinIO | endpoint host, port, TLS, access key, secret key, bucket |
| Pools | PostgreSQL pool size, Redis min/max, socket limit, idle/connect timeouts, health interval, reconnect backoff |

Passwords and secret keys use the `secret` role. They never cross the settings
wire to the browser; the form writes a new value only when one is entered, and
each field has a **Clear saved value** action.

The two vector-store states are exclusive: with PostgreSQL selected, Milvus
stays disabled and `getMilvusClient()` refuses; without it, Milvus is the active
vector store.

## Service API

Other plugins inject the service once:

```ts
import type {} from 'dsh-database-config'

export const inject = ['database']
```

### Status and lifecycle

```ts
const snapshot = ctx.database.status()
// { checkedAt, connections: { postgresql, redis, minio, milvus } }
// Each entry: phase, healthy, attempts, latencyMs, lastError, nextRetryAt, pool

await ctx.database.check()                 // check all active backends
await ctx.database.check('postgresql')     // check one backend
await ctx.database.connect()               // clear an explicit disconnect
await ctx.database.reconnect('redis')      // close and rebuild one pool now
await ctx.database.disconnect('minio')     // close and stop auto-reconnect
```

`status()` performs no I/O. The Host probes every active backend on the
configured interval, and a failure schedules exponential-backoff retries up to
the configured maximum. A successful call resets the attempt count. The
`database/status` Cordis event publishes the same snapshot on each change:

```ts
ctx.on('database/status', snapshot => {
  if (!snapshot.connections.postgresql.healthy) {
    // render a warning or pause dependent work
  }
})
```

### Pooled access

```ts
// PostgreSQL: one leased client, always returned to the pool
const rows = await ctx.database.query('select id from jobs where state = $1', ['queued'])
await ctx.database.withPostgres(async client => {
  await client.query('insert into audit(message) values ($1)', ['started'])
})

// Redis: the v6 client pool leases a client for the callback
await ctx.database.withRedis(client => client.set('queue:ready', '1'))

// MinIO: keep-alive transport agent owned by the plugin
await ctx.database.withMinio(client => client.bucketExists('uploads'))

// Milvus: the SDK's gRPC channel pool
await ctx.database.withMilvus(client => client.getVersion())
```

Advanced callers can take the pool itself with `getPostgresPool()` or
`getRedisPool()`, or the SDK clients with `getMinioClient()` and
`getMilvusClient()`. Use `with*` where possible so a broken connection triggers
the manager's probe and retry path.

## Pools and reconnects

- PostgreSQL uses `pg.Pool` with the configured maximum and idle timeout.
- Redis uses the Redis v6 client pool with configured minimum/maximum clients.
- MinIO uses a keep-alive HTTP(S) agent with the configured socket limit.
- Milvus passes its connection limit into the SDK's channel pool.
- A dead pool is closed and recreated; requests fail fast instead of queuing
  on a dead socket.
- Saving the plugin form emits `settings/document-updated`; the Host detects
  changed fingerprints and reconnects the affected pools immediately.

## Local Docker databases

The plugin can provision the databases it connects to as local Docker
containers. Enable it in the profile bundle configuration:

```yaml
- id: database-config
  name: dsh-database-config
  config:
    postgresql: { host: 127.0.0.1, port: 5432, user: postgres, password: postgres, database: postgres }
    redis: { host: 127.0.0.1, port: 6379 }
    minio: { endPoint: 127.0.0.1, port: 9000, accessKey: admin, secretKey: jlc1234! }
    local:
      enabled: true
      # Host directory for the containers' data; empty uses <DSH_HOME>/dsh-database/data.
      dataDir: /root/CODE/dsh-database/data
      startOnLoad: true
      stopOnUnload: true
      services: { postgresql: true, redis: true, minio: true, milvus: true }
```

On load the plugin renders a Compose file into `dataDir/compose.yml`, runs
`docker compose up -d --remove-orphans`, and waits for the published ports.
PostgreSQL, Redis, and MinIO always start when their switch is on; Milvus
starts only while it is the selected vector store. On unload the plugin runs
`docker compose stop` and leaves the containers in place.

Every service writes into a host bind mount:

| Service | Host directory |
| --- | --- |
| PostgreSQL | `<dataDir>/postgres` |
| Redis | `<dataDir>/redis` |
| MinIO | `<dataDir>/minio` |
| Milvus | `<dataDir>/milvus/data`, `<dataDir>/milvus/etcd`, `<dataDir>/milvus/minio` |

Stopping or removing a container therefore never removes the data. Point the
connection hosts at this machine (`127.0.0.1` or its LAN address); the Compose
file publishes the configured ports unchanged. The first start pulls the
images and can take several minutes. Container images are configurable under
`local.images`, and `local.composeTimeoutMs`/`local.startTimeoutMs` bound the
pull and readiness waits.

## Install

This package is shipped as a single-file `index.js`: PostgreSQL, Redis, MinIO,
and the Milvus SDK are bundled at build time, so the installed plugin needs no
`node_modules`. Build it from this source directory into the directory the
profile links:

```sh
cd /root/CODE/harness/workspace/dsh-database-config
node build.mjs /root/CODE/dsh-database
```

The output directory holds `index.js` plus the client half, locale files,
bundle patch, icon, and manifest. The profile dependency then points at it:

```json
{ "dsh-database-config": "link:/root/CODE/dsh-database" }
```

Bundling reads the driver packages from the source directory's `node_modules`,
so run `pnpm install --config.auto-install-peers=false` once before building.
The installed bundle itself needs no `node_modules`.

The bundle patch inserts the `database-config` row and the plugin page is
contributed through `plugins.bundle.config`.
