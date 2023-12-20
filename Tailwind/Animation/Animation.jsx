import { Button, Icon } from "..";
import { useState,useEffect } from "react";
import { useSprings,animated } from "@react-spring/web";
import { useGesture,useDrag } from "react-use-gesture";
import Style from "./Animation.module.css"
import useMeasure from "react-use-measure";

export const Carousel = ({
    data,
    height = 905,
    arrow = true,
    dots = true,
    counting = true
}) => {
    const [count, setCount] = useState(0)
    const [move, setMove] = useState(0)
    const [springs,api] = useSprings(data.length,()=>({
        x:"0"
    }))
    useEffect(()=>{
        const timer= setTimeout(next,5000)
        api.start({
            x: -move+"%"
        });
        return ()=>{
            clearTimeout(timer);
        }
    },[move])
    const prev=()=>{
        if((count+1)>1)
        {
        setCount(count-1);
        setMove(move-100);
    }
    else{
        setCount(data.length-1);
        setMove(100*(data.length-1));
    }
    }
    const next=()=>{
        if((count+1)<data.length)
        {
        setCount(count+1);
        setMove(move+100);
    }
    else{
        setCount(0);
        setMove(0);
    }
    }
    const onDragEnd=(e)=>{
        const left= e.direction[0];
        if(left>0){
            prev();
        }
        else
        {
            next();
        }
    }
    const bind= useGesture({
        onDragEnd: onDragEnd
    })
    const dotsControl=(index)=>{
        setCount(index);
        setMove(100*index);
    }
    const Anim = ({styles, index}) => {
        const a = (
            <>
                <animated.div
                {...bind()} 
                className={Style["no-select"]}
                style={{
                    width: "100%",
                    height: height,
                    background: `url(${data[index].image})`,
                    backgroundSize: "cover",
                    ...styles
                }}>
                    <div className={`
                    flex items-center h-full
                    ${Style["caption-bg"]}
                    `}>
                    <div className="p-8 sm:p-16 w-full">
                    {
                        data[index].caption
                    }
                    </div>
                    </div>

                </animated.div>
            </>
        )
        return a;
    }
    const design = (
        <>
            <div className="overflow-hidden relative">
                <div className="flex" style={{
                    width: `${100 * data.length}%`
                }}>
                    {
                        springs.map((styles, index) => {
                            return <Anim key={index} index={index} styles={styles} />
                        })
                    }
                </div>
                <div
                    className="
            absolute 
            left-0 top-0 
            p-5 h-full
            flex flex-col justify-between
            "

                >
                    {counting ? <label>{count+1}/{data.length}</label> : <label></label>}
                    {arrow ? <button onClick={prev}>
                        <Icon className="text-white">arrow_back_ios</Icon>
                    </button> : null}
                    <label></label>
                </div>
                <div
                    className="
            absolute 
            right-0 top-0 
            p-5 h-full
            flex flex-col justify-between
            "

                >
                    <label></label>
                    {
                        arrow ? <button onClick={next}>
                            <Icon className="text-white">arrow_forward_ios</Icon>
                        </button> : null
                    }
                    <label></label>
                </div>
                { dots?
                    <div className="
        absolute 
        bottom-0 left-0
        p-5
        w-full flex justify-center
        ">
                        <div className="flex gap-3">
                            {
                                data.map((item, index) => {
                                    return (
                                        <>
                                            <button
                                            key={index}
                                            onClick={()=>dotsControl(index)} 
                                            style={{
                                                width: "50px",
                                                height: "5px",
                                                background: count===index ?"white" :  "rgba(255,255,255,0.3"
                                            }}></button>
                                        </>
                                    )
                                })
                            }
                        </div>

                    </div>
                    :null
                }
            </div>
        </>
    )
    return design;
}

export const Slider=({data, vertical=false})=>{
    const [springs,api] = useSprings(data.length, ()=>({
        x:0
    }));
    
    const [count, setCount] = useState(0)
    const [move, setMove] = useState(0)
    const [image,imageBound]= useMeasure();
    const [main,mainBound]= useMeasure();
    const handleDrag=({offset})=>{
        api.start({
            x: offset[0]
        })
    }

    const bind= useDrag(handleDrag,{
        bounds: {
            left: -((imageBound.width*data.length)-(mainBound.width-(imageBound.width/2))),
            right: 0
        }
    });
     
    const next=()=>{
        if(count<data.length-4)
        {
            setCount(count+1)
            setMove(move+imageBound.width);
        }
        else{
            return null
        }

    }
    const prev=()=>{
        if(count>0)
        {
            setCount(count-1)
            setMove(move-imageBound.width);
        }
        else{
            return null
        }

    }

    useEffect(()=>{
        api.start({
            x:-move
        })
    },[move])

    const Anim=({styles,index})=>{
        const anim=(
            <>
            <animated.div 
            {...bind()}
            ref={image}
            className={Style["no-select"]}
            style={{
                ...styles,
                width: vertical ? "100%" : "25%",
                height: "181px",
                background: `url(${data[index].thumbnail})`,
                backgroundSize: "cover"
}}>
            <div className={`
            h-full 
            ${Style["caption-bg"]} 
            flex items-center
            `}>
                <div className="px-4 text-white">
                    <h1 className="text-xl">
                        {data[index].title}
                    </h1>
                    <p>
                        {data[index].duration}
                    </p>
                    <Button 
                    theme="error"
                    className="flex items-center gap-2 text-xs px-3 mt-3"
                    >
                    <Icon>play_circle</Icon>    
                    PLAY NOW</Button>
                    </div>
            </div>
            </animated.div>
            </>
        )
        return anim;
    }
    const design=(
        <>
        <div 
        ref={main}
        className="overflow-hidden relative">
            <div className={`flex gap-4
            ${vertical?"flex-col": "flex-row"}
            `

            } style={{
                width: vertical?"100%" : (25*data.length)+"%"
            }}>
                {
                    springs.map((styles,index)=>{
                        return <Anim 
                        key={index}
                        styles={styles}
                        index={index}
                        />
                    })
                }
            </div>
            <div 
            className="flex 
            h-full items-center
            absolute top-0 left-0
            ">
                <button
                onClick={prev}
                style={{
                    background: "rgba(0,0,0,0.8)"
                }}
                className="text-white py-3 px-2">
                    <Icon>arrow_back_ios</Icon>
                </button>
            </div>
            <div 
            className="flex 
            h-full items-center
            absolute top-0 right-0
            ">
                <button
                onClick={next}
                style={{
                    background: "rgba(0,0,0,0.8)",
                    marginRight: "8px"
                }}
                className="text-white py-3 px-2">
                    <Icon>arrow_forward_ios</Icon>
                </button>
            </div>
        </div>
        </>
    )
    return design;
}