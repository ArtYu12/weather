import stylesForMain from './main.module.css';
import {useSelector } from 'react-redux';
import React,{useEffect,useRef} from 'react';



const Main = () => {


  const lang = useSelector(state => state.language);
  const audio_lang = useSelector(state => state.audio_lang);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var apikey = '35651bff673244bb9be2efcae3abcb99';
    var url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apikey}&no_annotations=1`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var city = data.results[0].components.city;
        city = city.trim()
        var cut = city.indexOf(' ');

        if(cut === -1) {
          document.getElementById("city-weather").textContent = city;
        } else {
          city = city.substring(0,cut);
          document.getElementById("city-weather").textContent = city;
        }

      })
      .catch(error => console.log(error));
  }
  getLocation();

  function getWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showWeather);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showWeather(position) {
  const url = 'https://ssfawe1.pythonanywhere.com/weather';
  const long = position.coords.longitude;
  const lat = position.coords.latitude;
  const params = {
    long,
    lat,
  };

  const query = new URLSearchParams(params).toString();

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch(`${url}?${query} `,options)
    .then(response => response.json())
    .then((data => {
      var weather = data.weather.temp;
      weather = Math.round(weather);

      var pressure = data.weather.pressure;
      pressure = String(pressure).substring(0,4);

      var humidity = data.weather.humidity;
      var wind_direction = data.weather.wind_direction;
      var wind_speed = data.weather.wind_speed;
      var feels_like = data.weather.feels_like;
      feels_like = Math.round(feels_like);
    
      if(data) 
        document.getElementById("weatherdiv").textContent = weather+"°";
        document.getElementById("pressurediv").textContent = lang.pressure+": "+pressure;
        document.getElementById("humiditydiv").textContent = lang.humidity+": "+humidity;
        document.getElementById("wind_directiondiv").textContent = lang.wind_direction+": "+wind_direction;
        document.getElementById("wind_speeddiv").textContent = lang.wind_speed+": "+wind_speed+lang.wind_speedE;
        document.getElementById("feels_likediv").textContent = lang.feels_like+": "+feels_like+"°";
        
    }))
    .catch(error => console.error(error));

}
getWeather();








/*

  let state = {
    error:null,
    isLoaded:false,
    items:[]
  };
  let componentDidMount = () => {
    fetch('https://ssfawe1.pythonanywhere.com/weather')
    .then(res => res.json())
    .then (
      (result) => {
        state({
          isLoaded:true,
          items: result.weather
        });
      },
      (error) => {
        state ({
          isLoaded:true,
          error
      });
      }
    )
  }
  componentDidMount();
  console.log(state);
*/
/*
gettingWeather = async () => {
  const api_url = await fetch('https://ssfawe1.pythonanywhere.com/weather');
  const data = await api_url.json();
  
}*/







/*

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const url = 'https://ssfawe1.pythonanywhere.com/weather';
  const long = position.coords.longitude;
  const lat = position.coords.latitude;
  const params = {
    long,
    lat,
  };
  const query = new URLSearchParams(params).toString();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const request = new XMLHttpRequest();
  request.open("GET",`${url}?${query} `, options);
  request.send();
  request.onload = () => {
    console.log(request);
    if(request.status === 200) {
      console.log(request.response)
    } else {
      console.log(`error ${request.status}`);
    }
  }
  

/*
    return fetch(`${url}?${query} `)
    .then(response =>{
      return response.json();
    }).then(json =>{
      return console.log(json);
    } )
    .catch(error => console.error(error));

    async function getUsers() {
      let response = await fetch(`${url}?${query} `);
      let data = await response.json();
      return data;
    }

  getUsers().then(response =>{
    console.log(response)
  })
}
showPosition()
*/










  let audioNode = useRef();
  let pNode = useRef();

  let audioNode1 = useRef();
  let pNode1 = useRef();
  
  let audioNode2 = useRef();
  let pNode2 = useRef();

  let audioNode3 = useRef();
  let pNode3 = useRef();

  useEffect(() => {
    pNode1.current.addEventListener("click", function () {
      audioNode1.current.src = '/audio-clarity/'+'clarity'+audio_lang+'.mp3';
      audioNode1.current.play();

  });
  },[audio_lang]);

  useEffect(() => {
    pNode2.current.addEventListener("click", function () {
      audioNode2.current.src = '/audio-actuality/'+'actuality'+audio_lang+'.mp3';
      audioNode2.current.play();
  });
  },[audio_lang]);
  useEffect(() => {
    pNode3.current.addEventListener("click", function () {
      audioNode3.current.src = '/audio-weakness/'+'weakness'+audio_lang+'.mp3';
      audioNode3.current.play();
  });
  },[audio_lang]);

  useEffect(() => {
    pNode.current.addEventListener("click", function () {
      audioNode.current.src = '/audio-par/'+'par'+audio_lang+'.mp3';
      audioNode.current.play();
  });
  },[audio_lang]);


  const video = useRef();


  useEffect(() => {
    video.current.addEventListener("ended", function () {
      video.current.pause();
      video.current.time = 0;
      video.current.play();
  });
  },[]);

  let load = () => {
    audioNode.current.currentTime = 0;
    audioNode.current.pause();

    audioNode1.current.currentTime = 0;
    audioNode1.current.pause();

    audioNode2.current.currentTime = 0;
    audioNode2.current.pause();

    audioNode3.current.currentTime = 0;
    audioNode3.current.pause();
  }

  return (
    <main className={stylesForMain.main}>
        <div className={stylesForMain.div}>
            <button className={stylesForMain.button} onClick={load} title={lang.title}>| |</button>
        </div>
      <nav>
        <ul className={stylesForMain.ul}>
          <li>
            <a tabIndex="0" href="#weather" className={stylesForMain.a}>{lang.weather}</a>
          </li>
          <li>
            <a tabIndex="0" href="#importance" className={stylesForMain.a}>{lang.importance}</a>
          </li>
          <li>
            <a tabIndex="0" href="#features" className={stylesForMain.a}>{lang.features}</a>
          </li>
        </ul>
      </nav>
      <h2 id="weather">{lang.weather}</h2>
      <figure>
        <figcaption>
          <h4 id="city-weather"></h4>
          <b id='weatherdiv'></b>
          <span id='feels_likediv'></span>
          <ul>
            <li id='humiditydiv'></li>
            <li id='pressurediv'></li>
            <li id='wind_directiondiv'></li>
            <li id='wind_speeddiv'></li>
            
          </ul>
        </figcaption>
        <video ref={video} autoPlay="autoplay" src="/weather.mp4" width="640" height="360" muted="muted"></video>
      </figure>
      
      <h2 id="importance">{lang.importance}</h2>
      <article ref={pNode} className='wow animate__animated animate__bounceIn'>
        <p>{lang.par}</p>
        <ul>
            <li>{lang.parli1}</li>
            <li>{lang.parli2}</li>
            <li>{lang.parli3}</li>
            <li>{lang.parli4}</li>
        </ul>
        <p>{lang.parend}</p>
        <audio ref={audioNode}></audio>
      </article>
      
      <h2 id="features">{lang.features}</h2>
      <ul className={stylesForMain.info}>
        <li className='wow animate__animated animate__backInUp'>
          <h3 className={stylesForMain.infoh}>{lang.weakness}</h3>
          <p ref={pNode3} className={stylesForMain.infop}>{lang.weaknessp}<audio ref={audioNode3}></audio></p>
        </li>
        <li className='wow animate__animated animate__backInUp'>
          <h3 className={stylesForMain.infoh}>{lang.actuality}</h3>
          <p ref={pNode2} className={stylesForMain.infop}>{lang.actualityp}<audio ref={audioNode2}></audio></p>
        </li>
        <li className='wow animate__animated animate__backInUp'>
          <h3 className={stylesForMain.infoh}>{lang.сlarity}</h3>
          <p ref={pNode1} className={stylesForMain.infop}>{lang.сlarityp} <audio ref={audioNode1}></audio> </p>
        </li>
      </ul>
    </main>
  );
}
export default Main;