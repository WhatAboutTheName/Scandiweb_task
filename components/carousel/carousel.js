import React, { useState, useRef } from 'react';
import './carousel.css';
import './swipe.css';

export const Carousel = (props) => {

    const [data, setData] = useState(props.data);
    let [prevNumber, setPrevNumber] = useState(0);
    let [nextNumber, setNextNumber] = useState(1);
    let [elNumber, setElNumber] = useState(0);
    const [targetNumber, setTargetNumber] = useState(0);
    const [range, setRange] = useState(0);
    const [touchDown, setTouchDown] = useState(0);
    const leftElement = useRef();
    const centerElement = useRef();
    const rightElement = useRef();

    const getNewElement = value => {
        carouselAnimationStart();
        setTimeout(_ => {
            if (value === 'previous') {
                setElNumber(elNumber -= 1);
                if (elNumber <= -1) setElNumber(data.length - 1);
            } else {
                setElNumber(elNumber += 1);
                if (elNumber >= data.length) setElNumber(0);;
            }
        }, 250);
        carouselAnimationEnd();
    }

    const elementSwitching = e => {
        let newNumber = targetNumber;
        if (e.keyCode === 13) {
            if (newNumber <= 0 || newNumber > data.length) {
                setElNumber(elNumber);
            } else {
                let num = 0;
                Number(newNumber) === 1 ? num = Number(newNumber) - 1 : num = Number(newNumber) - 1;
                carouselAnimationStart();
                setTimeout(_ => {
                    setElNumber(num);
                }, 250);
                carouselAnimationEnd();
            }
        }
    }

    const touchStart = (e, value) => {
        event.preventDefault();
        value === 'mobile' ?
            setTouchDown(e.changedTouches[0].clientX) : setTouchDown(e.clientX);
        setRange(0);
    }

    const swipe = (e, value) => {
        let dinamicX = 0;
        value === 'mobile' ?
            dinamicX = e.changedTouches[0].clientX : dinamicX = e.clientX;
        if (dinamicX !== 0) {
            const calcRange = dinamicX - touchDown;
            setRange(calcRange);
        }
    }

    const touchEnd = () => {
        if (range > 150) {
            getNewElement('previous');
        }
        if (range < -150) {
            getNewElement('next');
        }
    }

    const carouselAnimationStart = () => {
        leftElement.current.className =
            'carousel-content_size carousel-swipe carousel-left_element carousel-element_general carousel-element_swipe_animation';
        centerElement.current.className =
            'carousel-content_size carousel-swipe carousel-central_element carousel-element_general carousel-element_swipe_animation';
        rightElement.current.className =
            'carousel-content_size carousel-swipe carousel-right_element carousel-element_general carousel-element_swipe_animation';
    }

    const carouselAnimationEnd = () => {
        setTimeout(_ => {
            leftElement.current.className =
                'carousel-content_size carousel-swipe carousel-left_element carousel-element_general';
            centerElement.current.className =
                'carousel-content_size carousel-swipe carousel-central_element carousel-element_general';
            rightElement.current.className =
                'carousel-content_size carousel-swipe carousel-right_element carousel-element_general';
        }, 500);
    }

    return (
        <div className="carousel-container">
            <div className="carousel-arrow_btn carousel-center" onClick={() => getNewElement('previous')}>
                <i className="carousel-arrow carousel-left_arrow" />
            </div>
            <div
                className="carousel-content"
                onMouseDown={event => touchStart(event, 'desctop')}
                onMouseMove={event => swipe(event, 'desctop')}
                onMouseUp={touchEnd}
                onTouchStart={event => touchStart(event, 'mobile')}
                onTouchMove={event => swipe(event, 'mobile')}
                onTouchEnd={touchEnd}
            >
                {
                    data.length && props.dataType === 'img' ?
                        <>
                            <img src={
                                data[
                                elNumber === 0 ?
                                    prevNumber = data.length - 1 : prevNumber = elNumber - 1
                                ]
                            } ref={leftElement} className="carousel-content_size carousel-left_element carousel-element_general" />
                            <img src={
                                data[
                                elNumber
                                ]
                            } ref={centerElement} className="carousel-content_size carousel-central_element carousel-element_general" />
                            <img src={
                                data[
                                elNumber === data.length - 1 ?
                                    nextNumber = 0 : nextNumber = elNumber + 1
                                ]
                            } ref={rightElement} className="carousel-content_size carousel-right_element carousel-element_general" />
                        </> :
                        data.length && props.dataType === 'any' ?
                            <>
                                <div ref={leftElement} className="carousel-content_size carousel-left_element carousel-element_general">
                                    {
                                        data[
                                        elNumber === 0 ?
                                            prevNumber = data.length - 1 : prevNumber = elNumber - 1
                                        ]
                                    }
                                </div>
                                <div ref={centerElement} className="carousel-content_size carousel-central_element carousel-element_general">
                                    {
                                        data[elNumber]
                                    }
                                </div>
                                <div ref={rightElement} className="carousel-content_size carousel-right_element carousel-element_general">
                                    {
                                        data[
                                        elNumber === data.length - 1 ?
                                            nextNumber = 0 : nextNumber = elNumber + 1
                                        ]
                                    }
                                </div>
                            </> :
                            <h1>wait...</h1>
                }
            </div>
            <div className="carousel-fast_scroll">
                <input
                    type="number"
                    step="1"
                    onChange={e => setTargetNumber(e.target.value)}
                    onKeyDown={elementSwitching}
                />
                /
                {
                    data.length ? data.length : 0
                }
            </div>
            <div className="carousel-arrow_btn carousel-center" onClick={() => getNewElement('next')} >
                <i className="carousel-arrow carousel-right_arrow" />
            </div>
        </div>
    );
}