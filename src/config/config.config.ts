export default {
    database: {
        HOST: process.env.PGHOST!,
        PORT: Number(process.env.PGPORT!),
        DATABASE: process.env.PGDATABASE!,
        PASSWORD: process.env.PGPASSWORD!,
        USER: process.env.PGUSER!,
    },
};