import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo, FaBell } from 'react-icons/fa';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
      setIsRunning(false);
      setCycles(prev => prev + 1);
      
      if (mode === 'pomodoro') {
        setMode(cycles % 4 === 3 ? 'longBreak' : 'shortBreak');
        setTimeLeft(cycles % 4 === 3 ? 15 * 60 : 5 * 60);
      } else {
        setMode('pomodoro');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, cycles]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    switch (mode) {
      case 'pomodoro':
        setTimeLeft(25 * 60);
        break;
      case 'shortBreak':
        setTimeLeft(5 * 60);
        break;
      case 'longBreak':
        setTimeLeft(15 * 60);
        break;
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    switch (newMode) {
      case 'pomodoro':
        setTimeLeft(25 * 60);
        break;
      case 'shortBreak':
        setTimeLeft(5 * 60);
        break;
      case 'longBreak':
        setTimeLeft(15 * 60);
        break;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const total = mode === 'pomodoro' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60;
    return ((total - timeLeft) / total) * 100;
  };

  return (
    <div className="pomodoro-container">
      <h2>Pomodoro Timer</h2>
      <div className="cycles-count">
        Completed Cycles: {Math.floor(cycles / 2)}
      </div>
      
      <div className="timer-mode">
        <button
          className={mode === 'pomodoro' ? 'active' : ''}
          onClick={() => switchMode('pomodoro')}
        >
          Pomodoro
        </button>
        <button
          className={mode === 'shortBreak' ? 'active' : ''}
          onClick={() => switchMode('shortBreak')}
        >
          Short Break
        </button>
        <button
          className={mode === 'longBreak' ? 'active' : ''}
          onClick={() => switchMode('longBreak')}
        >
          Long Break
        </button>
      </div>

      <div className="timer-progress" style={{
        background: `conic-gradient(
          #646cff ${getProgressPercentage()}%,
          #2a2a2a ${getProgressPercentage()}% 100%
        )`
      }}>
        <div className="timer-display">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="timer-controls">
        <button onClick={toggleTimer} className="control-button">
          {isRunning ? <FaPause /> : <FaPlay />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>
        <button onClick={resetTimer} className="control-button">
          <FaRedo />
          <span>Reset</span>
        </button>
      </div>

      <div className="timer-info">
        {mode === 'pomodoro' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
      </div>
    </div>
  );
};

export default PomodoroTimer;