window.__ModuleLoader__.load({
  id: 'dsh-database-config',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useEffect, useState, useSyncExternalStore } = React

    const NS = 'database'
    const ENTRY_ID = 'database-config'
    const PACKAGE_NAME = 'dsh-database-config'

    const COPY = {
      en: {
        'page.title': 'Database connections',
        'page.intro': 'Connection details for the databases this profile uses. Changes take effect as soon as you save them.',
        'page.security': 'Passwords and secret keys are write-only. Leave a secret field blank to keep the saved value.',
        'page.poolHint': 'Pools, health checks, and automatic reconnects run in the Host. Other plugins can read database.status() or call database.reconnect().',
        'advanced.title': 'Pools and reconnects',
        'advanced.summary': 'Tune pool sizes, timeouts, health checks, and retry backoff.',
        'field.postgresMax': 'PostgreSQL pool size',
        'field.redisMin': 'Redis minimum clients',
        'field.redisMax': 'Redis maximum clients',
        'field.maxSockets': 'Socket limit',
        'field.idleTimeoutMs': 'Idle timeout (ms)',
        'field.connectTimeoutMs': 'Connect timeout (ms)',
        'field.healthCheckIntervalMs': 'Health check interval (ms)',
        'field.retryBaseMs': 'Initial reconnect delay (ms)',
        'field.retryMaxMs': 'Maximum reconnect delay (ms)',
        'error.poolSize': 'Enter an integer from 1 to 100',
        'error.socketLimit': 'Enter an integer from 1 to 200',
        'error.timeout': 'Enter a valid timeout in milliseconds',
        'error.retryOrder': 'Maximum delay must be at least the initial delay',
        'error.poolOrder': 'Redis minimum must not exceed maximum',
        'postgres.title': 'PostgreSQL',
        'postgres.subtitle': 'Primary relational database.',
        'postgres.vector': 'PostgreSQL supports vectors',
        'postgres.vectorHint': 'Use pgvector in PostgreSQL as the vector store.',
        'milvus.title': 'Milvus',
        'milvus.subtitle': 'Vector store used while PostgreSQL has no vector support.',
        'milvus.hint': 'Milvus settings stay saved even when PostgreSQL is selected.',
        'redis.title': 'Redis',
        'redis.subtitle': 'Cache and queue backend.',
        'minio.title': 'MinIO',
        'minio.subtitle': 'Object storage for buckets and stored files.',
        'field.host': 'Host',
        'field.port': 'Port',
        'field.user': 'User',
        'field.username': 'ACL user',
        'field.password': 'Password',
        'field.database': 'Database',
        'field.address': 'Address',
        'field.ssl': 'Use TLS',
        'field.useSSL': 'Use TLS',
        'field.db': 'Database index',
        'field.endPoint': 'Endpoint host',
        'field.accessKey': 'Access key',
        'field.secretKey': 'Secret key',
        'field.bucket': 'Bucket',
        'secret.placeholder': 'Leave blank to keep the saved value',
        'secret.clear': 'Clear saved value',
        'secret.clearPending': 'Will be cleared on save',
        'action.save': 'Save changes',
        'action.saving': 'Saving…',
        'action.revert': 'Discard changes',
        'state.loading': 'Loading connection settings…',
        'state.unavailable': 'This deployment does not expose the database settings namespace.',
        'state.readOnly': 'This profile is read-only.',
        'state.saved': 'Connection settings saved.',
        'state.failed': 'The settings were not saved. Check the values and try again.',
        'state.dirty': 'Unsaved changes',
        'state.clean': 'No unsaved changes',
        'error.required': 'Required',
        'error.port': 'Enter a port from 1 to 65535',
        'error.db': 'Enter a non-negative integer',
      },
      zh: {
        'page.title': '数据库连接',
        'page.intro': '配置此配置文件使用的数据库连接信息，保存后立即生效。',
        'page.security': '密码和密钥只写不读。密钥输入框留空表示保留已保存的值。',
        'page.poolHint': '连接池、健康检查和自动重连由 Host 服务维护；其他插件可读取 database.status() 或调用 database.reconnect()。',
        'advanced.title': '连接池与重连',
        'advanced.summary': '调整连接池大小、超时、健康检查和重连退避。',
        'field.postgresMax': 'PostgreSQL 连接池上限',
        'field.redisMin': 'Redis 最小连接数',
        'field.redisMax': 'Redis 最大连接数',
        'field.maxSockets': '套接字上限',
        'field.idleTimeoutMs': '空闲超时（毫秒）',
        'field.connectTimeoutMs': '连接超时（毫秒）',
        'field.healthCheckIntervalMs': '健康检查间隔（毫秒）',
        'field.retryBaseMs': '初始重连延迟（毫秒）',
        'field.retryMaxMs': '最大重连延迟（毫秒）',
        'error.poolSize': '请输入 1 到 100 之间的整数',
        'error.socketLimit': '请输入 1 到 200 之间的整数',
        'error.timeout': '请输入有效的毫秒超时',
        'error.retryOrder': '最大重连延迟不能小于初始延迟',
        'error.poolOrder': 'Redis 最小连接数不能大于最大连接数',
        'postgres.title': 'PostgreSQL',
        'postgres.subtitle': '主要关系型数据库。',
        'postgres.vector': 'PostgreSQL 支持向量',
        'postgres.vectorHint': '使用 PostgreSQL 中的 pgvector 作为向量存储。',
        'milvus.title': 'Milvus',
        'milvus.subtitle': 'PostgreSQL 不支持向量时使用的向量数据库。',
        'milvus.hint': '即使选择了 PostgreSQL，Milvus 的配置也会继续保存。',
        'redis.title': 'Redis',
        'redis.subtitle': '缓存与队列服务。',
        'minio.title': 'MinIO',
        'minio.subtitle': '用于存储桶和文件的对象存储。',
        'field.host': '主机',
        'field.port': '端口',
        'field.user': '用户名',
        'field.username': 'ACL 用户名',
        'field.password': '密码',
        'field.database': '数据库名',
        'field.address': '地址',
        'field.ssl': '启用 TLS',
        'field.useSSL': '启用 TLS',
        'field.db': '数据库编号',
        'field.endPoint': '服务地址',
        'field.accessKey': 'Access Key',
        'field.secretKey': 'Secret Key',
        'field.bucket': 'Bucket',
        'secret.placeholder': '留空表示保留已保存的值',
        'secret.clear': '清除已保存值',
        'secret.clearPending': '保存后清除',
        'action.save': '保存更改',
        'action.saving': '正在保存…',
        'action.revert': '放弃更改',
        'state.loading': '正在读取数据库连接信息…',
        'state.unavailable': '当前部署未提供数据库配置命名空间。',
        'state.readOnly': '当前配置文件为只读。',
        'state.saved': '数据库连接信息已保存。',
        'state.failed': '保存失败，请检查输入后重试。',
        'state.dirty': '有未保存的更改',
        'state.clean': '没有未保存的更改',
        'error.required': '必填',
        'error.port': '请输入 1 到 65535 之间的端口',
        'error.db': '请输入非负整数',
      },
    }

    const PAGE_CSS = `
      .dsh-db {
        box-sizing: border-box;
        display: grid;
        gap: 16px;
        width: 100%;
        color: var(--dsw-alias-label-primary);
        font-size: 14px;
        line-height: 1.55;
      }
      .dsh-db-header {
        display: grid;
        gap: 4px;
      }
      .dsh-db-header h3 {
        margin: 0;
        font-size: 15px;
        line-height: 22px;
        font-weight: 600;
      }
      .dsh-db-intro {
        max-width: 680px;
        margin: 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 13px;
        line-height: 20px;
      }
      .dsh-db-security {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin: 0;
        padding: 10px 12px;
        border: 0.5px solid var(--dsw-alias-border-l1);
        border-radius: 10px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 18px;
      }
      .dsh-db-security-dot {
        flex: none;
        width: 6px;
        height: 6px;
        margin-top: 6px;
        border-radius: 50%;
        background: var(--dsw-alias-brand-primary);
      }
      .dsh-db-advanced {
        border: 0.5px solid var(--dsw-alias-border-l1);
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-1);
      }
      .dsh-db-advanced summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        color: var(--dsw-alias-label-primary);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        list-style: none;
      }
      .dsh-db-advanced summary::-webkit-details-marker {
        display: none;
      }
      .dsh-db-advanced summary::after {
        content: '+';
        flex: none;
        color: var(--dsw-alias-label-secondary);
        font-size: 16px;
        line-height: 1;
      }
      .dsh-db-advanced[open] summary::after {
        content: '−';
      }
      .dsh-db-advanced[open] summary {
        border-bottom: 0.5px solid var(--dsw-alias-border-l1);
      }
      .dsh-db-advanced-body {
        display: grid;
        gap: 12px;
        padding: 14px;
      }
      .dsh-db-advanced-hint {
        margin: 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 18px;
      }
      .dsh-db-card {
        display: grid;
        gap: 14px;
        padding: 16px;
        border: 0.5px solid var(--dsw-alias-border-l1);
        border-radius: 14px;
        background: var(--dsw-alias-bg-layer-1);
      }
      .dsh-db-card-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }
      .dsh-db-card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;
      }
      .dsh-db-badge {
        display: inline-flex;
        align-items: center;
        height: 18px;
        padding: 0 7px;
        border: 0.5px solid var(--dsw-alias-border-l2);
        border-radius: 999px;
        color: var(--dsw-alias-label-secondary);
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 10px;
        font-weight: 500;
        letter-spacing: .02em;
      }
      .dsh-db-card-sub {
        margin: 2px 0 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 18px;
      }
      .dsh-db-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 12px;
      }
      .dsh-db-field {
        display: grid;
        gap: 5px;
        min-width: 0;
      }
      .dsh-db-label {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 16px;
      }
      .dsh-db-input {
        box-sizing: border-box;
        width: 100%;
        height: 32px;
        min-width: 0;
        padding: 0 10px;
        border: 0.5px solid var(--dsw-alias-border-l2);
        border-radius: 7px;
        outline: none;
        background: var(--dsw-alias-bg-base);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 13px;
      }
      .dsh-db-input::placeholder {
        color: var(--dsw-alias-label-secondary);
        opacity: .75;
      }
      .dsh-db-input:focus-visible {
        border-color: var(--dsw-alias-brand-primary);
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent);
      }
      .dsh-db-input:disabled {
        opacity: .6;
      }
      .dsh-db-check-row {
        display: flex;
        align-items: center;
        height: 32px;
      }
      .dsh-db-check {
        width: 15px;
        height: 15px;
        margin: 0;
        accent-color: var(--dsw-alias-brand-primary);
      }
      .dsh-db-error {
        margin: 0;
        color: var(--dsw-alias-state-error-primary);
        font-size: 11px;
        line-height: 15px;
      }
      .dsh-db-hint {
        margin: 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 11px;
        line-height: 15px;
      }
      .dsh-db-secret-row {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .dsh-db-secret-row .dsh-db-input {
        flex: 1;
      }
      .dsh-db-clear {
        flex: none;
        height: 30px;
        padding: 0 9px;
        border: 0.5px solid var(--dsw-alias-border-l1);
        border-radius: 7px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 11px;
        cursor: pointer;
      }
      .dsh-db-clear:hover:not(:disabled) {
        border-color: var(--dsw-alias-border-l2);
        color: var(--dsw-alias-label-primary);
      }
      .dsh-db-clear:disabled {
        cursor: default;
        opacity: .55;
      }
      .dsh-db-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 12px 14px;
        border: 0.5px solid var(--dsw-alias-border-l1);
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-2);
      }
      .dsh-db-toggle-copy {
        display: grid;
        gap: 2px;
        min-width: 0;
      }
      .dsh-db-toggle-label {
        color: var(--dsw-alias-label-primary);
        font-size: 13px;
        line-height: 18px;
        font-weight: 500;
      }
      .dsh-db-toggle-hint {
        color: var(--dsw-alias-label-secondary);
        font-size: 11px;
        line-height: 16px;
      }
      .dsh-db-switch {
        position: relative;
        flex: none;
        width: 34px;
        height: 20px;
        padding: 0;
        border: 1px solid var(--dsw-alias-border-l2);
        border-radius: 999px;
        background: var(--dsw-alias-state-idle-primary);
        cursor: pointer;
        transition: background .15s ease, border-color .15s ease;
      }
      .dsh-db-switch::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--dsw-alias-bg-base);
        transition: transform .15s ease;
      }
      .dsh-db-switch[aria-checked='true'] {
        border-color: var(--dsw-alias-brand-primary);
        background: var(--dsw-alias-brand-primary);
      }
      .dsh-db-switch[aria-checked='true']::after {
        transform: translateX(14px);
      }
      .dsh-db-switch:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 2px;
      }
      .dsh-db-switch:disabled {
        cursor: default;
        opacity: .55;
      }
      .dsh-db-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        padding-top: 2px;
      }
      .dsh-db-spacer {
        flex: 1;
      }
      .dsh-db-button {
        height: 32px;
        padding: 0 14px;
        border: 0.5px solid var(--dsw-alias-border-l2);
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
      }
      .dsh-db-button:hover:not(:disabled) {
        background: var(--dsw-alias-bg-layer-2);
      }
      .dsh-db-button:disabled {
        cursor: default;
        opacity: .5;
      }
      .dsh-db-button-primary {
        border-color: var(--dsw-alias-brand-primary);
        background: var(--dsw-alias-brand-primary);
        color: var(--dsw-alias-bg-base);
      }
      .dsh-db-button-primary:hover:not(:disabled) {
        background: var(--dsw-alias-brand-primary);
        filter: brightness(1.04);
      }
      .dsh-db-status {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 18px;
      }
      .dsh-db-status[data-tone='success'] { color: var(--dsw-alias-state-success-primary); }
      .dsh-db-status[data-tone='error'] { color: var(--dsw-alias-state-error-primary); }
      .dsh-db-status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
      }
      .dsh-db-loading {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 13px;
      }
      @media (max-width: 640px) {
        .dsh-db-grid { grid-template-columns: minmax(0, 1fr); }
        .dsh-db-card { padding: 14px; }
        .dsh-db-actions { align-items: stretch; }
        .dsh-db-spacer { display: none; }
      }
    `

    const FIELDS = {
      postgresqlSupportsVector: ['postgresqlSupportsVector'],
      'postgresql.host': ['postgresql', 'host'],
      'postgresql.port': ['postgresql', 'port'],
      'postgresql.user': ['postgresql', 'user'],
      'postgresql.database': ['postgresql', 'database'],
      'postgresql.ssl': ['postgresql', 'ssl'],
      'redis.host': ['redis', 'host'],
      'redis.port': ['redis', 'port'],
      'redis.username': ['redis', 'username'],
      'redis.db': ['redis', 'db'],
      'minio.endPoint': ['minio', 'endPoint'],
      'minio.port': ['minio', 'port'],
      'minio.useSSL': ['minio', 'useSSL'],
      'minio.accessKey': ['minio', 'accessKey'],
      'minio.bucket': ['minio', 'bucket'],
      'milvus.address': ['milvus', 'address'],
      'milvus.username': ['milvus', 'username'],
      'milvus.database': ['milvus', 'database'],
      'pool.postgresMax': ['pool', 'postgresMax'],
      'pool.redisMin': ['pool', 'redisMin'],
      'pool.redisMax': ['pool', 'redisMax'],
      'pool.maxSockets': ['pool', 'maxSockets'],
      'pool.idleTimeoutMs': ['pool', 'idleTimeoutMs'],
      'pool.connectTimeoutMs': ['pool', 'connectTimeoutMs'],
      'pool.healthCheckIntervalMs': ['pool', 'healthCheckIntervalMs'],
      'pool.retryBaseMs': ['pool', 'retryBaseMs'],
      'pool.retryMaxMs': ['pool', 'retryMaxMs'],
    }

    const SECRETS = {
      postgresqlPassword: ['postgresql', 'password'],
      redisPassword: ['redis', 'password'],
      minioSecretKey: ['minio', 'secretKey'],
      milvusPassword: ['milvus', 'password'],
    }

    const DEFAULTS = {
      postgresql: { host: '127.0.0.1', port: '5432', user: 'postgres', database: 'postgres', ssl: false },
      postgresqlSupportsVector: false,
      milvus: { address: '127.0.0.1:19530', username: '', database: 'default' },
      redis: { host: '127.0.0.1', port: '6379', username: '', db: '0' },
      minio: { endPoint: '127.0.0.1', port: '9000', useSSL: false, accessKey: '', bucket: '' },
      pool: {
        postgresMax: '10',
        redisMin: '1',
        redisMax: '10',
        maxSockets: '20',
        idleTimeoutMs: '30000',
        connectTimeoutMs: '5000',
        healthCheckIntervalMs: '30000',
        retryBaseMs: '1000',
        retryMaxMs: '30000',
      },
    }

    /** Read a nested value without assuming the wire section has every key. */
    function valueAt(source, path) {
      let node = source
      for (const key of path) {
        if (node === null || typeof node !== 'object') return undefined
        node = node[key]
      }
      return node
    }

    /** Coerce one section into the form's string-valued draft. */
    function toDraft(value) {
      const section = value !== null && typeof value === 'object' ? value : {}
      const string = (path, fallback) => {
        const found = valueAt(section, path)
        return found === undefined || found === null ? fallback : String(found)
      }
      const boolean = (path, fallback) => {
        const found = valueAt(section, path)
        return typeof found === 'boolean' ? found : fallback
      }
      return {
        postgresql: {
          host: string(['postgresql', 'host'], DEFAULTS.postgresql.host),
          port: string(['postgresql', 'port'], DEFAULTS.postgresql.port),
          user: string(['postgresql', 'user'], DEFAULTS.postgresql.user),
          database: string(['postgresql', 'database'], DEFAULTS.postgresql.database),
          ssl: boolean(['postgresql', 'ssl'], DEFAULTS.postgresql.ssl),
        },
        postgresqlSupportsVector: boolean(['postgresqlSupportsVector'], DEFAULTS.postgresqlSupportsVector),
        milvus: {
          address: string(['milvus', 'address'], DEFAULTS.milvus.address),
          username: string(['milvus', 'username'], DEFAULTS.milvus.username),
          database: string(['milvus', 'database'], DEFAULTS.milvus.database),
        },
        redis: {
          host: string(['redis', 'host'], DEFAULTS.redis.host),
          port: string(['redis', 'port'], DEFAULTS.redis.port),
          username: string(['redis', 'username'], DEFAULTS.redis.username),
          db: string(['redis', 'db'], DEFAULTS.redis.db),
        },
        minio: {
          endPoint: string(['minio', 'endPoint'], DEFAULTS.minio.endPoint),
          port: string(['minio', 'port'], DEFAULTS.minio.port),
          useSSL: boolean(['minio', 'useSSL'], DEFAULTS.minio.useSSL),
          accessKey: string(['minio', 'accessKey'], DEFAULTS.minio.accessKey),
          bucket: string(['minio', 'bucket'], DEFAULTS.minio.bucket),
        },
        pool: {
          postgresMax: string(['pool', 'postgresMax'], DEFAULTS.pool.postgresMax),
          redisMin: string(['pool', 'redisMin'], DEFAULTS.pool.redisMin),
          redisMax: string(['pool', 'redisMax'], DEFAULTS.pool.redisMax),
          maxSockets: string(['pool', 'maxSockets'], DEFAULTS.pool.maxSockets),
          idleTimeoutMs: string(['pool', 'idleTimeoutMs'], DEFAULTS.pool.idleTimeoutMs),
          connectTimeoutMs: string(['pool', 'connectTimeoutMs'], DEFAULTS.pool.connectTimeoutMs),
          healthCheckIntervalMs: string(['pool', 'healthCheckIntervalMs'], DEFAULTS.pool.healthCheckIntervalMs),
          retryBaseMs: string(['pool', 'retryBaseMs'], DEFAULTS.pool.retryBaseMs),
          retryMaxMs: string(['pool', 'retryMaxMs'], DEFAULTS.pool.retryMaxMs),
        },
      }
    }

    /** Validate the string-valued draft into field-keyed messages. */
    function validate(draft, t) {
      const errors = {}
      const required = (key, value) => {
        if (value.trim() === '') errors[key] = t('error.required')
      }
      const port = (key, value) => {
        const number = Number(value)
        if (!Number.isInteger(number) || number < 1 || number > 65535) errors[key] = t('error.port')
      }
      const integer = (key, value, min, max, message) => {
        const number = Number(value)
        if (!/^\d+$/.test(value) || !Number.isInteger(number) || number < min || number > max) errors[key] = message
      }
      required('postgresql.host', draft.postgresql.host)
      required('postgresql.database', draft.postgresql.database)
      port('postgresql.port', draft.postgresql.port)
      required('redis.host', draft.redis.host)
      port('redis.port', draft.redis.port)
      if (!/^\d+$/.test(draft.redis.db)) errors['redis.db'] = t('error.db')
      required('minio.endPoint', draft.minio.endPoint)
      port('minio.port', draft.minio.port)
      if (!draft.postgresqlSupportsVector) required('milvus.address', draft.milvus.address)
      integer('pool.postgresMax', draft.pool.postgresMax, 1, 100, t('error.poolSize'))
      integer('pool.redisMin', draft.pool.redisMin, 1, 100, t('error.poolSize'))
      integer('pool.redisMax', draft.pool.redisMax, 1, 100, t('error.poolSize'))
      integer('pool.maxSockets', draft.pool.maxSockets, 1, 200, t('error.socketLimit'))
      integer('pool.idleTimeoutMs', draft.pool.idleTimeoutMs, 1000, 600000, t('error.timeout'))
      integer('pool.connectTimeoutMs', draft.pool.connectTimeoutMs, 500, 120000, t('error.timeout'))
      integer('pool.healthCheckIntervalMs', draft.pool.healthCheckIntervalMs, 1000, 600000, t('error.timeout'))
      integer('pool.retryBaseMs', draft.pool.retryBaseMs, 100, 60000, t('error.timeout'))
      integer('pool.retryMaxMs', draft.pool.retryMaxMs, 1000, 600000, t('error.timeout'))
      if (Number(draft.pool.redisMin) > Number(draft.pool.redisMax)) errors['pool.redisMax'] = t('error.poolOrder')
      if (Number(draft.pool.retryBaseMs) > Number(draft.pool.retryMaxMs)) errors['pool.retryMaxMs'] = t('error.retryOrder')
      return errors
    }

    function Field({ label, value, onChange, disabled, kind, placeholder, error }) {
      return h('label', { className: 'dsh-db-field' },
        h('span', { className: 'dsh-db-label' }, h('span', null, label), error === undefined ? null : h('span', { className: 'dsh-db-error' }, error)),
        h('input', {
          className: 'dsh-db-input',
          type: kind === 'number' ? 'number' : 'text',
          inputMode: kind === 'number' ? 'numeric' : undefined,
          value,
          placeholder,
          disabled,
          min: kind === 'number' ? 0 : undefined,
          spellCheck: false,
          autoComplete: 'off',
          'aria-invalid': error === undefined ? undefined : 'true',
          onChange: event => { onChange(event.currentTarget.value) },
        }))
    }

    function SecretField({ label, value, onChange, onClear, cleared, disabled, translate }) {
      return h('div', { className: 'dsh-db-field' },
        h('span', { className: 'dsh-db-label' }, h('span', null, label), cleared ? h('span', { className: 'dsh-db-hint' }, translate('secret.clearPending')) : null),
        h('div', { className: 'dsh-db-secret-row' },
          h('input', {
            className: 'dsh-db-input',
            type: 'password',
            value,
            placeholder: translate('secret.placeholder'),
            disabled,
            spellCheck: false,
            autoComplete: 'new-password',
            onChange: event => { onChange(event.currentTarget.value) },
          }),
          h('button', {
            type: 'button',
            className: 'dsh-db-clear',
            disabled: disabled || cleared,
            onClick: onClear,
          }, translate('secret.clear'))))
    }

    function CheckField({ checked, onChange, disabled, label }) {
      return h('label', { className: 'dsh-db-field' },
        h('span', { className: 'dsh-db-label' }, h('span', null, label)),
        h('span', { className: 'dsh-db-check-row' },
          h('input', {
            type: 'checkbox',
            className: 'dsh-db-check',
            checked,
            disabled,
            onChange: event => { onChange(event.currentTarget.checked) },
          })))
    }

    function Toggle({ checked, onChange, disabled, label, hint }) {
      return h('div', { className: 'dsh-db-toggle' },
        h('div', { className: 'dsh-db-toggle-copy' },
          h('span', { className: 'dsh-db-toggle-label' }, label),
          hint === undefined ? null : h('span', { className: 'dsh-db-toggle-hint' }, hint)),
        h('button', {
          type: 'button',
          role: 'switch',
          className: 'dsh-db-switch',
          'aria-checked': checked ? 'true' : 'false',
          'aria-label': label,
          disabled,
          onClick: () => { onChange(!checked) },
        }))
    }


    /** Render one field from the draft, with validation bound to its stable key. */
    function DraftField({ name, label, draft, update, errors, disabled, kind, placeholder }) {
      const path = FIELDS[name]
      const value = valueAt(draft, path)
      return h(Field, {
        label,
        value: value === undefined || value === null ? '' : String(value),
        onChange: next => { update(name, next) },
        disabled,
        kind,
        placeholder,
        error: errors[name],
      })
    }

    function DatabaseConfigForm(props) {
      const { form, t } = props
      const snapshot = useSyncExternalStore(
        listener => form.subscribe(listener),
        () => form.getSnapshot(),
        () => form.getSnapshot(),
      )
      const [draft, setDraft] = useState(() => toDraft(snapshot.value))
      const [secretDrafts, setSecretDrafts] = useState(() => ({ postgresqlPassword: '', redisPassword: '', minioSecretKey: '', milvusPassword: '' }))
      const [clearedSecrets, setClearedSecrets] = useState(() => ({}))
      const [dirty, setDirty] = useState(false)
      const [status, setStatus] = useState({ kind: 'idle' })
      const revisionRef = React.useRef(null)

      useEffect(() => {
        if (snapshot.status !== 'ready') return
        if (!dirty) {
          setDraft(toDraft(snapshot.value))
          setSecretDrafts({ postgresqlPassword: '', redisPassword: '', minioSecretKey: '', milvusPassword: '' })
          setClearedSecrets({})
        }
        revisionRef.current = snapshot.revision
      }, [snapshot.status, snapshot.revision])

      if (snapshot.status === 'loading') {
        return h('div', { className: 'dsh-db' },
          h('style', null, PAGE_CSS),
          h('p', { className: 'dsh-db-loading', role: 'status' },
            h('span', { className: 'dsh-db-status-dot', 'aria-hidden': 'true' }),
            t('state.loading')))
      }
      if (snapshot.status === 'unavailable' || snapshot.value === undefined) {
        return h('div', { className: 'dsh-db' },
          h('style', null, PAGE_CSS),
          h('p', { className: 'dsh-db-intro', role: 'status' }, t('state.unavailable')))
      }

      const disabled = !snapshot.writable || status.kind === 'saving'
      const errors = validate(draft, t)
      const invalid = Object.keys(errors).length > 0
      const vector = draft.postgresqlSupportsVector

      const update = (name, value) => {
        const path = FIELDS[name]
        if (path === undefined) return
        setDraft(current => {
          const next = structuredClone(current)
          let node = next
          for (let index = 0; index < path.length - 1; index += 1) node = node[path[index]]
          node[path[path.length - 1]] = value
          return next
        })
        setDirty(true)
        setStatus({ kind: 'idle' })
      }

      const setSecret = (key, value) => {
        setSecretDrafts(current => ({ ...current, [key]: value }))
        setClearedSecrets(current => {
          if (!current[key]) return current
          const next = { ...current }
          delete next[key]
          return next
        })
        setDirty(true)
        setStatus({ kind: 'idle' })
      }

      const clearSecret = (key) => {
        setSecretDrafts(current => ({ ...current, [key]: '' }))
        setClearedSecrets(current => ({ ...current, [key]: true }))
        setDirty(true)
        setStatus({ kind: 'idle' })
      }

      const revert = () => {
        setDraft(toDraft(snapshot.value))
        setSecretDrafts({ postgresqlPassword: '', redisPassword: '', minioSecretKey: '', milvusPassword: '' })
        setClearedSecrets({})
        setDirty(false)
        setStatus({ kind: 'idle' })
      }

      const save = async () => {
        if (invalid) return
        const ops = []
        const put = (path, value) => { ops.push({ op: 'set', path, value }) }
        put(['postgresql', 'host'], draft.postgresql.host.trim())
        put(['postgresql', 'port'], Number(draft.postgresql.port))
        put(['postgresql', 'user'], draft.postgresql.user.trim())
        put(['postgresql', 'database'], draft.postgresql.database.trim())
        put(['postgresql', 'ssl'], draft.postgresql.ssl)
        put(['postgresqlSupportsVector'], draft.postgresqlSupportsVector)
        put(['milvus', 'address'], draft.milvus.address.trim())
        put(['milvus', 'username'], draft.milvus.username.trim())
        put(['milvus', 'database'], draft.milvus.database.trim())
        put(['redis', 'host'], draft.redis.host.trim())
        put(['redis', 'port'], Number(draft.redis.port))
        put(['redis', 'username'], draft.redis.username.trim())
        put(['redis', 'db'], Number(draft.redis.db))
        put(['minio', 'endPoint'], draft.minio.endPoint.trim())
        put(['minio', 'port'], Number(draft.minio.port))
        put(['minio', 'useSSL'], draft.minio.useSSL)
        put(['minio', 'accessKey'], draft.minio.accessKey.trim())
        put(['minio', 'bucket'], draft.minio.bucket.trim())
        put(['pool', 'postgresMax'], Number(draft.pool.postgresMax))
        put(['pool', 'redisMin'], Number(draft.pool.redisMin))
        put(['pool', 'redisMax'], Number(draft.pool.redisMax))
        put(['pool', 'maxSockets'], Number(draft.pool.maxSockets))
        put(['pool', 'idleTimeoutMs'], Number(draft.pool.idleTimeoutMs))
        put(['pool', 'connectTimeoutMs'], Number(draft.pool.connectTimeoutMs))
        put(['pool', 'healthCheckIntervalMs'], Number(draft.pool.healthCheckIntervalMs))
        put(['pool', 'retryBaseMs'], Number(draft.pool.retryBaseMs))
        put(['pool', 'retryMaxMs'], Number(draft.pool.retryMaxMs))
        for (const [key, path] of Object.entries(SECRETS)) {
          if (clearedSecrets[key]) ops.push({ op: 'unset', path })
          else if (secretDrafts[key] !== '') put(path, secretDrafts[key])
        }
        setStatus({ kind: 'saving' })
        try {
          const accepted = await form.mutate(ops, revisionRef.current ?? snapshot.revision)
          if (!accepted) {
            setStatus({ kind: 'failed' })
            return
          }
          setDirty(false)
          setSecretDrafts({ postgresqlPassword: '', redisPassword: '', minioSecretKey: '', milvusPassword: '' })
          setClearedSecrets({})
          setStatus({ kind: 'saved' })
        } catch (_transportFailure) {
          setStatus({ kind: 'failed' })
        }
      }

      const statusText = status.kind === 'saved'
        ? t('state.saved')
        : status.kind === 'failed'
          ? t('state.failed')
          : dirty ? t('state.dirty') : t('state.clean')
      const statusTone = status.kind === 'saved' ? 'success' : status.kind === 'failed' ? 'error' : 'neutral'

      return h('div', { className: 'dsh-db' },
        h('style', null, PAGE_CSS),
        h('header', { className: 'dsh-db-header' },
          h('h3', null, t('page.title')),
          h('p', { className: 'dsh-db-intro' }, t('page.intro'))),
        h('p', { className: 'dsh-db-security' },
          h('span', { className: 'dsh-db-security-dot', 'aria-hidden': 'true' }),
          h('span', null, t('page.security'))),
        h('p', { className: 'dsh-db-hint' }, t('page.poolHint')),

        h('section', { className: 'dsh-db-card' },
          h('header', { className: 'dsh-db-card-head' },
            h('div', null,
              h('h4', { className: 'dsh-db-card-title' }, t('postgres.title'), h('span', { className: 'dsh-db-badge' }, 'PG')),
              h('p', { className: 'dsh-db-card-sub' }, t('postgres.subtitle')))),
          h('div', { className: 'dsh-db-grid' },
            h(DraftField, { name: 'postgresql.host', label: t('field.host'), draft, update, errors, disabled }),
            h(DraftField, { name: 'postgresql.port', label: t('field.port'), draft, update, errors, disabled, kind: 'number' }),
            h(DraftField, { name: 'postgresql.user', label: t('field.user'), draft, update, errors, disabled }),
            h(DraftField, { name: 'postgresql.database', label: t('field.database'), draft, update, errors, disabled }),
            h(CheckField, {
              label: t('field.ssl'),
              checked: draft.postgresql.ssl,
              onChange: value => { update('postgresql.ssl', value) },
              disabled,
            }),
            h(SecretField, {
              label: t('field.password'),
              value: secretDrafts.postgresqlPassword,
              onChange: value => { setSecret('postgresqlPassword', value) },
              onClear: () => { clearSecret('postgresqlPassword') },
              cleared: clearedSecrets.postgresqlPassword === true,
              disabled,
              translate: t,
            })),
          h(Toggle, {
            checked: vector,
            onChange: value => { update('postgresqlSupportsVector', value) },
            disabled,
            label: t('postgres.vector'),
            hint: t('postgres.vectorHint'),
          })),

        vector ? null : h('section', { className: 'dsh-db-card' },
          h('header', { className: 'dsh-db-card-head' },
            h('div', null,
              h('h4', { className: 'dsh-db-card-title' }, t('milvus.title'), h('span', { className: 'dsh-db-badge' }, 'Milvus')),
              h('p', { className: 'dsh-db-card-sub' }, t('milvus.subtitle')))),
          h('div', { className: 'dsh-db-grid' },
            h(DraftField, { name: 'milvus.address', label: t('field.address'), draft, update, errors, disabled }),
            h(DraftField, { name: 'milvus.username', label: t('field.user'), draft, update, errors, disabled }),
            h(DraftField, { name: 'milvus.database', label: t('field.database'), draft, update, errors, disabled }),
            h(SecretField, {
              label: t('field.password'),
              value: secretDrafts.milvusPassword,
              onChange: value => { setSecret('milvusPassword', value) },
              onClear: () => { clearSecret('milvusPassword') },
              cleared: clearedSecrets.milvusPassword === true,
              disabled,
              translate: t,
            })),
          h('p', { className: 'dsh-db-hint' }, t('milvus.hint'))),

        h('section', { className: 'dsh-db-card' },
          h('header', { className: 'dsh-db-card-head' },
            h('div', null,
              h('h4', { className: 'dsh-db-card-title' }, t('redis.title'), h('span', { className: 'dsh-db-badge' }, 'Redis')),
              h('p', { className: 'dsh-db-card-sub' }, t('redis.subtitle')))),
          h('div', { className: 'dsh-db-grid' },
            h(DraftField, { name: 'redis.host', label: t('field.host'), draft, update, errors, disabled }),
            h(DraftField, { name: 'redis.port', label: t('field.port'), draft, update, errors, disabled, kind: 'number' }),
            h(DraftField, { name: 'redis.username', label: t('field.username'), draft, update, errors, disabled }),
            h(DraftField, { name: 'redis.db', label: t('field.db'), draft, update, errors, disabled, kind: 'number' }),
            h(SecretField, {
              label: t('field.password'),
              value: secretDrafts.redisPassword,
              onChange: value => { setSecret('redisPassword', value) },
              onClear: () => { clearSecret('redisPassword') },
              cleared: clearedSecrets.redisPassword === true,
              disabled,
              translate: t,
            }))),

        h('section', { className: 'dsh-db-card' },
          h('header', { className: 'dsh-db-card-head' },
            h('div', null,
              h('h4', { className: 'dsh-db-card-title' }, t('minio.title'), h('span', { className: 'dsh-db-badge' }, 'S3')),
              h('p', { className: 'dsh-db-card-sub' }, t('minio.subtitle')))),
          h('div', { className: 'dsh-db-grid' },
            h(DraftField, { name: 'minio.endPoint', label: t('field.endPoint'), draft, update, errors, disabled }),
            h(DraftField, { name: 'minio.port', label: t('field.port'), draft, update, errors, disabled, kind: 'number' }),
            h(DraftField, { name: 'minio.accessKey', label: t('field.accessKey'), draft, update, errors, disabled }),
            h(DraftField, { name: 'minio.bucket', label: t('field.bucket'), draft, update, errors, disabled }),
            h(CheckField, {
              label: t('field.useSSL'),
              checked: draft.minio.useSSL,
              onChange: value => { update('minio.useSSL', value) },
              disabled,
            }),
            h(SecretField, {
              label: t('field.secretKey'),
              value: secretDrafts.minioSecretKey,
              onChange: value => { setSecret('minioSecretKey', value) },
              onClear: () => { clearSecret('minioSecretKey') },
              cleared: clearedSecrets.minioSecretKey === true,
              disabled,
              translate: t,
            }))),

        h('details', { className: 'dsh-db-advanced' },
          h('summary', null, t('advanced.title')),
          h('div', { className: 'dsh-db-advanced-body' },
            h('p', { className: 'dsh-db-advanced-hint' }, t('advanced.summary')),
            h('div', { className: 'dsh-db-grid' },
              h(DraftField, { name: 'pool.postgresMax', label: t('field.postgresMax'), draft, update, errors, disabled, kind: 'number' }),
              h(DraftField, { name: 'pool.redisMin', label: t('field.redisMin'), draft, update, errors, disabled, kind: 'number' }),
              h(DraftField, { name: 'pool.redisMax', label: t('field.redisMax'), draft, update, errors, disabled, kind: 'number' }),
              h(DraftField, { name: 'pool.maxSockets', label: t('field.maxSockets'), draft, update, errors, disabled, kind: 'number' }),
              h(DraftField, { name: 'pool.idleTimeoutMs', label: t('field.idleTimeoutMs'), draft, update, errors, disabled, kind: 'number' }),
              h(DraftField, { name: 'pool.connectTimeoutMs', label: t('field.connectTimeoutMs'), draft, update, errors, disabled, kind: 'number' }),
              h(DraftField, { name: 'pool.healthCheckIntervalMs', label: t('field.healthCheckIntervalMs'), draft, update, errors, disabled, kind: 'number' }),
              h(DraftField, { name: 'pool.retryBaseMs', label: t('field.retryBaseMs'), draft, update, errors, disabled, kind: 'number' }),
              h(DraftField, { name: 'pool.retryMaxMs', label: t('field.retryMaxMs'), draft, update, errors, disabled, kind: 'number' })))),

        snapshot.writable ? null : h('p', { className: 'dsh-db-hint', role: 'status' }, t('state.readOnly')),
        h('footer', { className: 'dsh-db-actions' },
          h('span', { className: 'dsh-db-status', 'data-tone': statusTone, role: 'status' },
            h('span', { className: 'dsh-db-status-dot', 'aria-hidden': 'true' }),
            statusText),
          h('span', { className: 'dsh-db-spacer' }),
          h('button', { type: 'button', className: 'dsh-db-button', disabled: !dirty || disabled, onClick: revert }, t('action.revert')),
          h('button', {
            type: 'button',
            className: 'dsh-db-button dsh-db-button-primary',
            disabled: !dirty || invalid || disabled,
            'aria-busy': status.kind === 'saving' ? 'true' : undefined,
            onClick: () => { void save() },
          }, status.kind === 'saving' ? t('action.saving') : t('action.save'))))
    }

    /** Bundle page is the configuration surface; register once its keyed slot exists. */
    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, COPY), 'dsh-database-config: dictionaries')
      const form = ctx.configForms.get(ENTRY_ID)
      ctx.slots.inject('plugins.bundle.config', () => ctx.slots.register({
        name: 'plugins.bundle.config',
        key: PACKAGE_NAME,
        locale: NS,
        inject: () => ({ form }),
      }, DatabaseConfigForm))
    }

    return { inject: ['slots', 'locale', 'configForms'], apply }
  },
})
