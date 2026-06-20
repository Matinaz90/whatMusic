import React, { useEffect } from 'react'
import './searchMusic.css'
import { useGlobal } from '../../../GlobalContext';
import { useLocation } from 'react-router-dom';

export default function SearchMusic () {
  const path = useLocation().pathname;

  const { musicdata, setvalue } = useGlobal()
  setvalue(decodeURIComponent(path.split('/')[2]))

  const scored = musicdata.map((song, originalIndex) => {
    const name = song.name.toLowerCase();
    const lyrics = song.musicText?.toLowerCase() || '';
    let score = Infinity;

    if (name === decodeURIComponent(path.split('/')[2])) {
      score = 0;
    } else if (name.startsWith(decodeURIComponent(path.split('/')[2]))) {
      score = 1;
    } else if (name.includes(decodeURIComponent(path.split('/')[2]))) {
      score = 2;
    } else if (lyrics.includes(decodeURIComponent(path.split('/')[2]))) {
      score = 3;
    }
    return { song, score, originalIndex };
  });

  const mapValue = scored
    .filter(item => item.score !== Infinity)
    .sort((a, b) => a.score - b.score || a.originalIndex - b.originalIndex)
    .map(item => item.song);


  useEffect(() => {
    if (mapValue.length == 0) {
      window.location.href = '/error'
    }
  }, [mapValue])
  

  return (
    <div className='searchMainDiv'>
      {mapValue.map((val, index) => (
        <div key={index} onClick={() => window.location.href = `/music/${val.name}`.replaceAll(' ', '-')} className='MusicBoxInnerDiv'><img src={`/musicImage/${val.imageNumber}.png`}></img><p>{val.name}</p></div>
      ))}
    </div>
  )
}