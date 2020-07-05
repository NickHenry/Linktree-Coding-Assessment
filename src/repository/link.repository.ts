import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import Link, { supportedLinkTypes } from "../entities/link.entity";
import Show from "../entities/show.entity";
import MusicSource, { supportedProviderTypes } from "../entities/music-source.entity";

interface SearchParams {
  userId?: number;
  title?: string;
  sortOrder?: "oldest" | "newest" | "titleASC" | "titleDSC"
}

@Injectable()
export default class LinkRepository {
    // TODO: Mock database connection

    // This mockLinks array serves as a storage without actually connecting to a real database
    private mockLinks = [
      new Link({
        id: 1, 
        userId: 1,
        title: "Visit my Youtube Page",
        type: supportedLinkTypes.CLASSIC,
        active: true,
        url: "https://github.com/NickHenry/Linktree-Coding-Assessment"
      }),
    
      new Link({
        id: 2, 
        userId: 1,
        title: "New Tour",
        type: supportedLinkTypes.SHOW,
        active: true,
        shows: [
          new Show({
            id: 1,
            date: 1593851024,
            saleDate: 1593851024,
            soldout: true,
            venueName: 'Stadium',
            venueCity: 'Melbourne',
            externalLink: 'http://tickettek.com'
          }),
          new Show({
            id: 2,
            date: 1656924763,
            saleDate: 1625388763,
            venueName: 'Stadium',
            venueCity: 'Perth',
            externalLink: 'http://tickettek.com'
          }),
          new Show({
            id: 3,
            date: 1625388763,
            saleDate: 1593852808,
            venueName: 'Stadium',
            venueCity: 'Sydney',
            externalLink: 'http://tickettek.com'
          })
        ]
      }),
    
      new Link({
        id: 3, 
        userId: 1,
        title: "My new album",
        type: supportedLinkTypes.MUSIC,
        active: false,
        musicSources: [
          new MusicSource({
            id: 1, 
            externalLink: 'https://spotify.com/album', 
            embedLink: 'https://spotify.com/song/1/embed', 
            providerType: supportedProviderTypes.SPOTIFY
          }),
          new MusicSource({
            id: 2, 
            externalLink: 'https://applemusic.com/album', 
            providerType: supportedProviderTypes.APPLE_MUSIC
          }),
        ]
      })
    ];


    public getLinkById(id: number): Link {
      return this.mockLinks[id];
    }

    public searchLinks(params: SearchParams): Link[] {
      if (params.userId === 1) {
        return this.mockLinks;
      }
      // TODO: Implement Database search
      return [];
    }

    public createLink(link: Link): Link {
      // This would actually add to a database rather than a mock obj
      const linkObj = new Link({ ...link, id: this.mockLinks.length++ });
      this.mockLinks.push(linkObj);
      return linkObj;
    }

    public updateLink(link: Link): Link {
      return link;
    }

    
    public inactivateUser(link: Link): boolean {
      link.active = false;
      this.updateLink(link);
      return true;
    }
}
