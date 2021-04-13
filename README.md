# Showcase of circuit breaker
Stack is based on
- https://github.com/qest-cz/nodejs-typescript-starter
- https://github.com/qest-cz/nodejs-rest-api-template.

Repository was created for Qest 🎉JS-SQUAD🎉 to demonstrate how easy can you implement circuit breaker pattern.

Slides in czech language are available [here](https://slides.com/radimstepanik-1/deck-e153f7).

## What to doo
- `npm run dev` - run main server
- `npm run dev:first` - run first simple service server
- `npm run dev:second` - run second simple service server
- `npm run perf:test` - run basic performance test
- You can see hystrix dashboard [here](http://localhost:8081/dashboard/monitor/monitor.html?streams=%5B%7B%22name%22%3A%22%22%2C%22stream%22%3A%22http%3A%2F%2Flocalhost%3A8081%2Fstream%22%2C%22auth%22%3A%22%22%2C%22delay%22%3A%22%22%7D%5D)


You can setup percentage of failures and response time for first and second service in file `simple-services-config.ts`.