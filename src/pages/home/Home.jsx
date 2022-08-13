import Brands from 'components/brands/Brands'
import Contact from 'components/contact/Contact'
import Footer from 'components/footer/Footer'
import GameSteps from 'components/gameSteps/GameSteps'
import HeroPage from 'components/hero-page/HeroPage'
import Navbar from 'components/navbar/Navbar'
import Planning from 'components/planning/Planning'

const Home = () => (
  <>
    <Navbar />
    <HeroPage />
    <Planning />
    <GameSteps />
    <Brands />
    <Contact />
    <Footer />
  </>
)

export default Home
