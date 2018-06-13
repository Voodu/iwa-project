import {Course} from './Course.model';

export class Token {
  public constructor(
    public username: string = 'Log in to continue',
    public token: string = '',
    public accessLevel: number = 3,
    public expireDate: string = ''
  ) {

  }
}
