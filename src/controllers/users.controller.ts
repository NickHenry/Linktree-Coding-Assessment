import { Controller, Get, Param, Post, Put, Body, Delete, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import User from '../entities/user.entity';
import Link, { supportedLinkTypes } from '../entities/link.entity';
import UserRepository from '../repository/user.repository';
import LinkRepository from '../repository/link.repository';
import { validate } from "class-validator";
import Show from '../entities/show.entity';
import MusicSource from '../entities/music-source.entity';

@Controller('users')
export class UsersController {

  constructor(private userRepository: UserRepository, private linkRepository: LinkRepository) {}
  @Get()
  searchAllUsers(): string {
    // TODO: Add param reading
    // Add param validation
    // Add call to repository

    return "";
  }

  @Post()
  createUser(@Body() inputUser: User): string {
    // TODO: Validate user input
    // send to repository to be added to the database
    return JSON.stringify(inputUser);
  }

  @Put()
  updateUser(@Param('id', ParseIntPipe) id: string, @Body() inputUser: User): string {
    // TODO: Validate ID input
    // Validate request body inputs
    // send body to repository to update database
    return JSON.stringify({id, inputUser});
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: string): string {
    // TODO: validate id as good value
    // call repository to get user by id
    // if no user is found, handle 404
    return JSON.stringify(id);
  }

  @Get('/:id/links')
  searchLinksForUser( 
    @Param('id', ParseIntPipe) userId: number
  ): Link[] {
    const user = this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // TODO: add sort 
    return this.linkRepository.searchLinks({ userId });
  }


  @Post('/:id/links')
  async createLinkForUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() link: Link
  ): Promise<Link> {
    const user = this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const linkObj = new Link(link);
    const errors = [];
    let children = [];
    switch(linkObj.type) {
      case supportedLinkTypes.SHOW:
        children = linkObj.shows.map(show => new Show(show));
        break;
      case supportedLinkTypes.MUSIC:
        children = linkObj.musicSources.map(music => new MusicSource(music));
        break;
    }
    for (const child of children) {
      const err = await validate(child);
      const messages = err.map(msg => {
        const constraint = msg.constraints;
        return constraint[Object.keys(constraint)[0]]; 
      });
      errors.push(...messages);
    }
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return linkObj
  }


  @Put('/:id/links/:linkId')
  updateLinkForUser(@Param('id', ParseIntPipe) id: string,  @Param('linkId') linkId: string, @Body() link: Link): string { 
    // TODO: validate body
    // validate that link id exists
    // validate that its your link
    // send update body to repository to be updated in teh database
    return JSON.stringify({id, linkId, link});
  }


  @Delete('/:id/links/:linkId')
  deleteLink(@Param('id', ParseIntPipe) id: string, @Param('linkId') linkId: string): string {
    // TODO: validate that id exists
    // validate that linkId exists
    // send link id to repository to delete the link and its other types
    return JSON.stringify({id, linkId});
  }
}
