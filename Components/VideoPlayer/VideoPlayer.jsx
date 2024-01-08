"use client"
import videojs from "video.js";
import "videojs-seek-buttons"
import "videojs-hotkeys"
import "video.js/dist/video-js.css"
import "videojs-seek-buttons/dist/videojs-seek-buttons.css"
import "videojs-contrib-quality-levels"
import "jb-videojs-hls-quality-selector"
import { useRef,useEffect } from "react";
import { Button } from "../../Tailwind";

import "@videojs/themes/dist/city/index.css"

const VideoPlayer=()=>{
    const video = useRef();
    const player= useRef(null);
    const options={
        controls : true,
        sources: [
            {
                src: "https://d8sysglf3mhwk.cloudfront.net/hls/test.mpd",
                type: "application/dash+xml"
            }
        ],
        fluid: true,
        playbackRates: [0.5,0.75,1,1.5,2],
        autoplay : true
    }

    const onReady=(v_player)=>{
        // v_player.seekButtons({
        //     forward: 10,
        //     back:10
        // })
        v_player.hlsQualitySelector({
            displayCurrentQuality: true,
        });
        v_player.hotkeys({
            alwaysCaptureHotKeys: true,
            seekStep: 2,
            enableVolumeScroll: true
        })
    }

    useEffect(()=>{
       player.current= videojs(video.current,options,()=>onReady(player.current))
    })


    const design=(
        <>
        <div className="w-6/12">
        <video 
        ref={video}
        className="video-js vjs-big-play-centered"

        />
        </div>
        </>
    );
    return design;
}
export default VideoPlayer;