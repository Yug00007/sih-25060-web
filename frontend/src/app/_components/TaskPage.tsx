"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CheckCircle2, TrendingUp, Leaf, Users } from "lucide-react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type HistoryEntry = {
  date: string;
  completed: number;
};

export default function TasksPage() {
  // Tasks
  const initialTasks: Task[] = [
    { id: 1, text: "Mandatory Training for Citizens", completed: false },
    { id: 2, text: "Phase-wise Training to Waste Workers", completed: false },
    { id: 3, text: "Formation of Green Champions Committees", completed: false },
    { id: 4, text: "Incentive-based Approach for Segregation", completed: false },
    { id: 5, text: "Waste Movement Reporting via App", completed: false },
    { id: 6, text: "Community Participation – Clean Day", completed: false },
    { id: 7, text: "Penalization System Implementation", completed: false },
    { id: 8, text: "Setup Waste Management Facilities", completed: false },
    { id: 9, text: "Launch Complete Digital App System", completed: false },
  ];

  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wasteTasks");
      return saved ? JSON.parse(saved) : initialTasks;
    }
    return initialTasks;
  });

  // History of completed tasks
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("taskHistory");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("wasteTasks", JSON.stringify(tasks));
  }, [tasks]);

  // XP
  const xpPerTask = 15;
  const completedTasks = tasks.filter(t => t.completed).length;
  const xp = completedTasks * xpPerTask;
  const progress = (completedTasks / tasks.length) * 100;
  const level = Math.floor(xp / 100) + 1;

  // Update history whenever completed tasks count changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const today = new Date().toLocaleDateString();
    const last = history[history.length - 1];
    let updated = [...history];
    if (last && last.date === today) {
      updated[updated.length - 1] = { date: today, completed: completedTasks };
    } else {
      updated.push({ date: today, completed: completedTasks });
    }
    setHistory(updated);
    localStorage.setItem("taskHistory", JSON.stringify(updated));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedTasks]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Dashboard random data
  const dashboardData = [
    { title: "Waste Collected (TPD)", value: Math.floor(Math.random() * 1000) + 500, icon: Leaf },
    { title: "Waste Treated (TPD)", value: Math.floor(Math.random() * 800) + 300, icon: TrendingUp },
    { title: "Landfill Reduced (%)", value: Math.floor(Math.random() * 30) + 10, icon: CheckCircle2 },
    { title: "Active Green Champions", value: Math.floor(Math.random() * 100) + 50, icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-10 px-4">
      {/* XP + Level */}
      <div className="w-full max-w-6xl mx-auto mb-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <span className="text-royalblue font-extrabold text-2xl">
            Level {level} 🌱
          </span>
          <span className="text-lg font-semibold text-green-700">XP: {xp}</span>
        </div>
        <div className="w-full bg-green-200 h-5 rounded-full overflow-hidden mt-3 shadow-inner">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="md:col-span-2 bg-white/90 backdrop-blur border border-green-200 rounded-3xl shadow-xl p-6">
          <h2 className="text-3xl font-extrabold text-royalblue mb-4 text-center">
            Waste Management Tasks
          </h2>
          <ul className="space-y-3">
            {tasks.map(task => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 shadow hover:scale-[1.02] transition"
              >
                <label className="flex items-center space-x-3 cursor-pointer w-full">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-6 w-6 accent-green-600 focus:ring-green-500 rounded-full"
                  />
                  <span
                    className={`flex-1 text-lg ${
                      task.completed ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {task.text}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Dashboard */}
        <div className="bg-white/90 backdrop-blur border border-green-200 rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-extrabold text-royalblue mb-4 text-center">
            Dashboard
          </h2>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {dashboardData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-green-100 to-blue-100 p-4 rounded-xl shadow hover:scale-[1.02] transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-full shadow">
                      <Icon className="text-green-700 w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-gray-700 font-semibold">{item.title}</div>
                      <div className="text-royalblue text-xl font-bold">{item.value}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <h3 className="text-lg font-bold text-royalblue text-center mb-2">
            Progress Over Time
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#16a34a" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this to globals.css or Tailwind config if “royalblue” not defined:
// .text-royalblue { color: #4169E1; }
