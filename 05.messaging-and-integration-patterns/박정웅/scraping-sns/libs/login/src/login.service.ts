export interface LoginService {
  login(param: LoginParam): Promise<Session>;
}

export type Session = {
  authToken: string;
};

export type LoginParam = {
  id: string;
  password: string;
};
