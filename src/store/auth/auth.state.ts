export interface AuthState {
  user: User;
}

export interface User {
  userHash: string;
  userAgent?: UAParser.IResult;
}