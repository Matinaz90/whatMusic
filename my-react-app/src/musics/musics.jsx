import './musics.css'
import { useEffect, useState } from "react";
import { useGlobal } from '../../../GlobalContext'

export function Music () {
  const { musicdata, uniqueCategories } = useGlobal()
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      setVisibleCount(getVisibleProductsCount(width));
    };

    updateCount();
    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const getVisibleProductsCount = (width) => {
    if (width < 400) return 2;
    if (width < 1100) return 3;
    if (width < 1800) return 4;
    return 5;
  };

  return(
    <div className='musicMain'>
    {
      uniqueCategories.map((categoryName, index) => (
        <div key={index} className='musicMainInnderDiv'>
          <div className='musicMainDiv'><h2 className='musicMain2'>{categoryName[0]}</h2><button onClick={() => window.location.href =`/songs/category/${categoryName[0]}`} className='MoreSongsButton'>مشاهده همه<img src='/extend_arrow.png'/></button></div>
          <div className='MusicBoxDiv'>
            {musicdata.filter((val) => val.category === categoryName[0]).slice(0, visibleCount).map((data, dataIndex) => (
              <div key={dataIndex} onClick={() => window.location.href = `/music/${data.name}`.replaceAll(' ', '-')} className='MusicBoxInnerDiv'><img src={`/musicImage/${data.imageNumber}.png`}></img><p>{data.name}</p></div>
            ))}
          </div>
        </div>
      ))
    }
    </div>
  )
}