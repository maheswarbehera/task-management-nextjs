"use client";
import { DashboardService } from "@/services/DashboardService";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function Page() {
  const [assignees, setAssignees] = useState([]);
  const [creators, setCreators] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const isAuthenticated = useProtectedRoute();
  useEffect(() => {
    if(isAuthenticated){
      document.title = "Dashboard"
      getTaskAssigner();
      getTaskCreator();
      getTaskDueDate();
    }
  }, [isAuthenticated]);

  const getTaskAssigner = async () => {
    const res = await DashboardService.taskAssigneeToUser();
    if (!res.error) setAssignees(res.data);
  };

  const getTaskCreator = async () => {
    const res = await DashboardService.taskCreatedByUser();
    if (!res.error) setCreators(res.data);
  };

  const getTaskDueDate = async () => {
    const res = await DashboardService.overDueTask();
    if (!res.error) setOverdueTasks(res.data.tasks || []);
  };

  if (!isAuthenticated) return null;
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Tasks Assigned To Users */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned To You</CardTitle>
            <CardDescription>Tasks you're responsible for</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc text-sm">
              {assignees.length === 0 && <li>No assigned tasks</li>}
              {assignees.map((asigner, index) => (
                <div key={index} className=" grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"  >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {asigner.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {asigner.description}
                  </p>
                  </div>
                </div>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Tasks Created By User */}
        <Card>
          <CardHeader>
            <CardTitle>Created By You</CardTitle>
            <CardDescription>Tasks you've assigned to others</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc text-sm">
              {creators.length === 0 && <li>No created tasks</li>}
              {creators.map((creator, index) => (
                <div key={index}  className=" grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0" >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {creator.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {creator.description}
                    </p>
                    </div>
                  </div>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Overdue Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Overdue Tasks</CardTitle>
            <CardDescription>Tasks past their due date</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc text-sm">
              {overdueTasks.length === 0 && <li>No overdue tasks</li>}
              {overdueTasks.map((task, index) => (
              <div key={index} className=" grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"  >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {task.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                  </div>
                </div>
              ))}
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
