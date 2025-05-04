"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/lib/shared/service/sweetAlert";
import { useNotifyService } from "@/lib/shared/service/notifyService";
import { TaskService } from "@/services/TaskService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserService } from "@/services/UserService";

const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"];

const Page = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [viewTask, setviewTask] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    assigneeTo: "",
    dueDate: "",
  });
  const notify = useNotifyService();

  useEffect(() => {
    document.title = "Task Management";
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await TaskService.getAll();
    if (res.error) return notify.error(res.error);
    setTasks(res.data.tasks);
    notify.success(res.message);
  };

  const fetchUsers = async () => {
    const res = await UserService.getAll();
    if (res.error) return notify.error(res.error);
    setUsers(res.data.users);
    notify.success(res.message);
  };

  const handleDelete = async (id) => {
    if (await ConfirmDialog()) {
      const response = await TaskService.deleteTask(id);
      if (response?.error) return notify.error(response.error);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      notify.success(response.message);
    }
  };

  const openAddForm = () => {
    setIsEditMode(false);
    setTaskFormData({
      title: "",
      description: "",
      priority: "",
      status: "",
      assigneeTo: "",
      dueDate: "",
    });
    fetchUsers();
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setIsEditMode(true);
    setTaskFormData(task);
    fetchUsers();
    setIsFormOpen(true);
  };

  const handleFormSubmit = async () => {
    const res = isEditMode
      ? await TaskService.updateTask(taskFormData._id, taskFormData)
      : await TaskService.taskCreate(taskFormData);

    if (res.error) return notify.error(res.error);

    notify.success(res.message);
    if(res.data.email) return notify.success("Email sent sucessfull")
    setIsFormOpen(false);
    fetchTasks();
  };

  const getTaskById = async (id)=>{
    const res = await TaskService.getById(id)
    if(res.error) return notify.error(res.error)
    setviewTask(res.data)
    notify.success(res.message)
  }
    
  
  return (
    <>
      <header className="bg-background sticky top-0 flex h-16 items-center justify-between border-b px-4 z-10">
        <span className="text-xl font-semibold">Task Management</span>
        <Button onClick={openAddForm} className="bg-green-600">Add Task</Button>
      </header>

      <Table>
        <TableCaption>A list of your recent Tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            {["No", "Title", "Description", "Priority", "Status", "Due Date", "Assigned To","Assigned By", "Action"].map((header, i) => (
              <TableHead key={i}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={task._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>{task.assigneeTo?.username}</TableCell>
              <TableCell>{task.creator?.username}</TableCell>
              <TableCell>
                <Button className="me-2 bg-blue-600" onClick={() => { getTaskById(task._id); setIsViewOpen(true); }}>View</Button>
                <Button className="me-2 bg-yellow-600" onClick={() => openEditForm(task)}>Edit</Button>
                <Button className="bg-red-600" onClick={() => handleDelete(task._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
            <DialogDescription>View full information about the task.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <p><strong>Title:</strong> {viewTask?.title}</p>
            <p><strong>Description:</strong> {viewTask?.description}</p>
            <p><strong>Priority:</strong> {viewTask?.priority}</p>
            <p><strong>Status:</strong> {viewTask?.status}</p>
            <p><strong>Due Date:</strong> {viewTask?.dueDate}</p>
            <p><strong>Assigned By:</strong> {viewTask?.creator?.username}</p>
            <p><strong>Assigned To:</strong> {viewTask?.assigneeTo?.username}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Task" : "Add New Task"}</DialogTitle>
            <DialogDescription>{isEditMode ? "Modify task details." : "Fill the form to create a task."}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Title</Label>
            <Input value={taskFormData.title} onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })} />

            <Label>Description</Label>
            <Input value={taskFormData.description} onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })} />

            <Label>Priority</Label>
            <select value={taskFormData.priority} onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })} className="w-full rounded-md border px-3 py-2">
              <option value="">Select Priority</option>
              {PRIORITY_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
            </select>

            <Label>Status</Label>
            <select value={taskFormData.status} onChange={(e) => setTaskFormData({ ...taskFormData, status: e.target.value })} className="w-full rounded-md border px-3 py-2">
              <option value="">Select Status</option>
              {STATUS_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
            </select>

            <Label>Assign To</Label>
            <select value={taskFormData.assigneeTo?._id} onChange={(e) => setTaskFormData({ ...taskFormData, assigneeTo: e.target.value })} className="w-full rounded-md border px-3 py-2">
              <option value="">Select Assign To</option>
              {users.map((user) => <option key={user._id} value={user._id}>{user.username}</option>)}
            </select>

            <Label>Due Date</Label>
            <Input type="date" value={taskFormData.dueDate?.substring(0, 10)} onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })} />
          </div>

          <DialogFooter>
            <Button onClick={() => setIsFormOpen(false)}>Cancel</Button>
            <Button onClick={handleFormSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Page;
