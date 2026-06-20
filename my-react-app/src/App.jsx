import './App.css'
import { TopBar } from './topBar/topBar';
import { Music } from './musics/musics';
import { Recommend } from './recommend/recommend';
import MusicPlayer from './musicPlayer/musicPlayer';
import ShowListMusic from './categoryShow/categoryShow';
import SearchMusic from './searchMusic/searchMusic';


function App(prop) {
  const choses = [<Music />, <MusicPlayer />, <ShowListMusic />, <SearchMusic />]
  
  return(
      <div className='mainPageDiv'>
        <div className='mainPageInnerDivSuggestion'>
          <Recommend />
        </div>
        <div className='mainPageInnerDivMain'>
          <TopBar />
          {choses[prop.MusicNumber]}
        </div>
      </div>
  );
}

export default App
