import type Mission from "./mission.interface";
import type Task from "./task.interface";

export default interface Tree {
  mission: Mission;
  tree: Task[];
}
