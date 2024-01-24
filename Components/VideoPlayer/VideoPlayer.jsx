"use client"
import videojs from "video.js";
import "videojs-seek-buttons"
import "videojs-hotkeys"
import "video.js/dist/video-js.css"
import "videojs-seek-buttons/dist/videojs-seek-buttons.css"
import "videojs-contrib-quality-levels"
import "jb-videojs-hls-quality-selector"
import { useRef, useEffect } from "react";
import { Button } from "../../Tailwind";

import "@videojs/themes/dist/city/index.css"

const VideoPlayer = ({params}) => {
    const video = useRef();
    const player = useRef(null);
    const options = {
        controls: true,
        sources: [
            {
                src: `${process.env.NEXT_PUBLIC_CLOUDFRONT}/stream/original/${params.title}/${params.title}.mpd`,
                type: "application/dash+xml"
            }
        ],
        fluid: true,
        playbackRates: [0.5, 0.75, 1, 1.5, 2],
        poster : process.env.NEXT_PUBLIC_CLOUDFRONT+"/"+params.thumbnail
    }

    const onReady = (v_player) => {
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

    useEffect(() => {
        player.current = videojs(video.current, options, () => onReady(player.current))
    })


    const design = (
        <>
            <video
                ref={video}
                className="video-js vjs-big-play-centered"

            />
        </>
    );
    return design;
}
export default VideoPlayer;