import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginAuthDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email:string;

    @IsNotEmpty()
    @IsString()
    public password:string;
}
