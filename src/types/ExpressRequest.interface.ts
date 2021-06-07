import { User } from '@app/modules/user/schemas/user.schema';
import { Request } from 'express'

export interface ExpressRequestInterface extends Request {
    user?: User
}