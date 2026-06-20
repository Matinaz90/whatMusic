import { useGlobal } from '../../../GlobalContext'
import { Music } from '../musics/musics';
import './recommend.css'

export function Recommend () {
  const { musicdata } = useGlobal()

  const uniqueSinger = Array.from(
    new Map(musicdata.map(item => [item.singrName, item.singrName]))
  ).slice(0, 8);

    const englishNums = ['0','1','2','3','4','5','6','7','8','9'];
    const persianNums = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];

    const persianToEnglishNumber = (val) => {
            return String(val).split("").map(ch => {
            const index = persianNums.indexOf(ch);
            return index > -1 ? englishNums[index] : ch;
        }).join("");
    }

    const releaseDateType = (val) => {
      return(
        val.replace(/\s+/g, '')
        .split('⁄')
        .reverse()
        .map(part => part.padStart(2, '۰'))
        .join('')
      )
    }
    
  const musicdatasorted = [...musicdata].sort((a, b) => persianToEnglishNumber(releaseDateType(b.releaseDate)) - persianToEnglishNumber(releaseDateType(a.releaseDate))).slice(0, 12)

  return(
    <div className='recommendMain'>
      <div className='songs'>
        <p className='songsTitle'>خواننده ها</p>
        <div className='songsOtterDiv'>
          {
            uniqueSinger.map((categoryName, index) => (
              <div className='songsInnerDiv' key={index}>
                <p onClick={() => window.location.href = `/songs/singrName/${categoryName[0]}`} key={index} >{categoryName[0]}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className='songs'>
        <p className='songsTitle'>جدید ترین ها</p>
        <div className='songsOtterDiv'>
          {
            musicdatasorted.map((val, index) => (
              <div className='songsInnerDiv' key={index}>
                <p key={index} onClick={() => window.location.href = (`/music/${val.name}`)}> {val.name}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}