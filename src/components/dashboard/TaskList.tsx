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
    if (dueDate === 'Vandaag') return 'var(--color-danger)';
    if (dueDate === 'Morgen') return 'var(--color-warning)';
    return 'var(--color-text-muted)';
  };

  const incompleteTasks = taskList.filter(task => !task.completed);
  const completedTasks = taskList.filter(task => task.completed);

  return (
    <div style={{
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-border)'
    }}>
      {/* Title */}
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--color-text)',
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
              backgroundColor: task.completed ? 'var(--color-bg-secondary)' : 'var(--color-card-bg)',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
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
                color: task.completed ? 'var(--color-text-muted)' : 'var(--color-text)',
                textDecoration: task.completed ? 'line-through' : 'none',
                marginBottom: '4px',
                lineHeight: '1.4'
              }}>
                {task.title}
              </div>
              
              {/* Due Date */}
              <div style={{
                fontSize: '12px',
                color: task.completed ? 'var(--color-text-muted)' : getDueDateColor(task.dueDate),
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
          backgroundColor: 'var(--color-success-bg)',
          borderRadius: '6px',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{
            fontSize: '13px',
            color: 'var(--color-success)'
          }}>
            ● {completedTasks.length} ta{completedTasks.length === 1 ? 'ak' : 'ken'} voltooid
          </div>
        </div>
      )}
    </div>
  );
};
