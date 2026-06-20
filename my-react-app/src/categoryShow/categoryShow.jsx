import { useState, useRef, useEffect } from "react";
import './categoryShow.css'
import { useGlobal } from "../../../GlobalContext";
import { useLocation } from "react-router-dom";

export default function ShowListMusic() {
  // Keep an Audio instance per track (useRef is perfect for this)
  const audioRefs = useRef({});
  const [whichMusic, setwhichMusic] = useState(null)
  const [showSlideBar, setShowSlideBar] = useState(false)
  const path = useLocation().pathname;

  const searchType = path.split('/')[2]
  const secondName = decodeURIComponent(path.split('/')[3]).replaceAll('-', ' ')

  const { musicdata } = useGlobal()
  const mapValue = musicdata.filter(val => val[searchType] == secondName);
  useEffect(() => {
    if (mapValue.length == 0) {
      window.location.href = '/error'
    }
  }, [mapValue])

  // Track which index is currently playing (you can expand to multiple if needed)
  const [playingIndex, setPlayingIndex] = useState(null);
  const [showPlay, setShowPlay] = useState(false)
  const [duration, setDuration] = useState(0)
  const [maxDuration, setMaxDuration] = useState(0)

  const changeToMusicPage = (val) => window.location.href = `/music/${val.name}`.replaceAll(' ', '-')

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nextMusic = (index) => {
    if(index + 1 == mapValue.length){
      handleToggle(0, `/music/${mapValue[0].musicNumber}.mp3`)
      audioRefs.current[whichMusic].currentTime = 0;
    } else {
      handleToggle(index + 1, `/music/${mapValue[index + 1].musicNumber}.mp3`)
    }
  }

  const previousMusic = (index) => {
    if(duration >= 1){
      audioRefs.current[whichMusic].currentTime = 0;
    } else{
      if(mapValue.length - 1 == -1){
        handleToggle(mapValue.length - 1, `/music/${mapValue[mapValue.length - 1].musicNumber}.mp3`)
      } else {
        handleToggle(index - 1, `/music/${mapValue[index - 1].musicNumber}.mp3`)
      }
    }
  }

  const handleToggle = (index, src) => {
    setwhichMusic(index)
    setShowSlideBar(true)
    if (!audioRefs.current[index]) {
      const audio = new Audio(src);
      audioRefs.current[index] = audio;
    }

    const audio = audioRefs.current[index];
    
    if (!isNaN(audio.duration)) {
      setMaxDuration(Math.floor(audio.duration));
    } else {
      audio.addEventListener('loadedmetadata', () => {
        setMaxDuration(Math.floor(audio.duration));
      });
    }

    audio.addEventListener('timeupdate', () => {
      setDuration(Math.floor(audio.currentTime));
    });

    audio.addEventListener('ended', () => {
      nextMusic(index)
    });

    if (playingIndex === index) {
      if (audio.paused) {
        audio.play();
        setShowPlay(true);
      } else {
        audio.pause();
        setShowPlay(false);
      }
      return;
    }

    // 3. Different track → stop previous, play new
    if (playingIndex !== null && audioRefs.current[playingIndex]) {
      audioRefs.current[playingIndex].pause();
      audioRefs.current[playingIndex].currentTime = 0;
    }

    // 4. Play new track
    audio.currentTime = 0;
    audio.play();
    setShowPlay(true);
    setPlayingIndex(index);
  };

  return (
    <div className={`mainMusicDivCategory ${showSlideBar ? 'morePaddingDivCategory' : ''}`}>
      {mapValue.map((val, idx) => (
          <div key={idx} className="innerMainMusicDivCategory">
            <div className="textAndImageDiv">
              <img className="imageCategory" onClick={() => changeToMusicPage(val)} src={`/musicImage/${val.imageNumber}.png`} />
              <div className="textDiv" onClick={() => changeToMusicPage(val)}>
                <span className="musicsNameCategory">{val.name}</span>
              </div>
              <div className="buttonDiv">
                <div className="musicButtons mainPlayButton" onClick={() => handleToggle(idx, `/music/${val.musicNumber}.mp3`)}>
                  {playingIndex === idx && showPlay == true ? <img src="/pause.png" alt="pause image" /> : <img src="/play.png" alt="play image" />}              
                </div>
                <a
                  href={`/music/${val.musicNumber}.mp3`} 
                  download={val.name}
                  className="downloadButtonDivCategory"
                >
                  دانلود 
                </a>
              </div>
            </div>
          </div> 
      ))}
      <div className={`upperSlideBarMusicDivCategory ${showSlideBar ? 'show' : ''}`}>
        <div className="musicInfo">
          <p className="musicInfoP1">{showSlideBar ? mapValue[whichMusic].name : 'اسم آهنگ'}</p>
          <p className="musicInfoP2">{showSlideBar ? 'از ' + mapValue[whichMusic].singrName : 'اسم خواننده'}</p>
        </div>
        <div className="slideBarMusicDivCategory">
          <input
            type="range"
            className="slideBarMusicCategory"
            step="1" 
            min={0}
            max={Math.floor(maxDuration)}
            onChange={(e) => {
              const newTime = Number(e.target.value);
              setDuration(newTime);
              audioRefs.current[whichMusic].currentTime = newTime;
            }}
            value={duration}
          />
          <div className="musicButtonsDivs">
            <div className="musicButtons nextButton" onClick={() => nextMusic(whichMusic)}>
              <img src="/next.png" alt="next image" />
            </div>
            <div className="musicButtons secondPlayButton" onClick={() => handleToggle(whichMusic, `/music/${mapValue[whichMusic].musicNumber}.mp3`)}>
              {playingIndex === whichMusic && showPlay == true ? <img src="/pause.png" alt="pause image" /> : <img src="/play.png" alt="play image" />}              
            </div>
            <div className="musicButtons previousButton" onClick={() => previousMusic(whichMusic)}>
              <img src="/next.png" alt="previous image" />
            </div>
          </div>
          <p className="stopTimeDivCategory">{formatTime(maxDuration)}</p>
          <p className="startTimeDivCategory">{formatTime(duration)}</p>
        </div>
      </div>  
    </div>
  );
}