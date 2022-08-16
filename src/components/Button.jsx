import PropTypes from 'prop-types'

const Button = ({ title, ...rest }) => (
  <button
    {...rest}
    className='text-blue-400 font-bold px-6 py-2 border-2 border-solid border-blue-400 rounded-md hover:bg-blue-50'
  >
    {title}
  </button>
)

Button.propTypes = {
  handleModal: PropTypes.func,
  title: PropTypes.string
}
export default Button
