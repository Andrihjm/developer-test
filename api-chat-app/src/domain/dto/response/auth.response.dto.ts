export class RegisterResponseDto {
  username: string;
  email: string;
  //   password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class LoginResponseDto {
  status: number;
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
  };
  access_token: string;
}
