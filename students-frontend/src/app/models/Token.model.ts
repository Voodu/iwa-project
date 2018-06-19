import { Course } from './Course.model';
import { Access } from '../enums';

export class Token {
    public constructor(
        public username: string = 'Log in to continue',
        public token: string = '',
        public accessLevel: Access = Access.Guest,
        public expireDate: string = ''
    ) {

    }
}
