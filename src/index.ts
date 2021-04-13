import dashboard from 'hystrix-dashboard';
import expressApp from 'express';
import config from './config';
import { express } from './container/express';
import { logger } from './container/system';
import { getHystrixStream } from './services/hystrix-metrics';

export const listen = () => {
    const createHystrixDashboard = (portNumber = 8081): void => {
        const dashboardSettings = {
            idleTimeout: 4000,
            interval: 2000,
            proxy: true,
        };

        const router = expressApp
            .Router()
            .get('/', (req, res) => res.json({ dashboard: '/dashboard', stream: '/stream' }))
            .use('/dashboard', dashboard(dashboardSettings))
            .use('/stream', (req, res, _) => {
                res.setHeader('Content-Type', 'text/event-stream;charset=UTF-8');
                res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
                res.setHeader('Pragma', 'no-cache');
                getHystrixStream().pipe(res);
            });

        const app = expressApp();
        app.use(router).listen(portNumber, () => logger.info('[Express] Hystrix dashboard listening at %s', portNumber));
    };
    createHystrixDashboard();
    return express
        .listen(config.port, () => {
            logger.info('[Express] Listening at %s', config.port);
        })
        .on('error', (e) => {
            if (e) {
                logger.error(e);
            }
        });
};

listen();
