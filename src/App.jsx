import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Inauguration from './components/Inauguration'
import About from './components/About'
import Menu from './components/Menu'
import Cocktails from './components/Cocktails'
import Gallery from './components/Gallery'
import Reservation from './components/Reservation'
import Footer from './components/Footer'
import './App.scss'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Inauguration />
        <About />
        <Menu />
        <Cocktails />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
    </>
  )
}

export default App
