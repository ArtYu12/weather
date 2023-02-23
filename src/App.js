import './App.css';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
const App = (props) => {
  return (
    <div>
        <Header />
        <Main />
        <Footer/>
    </div>
  );
}

export default App;
