import Link from "./link.entity";
import Show from "./show.entity";

export default class ShowLink extends Link {
  shows: Show[];
}