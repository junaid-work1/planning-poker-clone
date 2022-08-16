import Modal from 'react-modal'
import PropTypes from 'prop-types'

import Input from 'components/elements/Input'
import Button from 'components/elements/Button'

const customStyles = {
  content: {
    borderRadius: '20px',
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%'
  },
  overlay: {
    background: 'rgba(71,84,93,0.8)'
  }
}

const ContactModal = ({ handleModal, modalIsOpen }) => {
  const inputList = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Your name (optional)',
      styling: 'w-full mt-1 mb-3 p-2 border-2 border-gray-300 rounded-md'
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Your email (optional)',
      styling: 'w-full mt-1 mb-3 p-2 border-2 border-gray-300 rounded-md'
    }
  ]

  const btnStyle =
    'h-10 w-full px-5 text-white font-bold bg-blue-500 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-blue-300'

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={handleModal} style={customStyles}>
      <div className='w-full mx-auto p-10 relative'>
        <div
          className='absolute right-0 -top-2 text-gray-600 text-xl hover:bg-gray-200 px-3 py-2 rounded-2xl font-bold cursor-pointer'
          onClick={handleModal}
        >
          X
        </div>
        <form>
          <div className='mb-10'>
            {inputList.map(item => (
              <Input
                name={item.name}
                type={item.type}
                placeholder={item.placeholder}
                className={item.styling}
                key={item.name}
                required
              />
            ))}
            <textarea
              name='message'
              className='w-full mt-1 mb-3 p-2 border-2 border-gray-300 rounded-md'
              placeholder='Message'
              required
            ></textarea>
          </div>
          <Button type={'submit'} title={'Contact Us'} className={btnStyle} />
        </form>
      </div>
    </Modal>
  )
}

ContactModal.propTypes = {
  handleModal: PropTypes.func,
  modalIsOpen: PropTypes.bool
}

export default ContactModal
