import { IsString, IsNotEmpty } from 'class-validator';
export class EditMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class DeleteMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
