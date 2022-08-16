import PropTypes from 'prop-types'

const Button = ({ title, ...rest }) => <button {...rest}>{title}</button>

Button.propTypes = {
  title: PropTypes.string
}
export default Button
