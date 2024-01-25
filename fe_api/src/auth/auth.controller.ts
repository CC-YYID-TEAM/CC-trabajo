import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { HeaderAuthGuard } from '../AuthGuard/header.guard';

@Controller('oauth2')
export class AuthController {
  @Get('google')
  @UseGuards(HeaderAuthGuard)
  async googleLogin(): Promise<void> {
    // Esta ruta redirigirá al usuario a la pantalla de inicio de sesión de Google
    console.log('googel llega aqui');
  }

  @Get('callback')
  //@UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req): Promise<string> {
    // Esta ruta será llamada por Google después de que el usuario se autentique
    console.log('se auteutuco', req.user);
    return req.user;
  }
}
