import React, { useEffect, useState } from 'react';
import { Carousel } from '../components/carousel/carousel';
import imgData from '../data/data';
import './App.css';

function App() {

  const [data, setData] = useState([]);

  // data form in Carousel [value1, value2]
  useEffect(() => {
    const newData = imgData.map(el => el.value);
    setData(newData);
  }, []);

  return (
    <div>
      {
        data.length ? <Carousel data={data} dataType={'img'} /> : <h1>wait...</h1>
      }
    </div>
  );
}

export default App;
