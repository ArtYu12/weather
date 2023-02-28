import stylesForHeader from './header.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
const dispatch = useDispatch()
const lang = useSelector(state => state.language);

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
        document.getElementById("city").textContent = lang.city+": "+city;
      } else {
        city = city.substring(0,cut);
        document.getElementById("city").textContent = lang.city+": "+city;
      }
    })
    .catch(error => console.log(error));
}
getLocation();


const switchLang = (lang) => {
  dispatch({type:'SWITCH_LANG',lang:lang});
}






let newPostElement = React.useRef(null);
let speak = (e)  => {
    let text = e.target.innerText;
    let speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}    

  return (
    <header className={stylesForHeader.header}>
        <h1 className={stylesForHeader.h1}>Weather</h1>
        <p className={stylesForHeader.p} ref={newPostElement}>{lang.motto}</p>
        <ul className={stylesForHeader.ul}>
          <li className={stylesForHeader.a} onClick={() => switchLang('ru')}>Русский</li>
          <li className={stylesForHeader.a} onClick={() => switchLang('en')}>English</li>
          <li className={stylesForHeader.a} onClick={() => switchLang('kz')}>Қазақ</li>
        </ul>
      <span id='city'className={stylesForHeader.span}></span>
    </header>
  );
}

export default Header;