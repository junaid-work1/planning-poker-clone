import Modal from 'react-modal'
import PropTypes from 'prop-types'

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
  }
}

const ContactModal = ({ handleModal, modalIsOpen }) => {
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={handleModal} style={customStyles}>
      <div className='w-full mx-auto p-10 relative'>
        <div
          className='absolute right-0 -top-2 hover:bg-gray-200 px-3 py-2 rounded-2xl font-bold cursor-pointer'
          onClick={handleModal}
        >
          X
        </div>
        <form>
          <div className='mb-10'>
            <input
              type='text'
              name='name'
              className='w-full mt-1 mb-3 p-2 border-2 border-gray-300 rounded-md'
              placeholder='Your name (optional)'
            />
            <input
              name='email'
              type='email'
              className='w-full mt-1 mb-3 p-2 border-2 border-gray-300 rounded-md'
              placeholder='Your email (optional)'
              required
            />
            <textarea
              name='message'
              className='w-full mt-1 mb-3 p-2 border-2 border-gray-300 rounded-md'
              placeholder='Message'
            ></textarea>
          </div>
          <button
            type='submit'
            className='h-10 w-full px-5 text-white font-bold bg-blue-500 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-blue-300'
          >
            Contact Us
          </button>
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
