export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.NATS_URL,
    port: parseInt(process.env.NATS_PORT, 10) || 4222,
  },
});
