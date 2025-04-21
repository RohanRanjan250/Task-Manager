import { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaClock, FaChevronRight } from 'react-icons/fa';

const TodoList = ({ mode = 'all' }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [selectedSection, setSelectedSection] = useState(() => {
    const savedSection = localStorage.getItem('selectedSection');
    return savedSection || 'personal';
  });
  const [taskSection, setTaskSection] = useState('personal');

  const sections = [
    { id: 'personal', name: 'Personal Tasks' },
    { id: 'work', name: 'Work Tasks' },
    { id: 'shopping', name: 'Shopping List' },
    { id: 'study', name: 'Study Tasks' }
  ];

  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = todos.length - completedTodos;

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    if (editingId !== null) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: newTodo } : todo
      ));
      setEditingId(null);
    } else {
      setTodos([{
        id: Date.now(),
        text: newTodo,
        completed: false,
        createdAt: new Date().toLocaleString(),
        section: taskSection
      }, ...todos]);
    }
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setNewTodo(todo.text);
    setTaskSection(todo.section);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('selectedSection', selectedSection);
  }, [selectedSection]);

  const sectionTodos = todos.filter(todo => todo.section === selectedSection);

  const renderAddMode = () => (
    <>
      <div className="section-selector">
        <select 
          value={taskSection} 
          onChange={(e) => setTaskSection(e.target.value)}
          className="section-select"
        >
          {sections.map(section => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={addTodo} className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder={editingId ? "Edit task..." : "Add a new task..."}
          autoFocus
        />
        <button type="submit" className="primary-button">
          {editingId ? 'Update' : 'Add Task'}
        </button>
      </form>

      <div className="recent-tasks">
        <h3>Recent Tasks</h3>
        <div className="todo-list">
          {todos.slice(0, 2).map(todo => (
            <div key={`recent-${todo.id}`} className="todo-item recent">
              <div className="todo-item-left">
                <span>{todo.text}</span>
              </div>
              <div className="todo-section-badge">
                {sections.find(s => s.id === todo.section)?.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderAllMode = () => (
    <>
      <div className="todo-stats">
        <div className="stat-item">
          <div className="stat-number">{todos.length}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{completedTodos}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{pendingTodos}</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>

      <div className="section-tabs">
        {sections.map(section => (
          <button
            key={section.id}
            className={`section-tab ${selectedSection === section.id ? 'active' : ''}`}
            onClick={() => setSelectedSection(section.id)}
          >
            {section.name}
          </button>
        ))}
      </div>

      <div className="section-content">
        <h3>{sections.find(s => s.id === selectedSection)?.name}</h3>
        <div className="todo-list">
          {sectionTodos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-item-left">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-item-checkbox"
                />
                <span>{todo.text}</span>
              </div>
              <div className="todo-actions">
                <span title="Created at" className="timestamp">
                  <FaClock />
                  {todo.createdAt}
                </span>
                <button onClick={() => startEditing(todo)} title="Edit">
                  <FaEdit />
                </button>
                <button onClick={() => deleteTodo(todo.id)} title="Delete">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="todo-container">
      {mode === 'add' ? renderAddMode() : renderAllMode()}
    </div>
  );
};

export default TodoList;