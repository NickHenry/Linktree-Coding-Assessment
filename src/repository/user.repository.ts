import User from "../entities/user.entity";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

@Injectable()
export default class UserRepository {
    private mockUsers = [
      new User({ id: 1, name: "Nick", profileImage: 'https://i.imgur.com/LPzq6Or.jpg', active: true })
    ];
    //TODO: Create a connection to the database
    public getUserById(id: number): User {
      // TODO: Search the DB for user matching the ID
      // Currently just searching for user by index
      return this.mockUsers[id - 1];
    }

    public searchUsers(): User[] {
      // TODO: Search the database for users matching a set criteria
      return [];
    }

    public addUser(user: User): User {
      // TODO: Create new user in the database
      const newUser = new User({...user, id: this.mockUsers.length++ });
      this.mockUsers.push(newUser);
      return newUser;
    }

    public updateUser(user: User): User {
      // TODO: Update user matching user.id
      return new User({ id: 1, ...user });
    }
    public inactivateUser(user: User): boolean{
      user.active = false;
      this.updateUser(user);
      return true;
    }
}
