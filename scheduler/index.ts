import { SimpleIntervalJob } from "toad-scheduler";
import { task1, task2 } from "./tasks";

export const job1 = new SimpleIntervalJob(
  { seconds: 5, runImmediately: true },
  task1,
  {
    id: "id_1",
    preventOverrun: true,
  }
);

export const job2 = new SimpleIntervalJob(
  { seconds: 300, runImmediately: true },
  task2,
  {
    id: "id_2",
    preventOverrun: true,
  }
);
