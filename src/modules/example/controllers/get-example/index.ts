import { Response, NextFunction } from 'express';
import * as httpCodes from 'http-codes';
import { ExampleRequest } from '../../models';

import { ExampleService } from '../../../../services';

export const createGetExampleController = (exampleService: ExampleService) => async (
    req: ExampleRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await exampleService.getExample(req.query.name);

        res.status(httpCodes.OK).json({ hello: response });
    } catch (e) {
        return next(e);
    }
};
