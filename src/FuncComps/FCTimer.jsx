import { useState, useEffect, useRef } from 'react';

function FCTimer({ setSnoozeStatus }) {
    const [date, setDate] = useState(new Date());
    const [remainingTicks, setRemainingTicks] = useState(1);
    const snoozeTime = 100;

    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionStep, setTransitionStep] = useState(0);
    const [lastTimeBeforeTransition, setLastTimeBeforeTransition] = useState(null);

    const totalTransitionSteps = 10;
    const timeBetweenSteps = 50;

    const totalCharacterBlocks = 4;
    const stepDelayPerBlock = 5;
    const totalAnimationDuration = totalTransitionSteps + (totalCharacterBlocks - 1) * stepDelayPerBlock;

    const finalBlocks = ['MO', 'RE', 'OF', 'ME'];
    const placeholderChar = '0';



    useEffect(() => {
        if (date === null && !isTransitioning) {
            setSnoozeStatus(1)
        }
    }, [date, isTransitioning, setSnoozeStatus]);


    const getIntermediateChar = (charA, charB, step, totalSteps) => {
        const codeA = (charA || placeholderChar).charCodeAt(0);
        const codeB = (charB || placeholderChar).charCodeAt(0);
        const distance = codeB - codeA;

        const ratio = Math.min(1.0, step / totalSteps);

        const offset = Math.round(distance * ratio);
        return String.fromCharCode(codeA + offset);
    };

    const interpolateBlock = (strA, strB, globalStep, blockIndex) => {
        const effectiveStep = globalStep - (blockIndex * stepDelayPerBlock);

        if (effectiveStep <= 0) {
            return strA;
        }

        if (effectiveStep >= totalTransitionSteps) {
            return strB;
        }

        let result = '';
        for (let i = 0; i < 2; i++) {
            result += getIntermediateChar(
                strA[i],
                strB[i],
                effectiveStep,
                totalTransitionSteps
            );
        }
        return result;
    };


    useEffect(() => {
        let timerID;
        if (remainingTicks > 0) {
            const tick = () => {
                const newDate = new Date();
                setDate(newDate);
                setRemainingTicks(prevTicks => prevTicks - 1);

                if (remainingTicks === 1) {
                    setLastTimeBeforeTransition(newDate);
                }
            };
            timerID = setInterval(tick, 100);

        } else if (remainingTicks === 0 && !isTransitioning && date) {
            if (lastTimeBeforeTransition) {
                setIsTransitioning(true);
                setTransitionStep(0);
            }
        }

        return () => {
            if (timerID) clearInterval(timerID);
        };
    }, [remainingTicks, isTransitioning, lastTimeBeforeTransition]);

    useEffect(() => {
        if (!isTransitioning) return;

        const transitionInterval = setInterval(() => {
            setTransitionStep(prev => {
                const next = prev + 1;

                if (next >= totalAnimationDuration) {
                    clearInterval(transitionInterval);
                    setDate(null);
                    setIsTransitioning(false);
                    return totalAnimationDuration;
                }

                return next;
            });
        }, timeBetweenSteps);

        return () => clearInterval(transitionInterval);
    }, [isTransitioning, totalAnimationDuration]);


    const templateTimer = (hours, minutes, seconds, milliseconds, ready = false) => {
        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');
        milliseconds = milliseconds.toString().padStart(2, '0');

        return (
            <div className={`timer ${ready && 'stop'}`}>
                {writeNumber(hours[0])}
                {writeNumber(hours[1])}
                <div className='dots-container'><p className='dots'>:</p><p className='dots blur'>:</p></div>
                {writeNumber(minutes[0])}
                {writeNumber(minutes[1])}
                <div className='dots-container'><p className='dots'>:</p><p className='dots blur'>:</p></div>
                {writeNumber(seconds[0])}
                {writeNumber(seconds[1])}
                <div className='dots-container'><p className='dots'>:</p><p className='dots blur'>:</p></div>
                {writeNumber(milliseconds[0])}
                {writeNumber(milliseconds[1])}
            </div>
        );
    };


    const writeDigit = (digit, isBlurred = false) => {
        return (
            <p
                className={`digits ${isBlurred ? 'blur' : ''}`}
                style={digit === '1' ? { right: 0 } : { left: 0 }}
            >
                {digit}
            </p>
        );
    };

    const writeNumber = (digit) => {
        return (
            <div className='number'>
                <p className='ref'>8</p>
                {writeDigit(digit)}
                {writeDigit(digit, true)}
            </div>
        );
    };


    const writeTimer = () => {
        if (date === null && !isTransitioning) {
            return templateTimer('MO', 'RE', 'OF', 'ME', true);
        }

        if (isTransitioning && lastTimeBeforeTransition) {
            const lastHours = lastTimeBeforeTransition.getHours().toString().padStart(2, '0');
            const lastMinutes = lastTimeBeforeTransition.getMinutes().toString().padStart(2, '0');
            const lastSeconds = lastTimeBeforeTransition.getSeconds().toString().padStart(2, '0');
            const lastMilliseconds = lastTimeBeforeTransition.getMilliseconds().toString().padStart(3, '0').slice(0, 2);

            const transitionHours = interpolateBlock(lastHours, finalBlocks[0], transitionStep, 0);
            const transitionMinutes = interpolateBlock(lastMinutes, finalBlocks[1], transitionStep, 1);
            const transitionSeconds = interpolateBlock(lastSeconds, finalBlocks[2], transitionStep, 2);
            const transitionMilliseconds = interpolateBlock(lastMilliseconds, finalBlocks[3], transitionStep, 3);

            return templateTimer(
                transitionHours,
                transitionMinutes,
                transitionSeconds,
                transitionMilliseconds,
                transitionStep >= totalAnimationDuration
            );
        }

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds();

        return templateTimer(hours, minutes, seconds, milliseconds);
    };

    const handleSnooze = () => {
        setSnoozeStatus(0)
        setRemainingTicks(snoozeTime);
        setIsTransitioning(false);
        setTransitionStep(0);
        setDate(new Date());
    };



    return (
        <div className='FCTimer'>
            <img src="black_triangle.png" className={`left triangle ${date && 'while-couting'}`} />
            <img src="black_triangle.png" className={`right triangle ${date && 'while-couting'}`} />
            <div className='timer-container'>
                {writeTimer()}
            </div>
            <div
                className={`restart-btn ${date && 'pressed'}`}
                onClick={handleSnooze}
            >
                <p>SNOOZE</p>
            </div>
        </div>
    );
}

export default FCTimer;