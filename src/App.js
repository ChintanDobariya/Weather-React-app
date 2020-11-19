import React, {useState} from "react";
import "./styles.css";
//console.log(process.env.REACT_APP_API_KEY)
 const App = () => {
   
  
  const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
  };

  const [query, setQuery] = useState("");
  const [weather,setWeather] = useState({});

  const search = e =>{
    if(e.key ==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");  
          console.log(result);
        });
    }
  }

  const Todaysdate = d =>{
    let date = d.toDateString();
    return `${date}`;
  }

  const handleClass = (typeof weather.main !=="undefined") 
                        ? ((weather.weather[0].main === "Rain") 
                              ? 'app rain' 
                              : ((weather.main.temp>22) 
                                    ? 'app warm' 
                                    : 'app')
                          )
                        : 'app';


  return (
    // <div className={(typeof weather.main !=="undefined") ? ((weather.main.temp>22) ? 'app warm': 'app'): 'app'}>
    <div className={handleClass}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          /> 
        </div>
        {(typeof weather.main !== "undefined") ? (
          <div>  
            <div className="location-box">
                <div className="location"> {weather.name}, {weather.sys.country}</div>
                <div className="date">{Todaysdate(new Date())}</div>
            </div>
            
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (" ")} 
      </main>
    </div>
  );
}

export default App;