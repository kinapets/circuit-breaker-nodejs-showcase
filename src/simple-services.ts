import expressApp from 'express';
import { logger } from './container/system';
import { simpleServicesConfig } from './simple-services-config';

const sleep = (wait: number) => new Promise((resolve) => setTimeout(resolve, wait));

const createSimpleService = (portNumber = 8082, responseTime, procentofFailures) => {
    const router = expressApp.Router().use('/', async (req, res, _) => {
        await sleep(responseTime);
        if (Math.random() < procentofFailures) {
            return res.status(503).json();
        }
        res.json({ iAmListeningOnPort: portNumber });
    });

    const app = expressApp();
    app.use(router).listen(portNumber, () => logger.info('[Express] Simple service dashboard listening at %s', portNumber));
};

export const listen = () => {
    console.log(process.argv);
    const { percentageOfFailures, port, responseTime } =
        process.argv[2] === 'first' ? simpleServicesConfig.first : simpleServicesConfig.second;

    createSimpleService(port, responseTime, percentageOfFailures);
};

listen();
