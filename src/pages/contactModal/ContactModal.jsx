import { useRef } from 'react'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import { contactModalinputList } from 'constants/inputLists'
import Button from 'components/elements/Button'
import Input from 'components/elements/Input'
import { contactModalBtnStyle, contactModalStyles } from 'constants/customStyle'

const ContactModal = ({ handleModal, modalIsOpen }) => {
  const form = useRef()

  const sendEmail = e => {
    e.preventDefault()
    emailjs.sendForm('service_2uwgcxa', 'template_hzah24o', form.current, '5Hq4RD_4RiUF9I990').then(
      result => {
        toast.info(`mail is sent. ${result.text}!`, { theme: 'colored' })
      },
      error => {
        toast.error(`${error.text}!`, { theme: 'colored' })
      }
    )
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      onRequestClose={handleModal}
      style={contactModalStyles}
    >
      <div className='w-full mx-auto p-10 relative'>
        <div
          className='absolute right-0 -top-2 text-gray-600 text-xl hover:bg-gray-200 px-3 py-2 rounded-2xl font-bold cursor-pointer'
          onClick={handleModal}
        >
          X
        </div>
        <form ref={form} onSubmit={sendEmail}>
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
            />
          </div>
          <Button className={contactModalBtnStyle} type='submit' title='Contact Us' />
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
