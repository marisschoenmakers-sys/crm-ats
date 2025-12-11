import React, { useState, useEffect } from 'react';
import { createTask } from '../../api/tasks';
import { logTaskCreated } from '../../api/activities';
import type { DashboardTask } from '../../types/dashboard';

interface TaskListProps {
  tasks: DashboardTask[];
  onTaskAdded?: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskAdded }) => {
  const [taskList, setTaskList] = useState(tasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Sync with props when tasks change
  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const toggleTask = (taskId: string) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    
    const { data, error } = await createTask({
      title: newTaskTitle.trim(),
      priority: 'medium',
      status: 'todo'
    });
    
    if (error) {
      console.error('Error creating task:', error);
      alert('Fout bij aanmaken taak: ' + error.message);
      return;
    }
    
    if (data) {
      const newTask: DashboardTask = {
        id: (data as any).id,
        title: (data as any).title,
        dueDate: 'Geen deadline',
        completed: false
      };
      setTaskList(prev => [newTask, ...prev]);
      setNewTaskTitle('');
      setShowAddTask(false);
      
      // Log activity
      logTaskCreated((data as any).id, (data as any).title);
      
      onTaskAdded?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setShowAddTask(false);
      setNewTaskTitle('');
    }
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
      {/* Title with Add Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--color-text)',
          margin: 0
        }}>
          Taken ({incompleteTasks.length}/{taskList.length})
        </h3>
        <button
          onClick={() => setShowAddTask(true)}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            border: '1px solid var(--color-border)',
            backgroundColor: 'transparent',
            color: 'var(--color-text-muted)',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            e.currentTarget.style.color = 'var(--color-text)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--color-text-muted)';
          }}
        >
          +
        </button>
      </div>

      {/* Add Task Input */}
      {showAddTask && (
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '12px',
          padding: '12px',
          backgroundColor: 'var(--color-primary-bg)',
          borderRadius: '6px',
          border: '1px solid var(--color-primary)'
        }}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nieuwe taak..."
            autoFocus
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text)',
              outline: 'none'
            }}
          />
          <button
            onClick={handleAddTask}
            disabled={!newTaskTitle.trim()}
            style={{
              padding: '8px 16px',
              backgroundColor: newTaskTitle.trim() ? 'var(--color-primary)' : 'var(--color-border)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: newTaskTitle.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Toevoegen
          </button>
          <button
            onClick={() => { setShowAddTask(false); setNewTaskTitle(''); }}
            style={{
              padding: '8px 12px',
              backgroundColor: 'transparent',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      )}

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
            {/* Animated Checkbox */}
            <label
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '2px'
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                style={{ display: 'none' }}
              />
              <svg width="24" height="24" viewBox="0 0 64 64" style={{ overflow: 'visible' }}>
                <path
                  d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16"
                  style={{
                    fill: 'none',
                    stroke: task.completed ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    strokeWidth: 6,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    transition: 'stroke-dasharray 0.5s ease, stroke 0.3s ease',
                    strokeDasharray: task.completed ? '0 262 70 9999999' : '0 0 240 9999999',
                    strokeDashoffset: 1,
                    transform: task.completed ? 'scale(1, 1)' : 'scale(-1, 1)',
                    transformOrigin: 'center'
                  }}
                />
              </svg>
            </label>

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
