export class RegisterRequestDto {
  username: string;
  email: string;
  password: string;
}

export class LoginRequestDto {
  email: string;
  password: string;
}
