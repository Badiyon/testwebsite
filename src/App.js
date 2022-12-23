
import { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {

  const Ref = useRef(null);
  
  const [timer, setTimer] = useState('00:00:00');

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60 ) % 24);
    return{
      total, hours, minutes, seconds
    }
  }


  const startTimer = (e) => {
    let {total, hours, minutes, seconds} = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }

  const clearTimer = (e) => {
    setTimer('00:00:00');

    if(Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 0);
    return deadline;
  }


  const addtime = () => {
    let deadline = new Date();
    let sec = prompt("add seconds")

    deadline.setSeconds(deadline.getSeconds() + Number(sec));
    return deadline;
  }

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []); 

  const onClickReset = () => {
    clearTimer(getDeadTime());
  }

  const newTime = (e) => {
    let res = new Date(e * 1000).toISOString().slice(11,19);
    setTimer(res);

    if(Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }

  const onClickNT = () => {
    newTime(addtime());
  }

  
  return (
    <div className="App">
      <h2>{timer}</h2>
      <button onClick={onClickReset}>Reset</button>
      <button onClick={onClickNT}>New Time</button>
    </div>
  );
}

export default App;
