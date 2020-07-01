import { Controller, Get, Param } from '@nestjs/common';

@Controller('link')
export class LinkController {
  @Get()
  getHello(): string {
    return "Yes this is the base link route";
  }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return JSON.stringify(id);
  }
}
