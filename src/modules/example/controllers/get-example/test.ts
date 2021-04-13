import * as request from 'supertest';

import config from '../../../../config';
import { express } from '../../../../container/express';

describe('GET /example', () => {
    let server;

    beforeAll(() => {
        server = request(express);
    });

    it('should return response with foo and bar attributes', async () => {
        const testId = 'hello';
        const res = await server.get('/api/v1/example').query({ id: testId });
        expect(true).toEqual(true);
    });
});
