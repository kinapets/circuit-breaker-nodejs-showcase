import * as express from 'express';
import { getDocumentation, getExample } from '../container/controllers';

export default express.Router().use(`/swagger`, getDocumentation).use(`/example`, getExample);
