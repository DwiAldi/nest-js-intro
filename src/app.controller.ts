import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//If parameter of controller is empty, then will routing to "domain.com/" else "domain.com/something"
@Controller() //Decorator
export class AppController {
  constructor(private readonly appService: AppService) {}

  //domain.com/
  @Get()
  getHello( ): string {
    return this.appService.getHello();
  }
  // //send response into JSON type
  // getHello(): {name: string}{
  //   return {name: "Aldi"}
  // }
}
