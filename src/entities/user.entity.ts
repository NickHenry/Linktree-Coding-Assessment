export default class User {
  id: number;
  name: string;
  profileImage: string;
  active: boolean;
  constructor(data: User) {
    Object.assign(this, data);
  }
}