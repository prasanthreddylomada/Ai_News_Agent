import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [stateNews, setStateNews] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtNews, setDistrictNews] = useState([]);

  // Refs for scrollable containers
  const statesContainerRef = useRef(null);
  const districtsContainerRef = useRef(null);

  // Fetch states when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/states')
      .then(res => res.json())
      .then(data => setStates(data));
  }, []);

  // Set default selected state after states load
  useEffect(() => {
    if (states.length > 0 && !selectedState) {
      setSelectedState(states[0]._id);
    }
  }, [states, selectedState]);

  // Fetch state news and districts when a state is selected
  useEffect(() => {
    if (selectedState) {
      fetch(`http://localhost:5000/news/state/${selectedState}`)
        .then(res => res.json())
        .then(data => setStateNews(data));

      fetch(`http://localhost:5000/districts/${selectedState}`)
        .then(res => res.json())
        .then(data => setDistricts(data));
      
      // Reset district selection when state changes
      setSelectedDistrict(null);
    }
  }, [selectedState]);

  // Set default selected district after districts load
  useEffect(() => {
    if (districts.length > 0 && !selectedDistrict) {
      setSelectedDistrict(districts[0]._id);
    }
  }, [districts, selectedDistrict]);

  // Fetch district news when a district is selected
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`http://localhost:5000/news/district/${selectedDistrict}`)
        .then(res => res.json())
        .then(data => setDistrictNews(data));
    }
  }, [selectedDistrict]);

  // Scroll functions for states container
  const scrollStatesLeft = () => {
    if (statesContainerRef.current) {
      statesContainerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollStatesRight = () => {
    if (statesContainerRef.current) {
      statesContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  // Scroll functions for districts container
  const scrollDistrictsLeft = () => {
    if (districtsContainerRef.current) {
      districtsContainerRef.current.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };

  const scrollDistrictsRight = () => {
    if (districtsContainerRef.current) {
      districtsContainerRef.current.scrollBy({ left: 550, behavior: 'smooth' });
    }
  };

  return (
    <div className="homepage">
      <h1>My Blog</h1>

      {/* State Buttons with Arrow Navigation */}
      <div className="scroll-wrapper">
        <button className="scroll-button left" onClick={scrollStatesLeft}>❮</button>
        <div className="scroll-container" ref={statesContainerRef}>
          {states.map(state => (
            <button 
              key={state._id} 
              className={`state-button ${selectedState === state._id ? 'active' : ''}`}
              onClick={() => setSelectedState(state._id)}
            >
              {state.name}
            </button>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollStatesRight}>❯</button>
      </div>

      {/* State News */}
      <section className="news-section">
        <h2>State News</h2>
        {stateNews.length ? stateNews.map(news => (
          <div key={news._id} className="news-item">
            <h3>{news.title}</h3>
            <p>{news.content}</p>
          </div>
        )) : <p>Select a state to see news</p>}
      </section>

      {/* District Buttons with Arrow Navigation */}
      {districts.length > 0 && (
        <div className="scroll-wrapper">
          <button className="scroll-button left" onClick={scrollDistrictsLeft}>❮</button>
          <div className="scroll-container" ref={districtsContainerRef}>
            {districts.map(district => (
              <button 
                key={district._id} 
                className={`district-button ${selectedDistrict === district._id ? 'active' : ''}`}
                onClick={() => setSelectedDistrict(district._id)}
              >
                {district.name}
              </button>
            ))}
          </div>
          <button className="scroll-button right" onClick={scrollDistrictsRight}>❯</button>
        </div>
      )}

      {/* District News */}
      <section className="news-section">
        <h2>District News</h2>
        {districtNews.length ? districtNews.map(news => (
          <div key={news._id} className="news-item">
            <h3>{news.title}</h3>
            <p>{news.content}</p>
          </div>
        )) : <p>Select a district to see news</p>}
      </section>
    </div>
  );
}

export default App;
