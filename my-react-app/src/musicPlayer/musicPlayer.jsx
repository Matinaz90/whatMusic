import React, { useEffect, useState, useRef } from "react";
import './musicPlayer.css'
import { useGlobal } from "../../../GlobalContext";
import { useLocation } from "react-router-dom";

export default function MusicPlayer () {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);
  const [musicIcon, setmusicIcon] = useState(false);
  const path = useLocation().pathname;


  const { musicdata } = useGlobal()
  const mapValue = musicdata.filter(val => val.name == decodeURIComponent(path.split('/')[2]).replaceAll('-', ' '));
  useEffect(() => {
    if (mapValue.length == 0) {
      window.location.href = '/error'
    }
  }, [mapValue])

    const togglePlay = (onlyStop) => {
    if (audioRef.current.paused && onlyStop) {
      audioRef.current.play();
      setmusicIcon(true)
    } else {
      audioRef.current.pause();
      setmusicIcon(false)
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  

  return(
    mapValue.map((val, index) => (
      <div className="musicPlayerDiv" key={index}>
        <div className="titleMusicPlayerDiv">
          <p className="titleMusicPlayer"> دانلود  <b>{val.name}</b> از <strong>{val.singrName}</strong></p>
          <p className="dateMusicPlayer">تاریخ انتشار: &nbsp;{val.releaseDate}</p>
        </div>
        <div className="imageMusicPlayerDiv">
          <img className="imageMusicPlayer" src={`/musicImage/${val.imageNumber}.png`} alt="song image"></img>
        </div>
        <p className="descriptionMusicPlayer">
          {val.musicText}
        </p>
          <a
            href={`/music/${val.musicNumber}.mp3`} 
            download={val.name}
            className="downloadButtonDiv"
          >
            دانلود با کیفیت 320
          </a>
        <div className="musicplayDiv">
          <audio 
            onTimeUpdate={(e) => setDuration(Math.floor(e.target.currentTime))} 
            onLoadedMetadata={(e) => setMaxDuration(e.target.duration)}
            ref={audioRef} 
            onEnded={() => {togglePlay(false); audioRef.current.currentTime = 0;}} 
            src={`/music/${val.musicNumber}.mp3`}
          />
          <div className="slideBarMusicDiv">
            <input
              type="range"
              className="slideBarMusic"
              step="1" 
              min={0}
              max={Math.floor(maxDuration)}
              onChange={(e) => {
                const newTime = Number(e.target.value);
                setDuration(newTime);
                audioRef.current.currentTime = newTime;
              }}
              value={duration}
            />
            <p className="stopTimeDiv">{formatTime(Math.floor(maxDuration))}</p>
            <p className="startTimeDiv">{formatTime(duration)}</p>
          </div>
          <div className="musicButtons">
            <div onClick={() => togglePlay(true)} className="togglePlayImageDiv">
              {musicIcon ? <img src="/pause.png" alt="pause image" /> : <img src="/play.png" alt="play image" />}
            </div>
          </div>
        </div>
      </div>
    ))
  )
}