import { useLocation } from 'react-router-dom'
import './topBar.css'
import { useEffect, useState } from 'react';
import { useGlobal } from '../../../GlobalContext';

export function TopBar () {
  const path = useLocation().pathname;
  const { musicdata, value, setvalue } = useGlobal()
  const [showSearches, setshowSearches] = useState(false)
  
  const data = (musicdata.filter((element) =>
    element.name.toLowerCase().includes(value.toLowerCase())
  ))

  useEffect(() => {
    const handleKeyUp = (e) => {
        if (e.key === 'Escape') {
          setvalue('')
        }
    };
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleKeyDownNative = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      window.location.href = `/search/${value}`;
      setvalue('')
      setshowSearches(false)
    }
  };

  useEffect(() => {
    const handleKeyUp = (e) => {
        if (e.key === 'Escape') {
          removeSearchLink(e)
        }
    };
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const removeSearchLink = (e) => {
    setvalue('')
    document.body.classList.remove('no-scrool')
    e.target.blur();
    setshowSearches(false)
  }

  const musicLink = (e, element) => {
    window.location.href = `/music/${element.name}`
    document.body.classList.remove('no-scrool')
    e.target.blur();
  }

  const searchLink = (e) => {
    window.location.href = `/search/${value}`;
    document.body.classList.remove('no-scrool')
    e.target.blur();
  }

  return(
    <div className='TopBarMain'>
      {value.length >= 2 && data.length > 0 && showSearches ? <div className='fullPage' onClick={(e) => removeSearchLink(e)}></div> : <></>}
      {value.length >= 2 && data.length > 0 && showSearches ? document.body.classList.add('no-scrool') : null}
      <div className='searchBarDiv'>
        <input id='searchBar' onClick={() => setshowSearches(true)} onKeyDown={handleKeyDownNative} onChange={(e) => setvalue(e.target.value)} value={value} placeholder="جستجوی خواننده یا آهنگ..." className='searchBar' maxLength={20} type='text'></input>
        <img onClick={(e) => searchLink(e)} src='/search.svg'></img>
      </div>
      {
        value.length >= 2 && showSearches ? data == '' ? <></> : 
          <div className='searchOptionDiv'>
            <div className='searchOptionInnerDivSeach searchOptionInnerDiv' onClick={(e) => searchLink(e)}>
              <p className='searchOptionTitle'>جستحو کلمه: {value}</p>
            </div>
            {data.map((element, index) => (
              <div className='searchOptionInnerDiv' key={`${index} dataMap`} onClick={(e) => musicLink(e, element)}>
                  <img src={`/musicImage/${element.imageNumber}.png`}></img>
                  <div>
                    <p className='searchOptionTitle'>{element.name}</p>
                    <div className='searchOptionDescription'>
                      <p >خاننده: {element.singrName}</p>
                      <p>سال ساخت: {element.releaseDate}</p>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        : <></>
      }
      <div>
        <img className='TopBarImg' onClick={() => window.location.href = ('/')} src='/whatMusic.png'></img>
      </div>
    </div>
  )
}