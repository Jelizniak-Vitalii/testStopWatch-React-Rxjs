import React from 'react';
import './stopWatch.css';
import {useState,useEffect} from 'react';
import {interval,Subject} from 'rxjs';
import { takeUntil } from "rxjs/operators";




const StopWatch = ()=>{
    let [time,setTime] = useState(0)
    let [buttonState,setButtonState] = useState(true);

    function zeroFormat(value){
        if(value < 10){
            value = '0'+value;
        }
        return value;
    }

    const changeStateBtn = ()=>{
        if(buttonState){
            setButtonState(!buttonState);
        }else{
            setButtonState(true);
            setTime(time = 0)
            
        }  
    }
    const reset = ()=>{
        if(time > 0){
            setTime(time = 0)
            setButtonState(!true);
        }
    }

    let a = 0
    const doubleClick = ()=>{
        setTimeout(()=>{
            a++
            if(a === 2){
                setButtonState(true);
            }
        },300)
        a = 0
    }



    useEffect(() => {

        const startStopWatch = new Subject();
        interval(1000)
            .pipe(takeUntil(startStopWatch))
            .subscribe(() => {
              if (!buttonState) {
                setTime(val => val + 1);
              }
            
            });
        return () => {
          startStopWatch.next();
          startStopWatch.complete();
        };
      },);



    return(
        <div className="timer">
            <div className="timer-count">
                <div className="timer-count__hours">{zeroFormat(Math.floor(time / 3600 % 24))}</div>
                <div className="timer-count__minutes">{zeroFormat(Math.floor(time / 60 % 60))}</div>
                <div className="timer-count__seconds">{zeroFormat(Math.floor(time % 60))}</div>
            </div>
            <div className="timer-btn-group">
                <div className="timer-btn-group__first">
                    <button className="timer-btn-group__start btn" onClick={changeStateBtn}>{buttonState ? 'Start' : 'Stop'}</button>
                </div>
                <div className="timer-btn-group__second">
                    <button className="timer-btn-group__stop btn" onClick={doubleClick}>Wait</button>
                    <button className="timer-btn-group__reset btn" onClick={reset}>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default StopWatch;
