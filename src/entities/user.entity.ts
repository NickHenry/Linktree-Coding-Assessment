
export default class User {
  id: number;
  name: string;
  profileImage: string;
  constructor(data: User) {
    this.id = data.id;
    this.name = data.name;
    this.profileImage = data.profileImage;
  }
}