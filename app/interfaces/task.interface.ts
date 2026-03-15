export default interface Task {
  id: number;
  missionId: number;
  parentId: number | null;
  name: string;
  duration: number;
  cost: number;
  status: string;
  children: Task[] | [];
}
