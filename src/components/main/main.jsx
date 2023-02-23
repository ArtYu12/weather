import stylesForMain from './main.module.css';
import {useSelector } from 'react-redux';
import React,{useEffect,useRef} from 'react';



const Main = () => {
  const lang = useSelector(state => state.language);
  const audio_lang = useSelector(state => state.audio_lang);

  
  let audioNode = useRef();
  let pNode = useRef();

  useEffect(() => {
    pNode.current.addEventListener("click", function () {
      audioNode.current.src = '/audio-par/'+'par'+audio_lang+'.mp3';
      audioNode.current.play();
  });
  },[audio_lang]);


  const video = useRef();


  useEffect(() => {
    video.current.addEventListener("ended", function () {
      video.current.pause()
      video.current.time = 0;
      video.current.play()
  });
  },[]);

  return (
    <main className={stylesForMain.main}>
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
          <li>
            <a tabIndex="0" href="#" className={stylesForMain.a}>Что то</a>
          </li>
        </ul>
      </nav>
      <h2 id="weather">{lang.weather}</h2>
      <figure>
        <figcaption>Блок</figcaption>
        <video ref={video} autoplay="autoplay" src="/weather.mp4" width="640" height="360" muted="muted"></video>
      </figure>
      
      <h2 id="importance">{lang.importance}</h2>
      <article>
        <p>{lang.par}</p>
<ul>
    <li>{lang.parli1}</li>
    <li>{lang.parli2}</li>
    <li>{lang.parli3}</li>
    <li>{lang.parli4}</li>
</ul>
<p>{lang.parend}</p>

      </article>
      
      <h2 id="features">{lang.features}</h2>
      <ul className={stylesForMain.info}>
        <li className={stylesForMain.infoli}>
          <h3 className={stylesForMain.infoh}>{lang.weakness}</h3>
          <p className={stylesForMain.infop}>{lang.weaknessp}<audio ></audio></p>
        </li>
        <li className={stylesForMain.infoli}>
          <h3 className={stylesForMain.infoh}>{lang.actuality}</h3>
          <p className={stylesForMain.infop}>{lang.actualityp}<audio></audio></p>
        </li>
        <li className={stylesForMain.infoli}>
          <h3 className={stylesForMain.infoh}>{lang.сlarity}</h3>
          <p ref={pNode} className={stylesForMain.infop}>{lang.сlarityp} <audio ref={audioNode}></audio> </p>
        </li>
      </ul>
      <h2>Что то </h2>
    </main>
  );
}
export default Main;