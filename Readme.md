Setup:

Run `docker-compose up -d`

Run todos service:

1. `cd todos`
2. `npm run start` or `npm run dev` for dev mode

Run notification service:

1. `cd notification`
2. `npm run start` or `npm run dev` for dev mode

The notification service is set to run everyday at midnight, you can change its' timing through `cron.schedule('0 0 * * *')` function.
