import React, { useEffect, useState } from 'react';
import './App.css';
import Item from './movieGrid/item';
import SearchBar from './search/SearchBar';
import AddMovie from './addMovie/addMovie';
import SortOptions from './sort/SortOptions';
import { Movie } from './models/interface';
import _ from 'lodash';
import lotrImageOne from './assets/lotr-1.jpeg';
import lotrImageTwo from './assets/lotr-2.jpg';
import lotrImageThree from './assets/lotr-3.jpg';
import snatchImage from './assets/snatch.jpg';
import Logo from './assets/logo.png';

function App() {
  const [addOn, setAddOn] = useState<boolean>(false);
  const date = new Date();
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds();
  const movieData: Movie[] = [
    {
      title: 'Lord of the Rings: The Fellowship of the Ring',
      description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
      image: lotrImageOne,
      genre: 'fantasy',
      date: `${hours}:${minutes}:${seconds}`,
      id: 1
    },
    {
      title: 'Lord of the Rings: The Two Towers',
      description: 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Saurons new ally, Saruman, and his hordes of Isengard.',
      image: lotrImageTwo,
      genre: 'fantasy',
      date: `${hours}:${minutes}:${seconds}`,
      id: 2
    },
    {
      title: 'Lord of the Rings: Return of the King',
      description: 'Gandalf and Aragorn lead the World of Men against Saurons army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
      image: lotrImageThree,
      genre: 'fantasy',
      date: `${hours}:${minutes}:${seconds}`,
      id: 3
    },
    {
      title: 'Snatch',
      description: 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
      image: snatchImage,
      genre: 'action, comedy',
      date: `${hours}:${minutes}:${seconds}`,
      id: 4
    }
  ]

  const [search, setSearch] = useState<string>('');
  const [sortType, setSortType] = useState<string>('default / newest');
  const [searchData, setSearchData] = useState<Movie[]>(movieData);
  const [sortedData, setSortedData] = useState<Movie[]>(movieData);
  const [data, setData] = useState<Movie[]>(movieData);

  const secureData: Movie[] = data.filter(i => i !== undefined && i !== null);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('data', JSON.stringify(secureData));
    },200)
  },[data])

  useEffect(() => {
    const newSearchData: Movie[] = secureData.filter(i => i.title.toLocaleLowerCase().includes(search) ||
    i.title.toLocaleUpperCase().includes(search));
    setSearchData(newSearchData);
  }, [search])

  useEffect(() => {
    if (sortType === 'default / newest') {
      const defaultSorted: Movie[] = _.sortBy(secureData, 'date').reverse();
      setSortedData(defaultSorted);
    } else if (sortType === 'A - Z') {
      const asendingSorted: Movie[] = _.sortBy(secureData, 'title');
      setSortedData(asendingSorted);
    } else {
      const asendingReverseSorted: Movie[] = _.sortBy(secureData, 'title').reverse();
      setSortedData(asendingReverseSorted);
    }
  },[data, sortType]);

  useEffect(() => {
    if (localStorage.length === 0) {
      return;
    } else {
      const getData = JSON.parse(localStorage.getItem('data') || 'Data is null');
      setData(getData);
    }
  },[])

  return (
    <div className="App">
      { addOn ? <div className="overlay"><AddMovie movieData={secureData} add={(e: Movie) => setData([...data, e])} close={(e: boolean) => setAddOn(e)} /> </div> : null }
      <header>
        <button onClick={addOn ? () => setAddOn(false) : () => setAddOn(true)} className="button-add bold">Add</button>
        <img className="logo" src={Logo} />
        <SearchBar inputChange={(e: string) => setSearch(e)} />
        <SortOptions updateSort={(e: string) => setSortType(e)} />
      </header>
      <main>
        <section className="item-wrapper">
          {
            search.length < 1 ? 
            sortedData.map(i => {
              return <Item
                      key={i.id}
                      title={i.title}
                      description={i.description}
                      image={i.image}
                      genre={i.genre}
                    />
            }) :
            searchData.map(i => {
              return <Item
                      key={i.id}
                      title={i.title}
                      description={i.description}
                      image={i.image}
                      genre={i.genre}
                    />
            })
          }
        </section>
      </main>
      <footer>@HollywoodWatch</footer>
    </div>
  );
}

export default App;
