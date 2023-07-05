const databaseConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
}

export type DatabaseConfig = typeof databaseConfig
export default databaseConfig