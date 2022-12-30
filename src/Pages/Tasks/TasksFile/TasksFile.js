import React from "react";
import AddTasks from "../AddTasks/AddTasks";
import CompletedTasks from "../CompletedTasks/CompletedTasks";
import MyTasks from "../MyTasks/MyTasks";

const TasksFile = () => {
  return (
    <div>
      <AddTasks></AddTasks>
      <MyTasks></MyTasks>
      <CompletedTasks></CompletedTasks>
    </div>
  );
};

export default TasksFile;
