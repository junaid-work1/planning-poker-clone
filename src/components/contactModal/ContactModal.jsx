import Modal from 'react-modal'
import PropTypes from 'prop-types'

import { contactModalinputList } from 'constants/inputLists'
import { ContactModalBtnStyle, ContactModalStyles } from 'constants/customStyle'
import Button from 'components/elements/Button'
import Input from 'components/elements/Input'

const ContactModal = ({ handleModal, modalIsOpen }) => (
  <Modal
    isOpen={modalIsOpen}
    ariaHideApp={false}
    onRequestClose={handleModal}
    style={ContactModalStyles}
  >
    <div className='w-full mx-auto p-10 relative'>
      <div
        className='absolute right-0 -top-2 text-gray-600 text-xl hover:bg-gray-200 px-3 py-2 rounded-2xl font-bold cursor-pointer'
        onClick={handleModal}
      >
        X
      </div>
      <form>
        <div className='mb-10'>
          {contactModalinputList.map(item => (
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
        <Button className={ContactModalBtnStyle} type='submit' title='Contact Us' />
      </form>
    </div>
  </Modal>
)

ContactModal.propTypes = {
  handleModal: PropTypes.func,
  modalIsOpen: PropTypes.bool
}

export default ContactModal
