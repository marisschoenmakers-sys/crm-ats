import React, { useState } from 'react';
import type { DashboardTask } from '../../types/dashboard';

interface TaskListProps {
  tasks: DashboardTask[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);

  const toggleTask = (taskId: string) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getDueDateColor = (dueDate: string) => {
    if (dueDate === 'Vandaag') return '#dc2626';
    if (dueDate === 'Morgen') return '#f59e0b';
    return '#6b7280';
  };

  const incompleteTasks = taskList.filter(task => !task.completed);
  const completedTasks = taskList.filter(task => task.completed);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      {/* Title */}
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '20px'
      }}>
        Taken ({incompleteTasks.length}/{taskList.length})
      </h3>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {taskList.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px',
              backgroundColor: task.completed ? '#f9fafb' : 'white',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              transition: 'background-color 0.2s ease'
            }}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              style={{
                marginTop: '2px',
                width: '16px',
                height: '16px',
                cursor: 'pointer'
              }}
            />

            {/* Task Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '14px',
                color: task.completed ? '#9ca3af' : '#111827',
                textDecoration: task.completed ? 'line-through' : 'none',
                marginBottom: '4px',
                lineHeight: '1.4'
              }}>
                {task.title}
              </div>
              
              {/* Due Date */}
              <div style={{
                fontSize: '12px',
                color: task.completed ? '#d1d5db' : getDueDateColor(task.dueDate),
                fontWeight: task.dueDate === 'Vandaag' ? '500' : '400'
              }}>
                {task.dueDate}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {completedTasks.length > 0 && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f0fdf4',
          borderRadius: '6px',
          border: '1px solid #bbf7d0'
        }}>
          <div style={{
            fontSize: '13px',
            color: '#166534'
          }}>
            ✅ {completedTasks.length} ta{completedTasks.length === 1 ? 'ak' : 'ken'} voltooid
          </div>
        </div>
      )}
    </div>
  );
};
