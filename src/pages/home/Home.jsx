import PropTypes from 'prop-types'

import Brands from 'components/brands/Brands'
import Contact from 'components/contact/Contact'
import Footer from 'components/footer/Footer'
import GameSteps from 'components/gameSteps/GameSteps'
import HeroPage from 'components/hero-page/HeroPage'
import Navbar from 'components/navbar/Navbar'
import Planning from 'components/planning/Planning'

const Home = ({ activeUser, getDisplayName, userEmail }) => (
  <>
    <Navbar activeUser={activeUser} getDisplayName={getDisplayName} userEmail={userEmail} />
    <HeroPage />
    <Planning />
    <GameSteps />
    <Brands />
    <Contact />
    <Footer />
  </>
)

Home.propTypes = {
  activeUser: PropTypes.string,
  getDisplayName: PropTypes.func,
  userEmail: PropTypes.string
}

export default Home
