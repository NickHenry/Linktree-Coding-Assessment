import User from "src/entities/user.entity";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

@Injectable()
export class LoRepository {
    //TODO: Create a connection to the database
    public getUserById(id: number): User {
      if (id === 1) {
        const user = new User({id: 1, name: "Nick", profileImage: 'https://i.imgur.com/LPzq6Or.jpg'});
        return user;
      }
      return null;
    }
}
