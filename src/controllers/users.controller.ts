import { Controller, Get, Param, Post, Put, Body, Delete } from '@nestjs/common';
import User from 'src/entities/user.entity';
import Link from 'src/entities/link.entity';

@Controller('users')
export class UsersController {
  @Get()
  searchAllUsers(): string {
    // TODO: get all users based on param criteria
    return "";
  }

  @Post()
  createUser(@Body() inputUser: User): string {
    // TODO: Validate user input
    // send to repository to be added to the database
    return JSON.stringify(inputUser);
  }

  @Put()
  updateUser(@Param('id') id: string, @Body() inputUser: User): string {
    // TODO: Validate ID input
    // Validate request body inputs
    // send body to repository to update database
    return JSON.stringify({id, inputUser});
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): string {
    // TODO: validate id as good value
    // call repository to get user by id
    // if no user is found, handle 404
    return JSON.stringify(id);
  }

  @Get('/:id/links')
  searchLinksForUser(@Param('id') id: string): string { 
    // TODO: Validate user id is something valid
    // validate that the user is real
    // call to repo with query 
    return id;
  }


  @Post('/:id/links')
  createLinkForUser(@Param('id') id: string, @Body() link: Link): string { 
    // TODO: validate body
    // validate user exists
    // create new object
    // pass object into repository to be added into the database
    return JSON.stringify({id, link});
  }


  @Put('/:id/links/:linkId')
  updateLinkForUser(@Param('id') id: string,  @Param('linkId') linkId: string, @Body() link: Link): string { 
    // TODO: validate body
    // validate that link id exists
    // validate that its your link
    // send update body to repository to be updated in teh database
    return JSON.stringify({id, linkId, link});
  }


  @Delete('/:id/links/:linkId')
  deleteLink(@Param('id') id: string, @Param('linkId') linkId: string): string {
    // TODO: validate that id exists
    // validate that linkId exists
    // send link id to repository to delete the link and its other types
    return JSON.stringify({id, linkId});
  }
}
