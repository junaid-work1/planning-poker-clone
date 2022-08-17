import { useState } from 'react'

import { contactBtnStyle } from 'constants/customStyle'
import Button from 'components/elements/Button'
import ContactModal from 'components/contactModal/ContactModal'
import ContactUs from 'assets/images/Contact-us.svg'

const Contact = () => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const handleModal = () => setIsOpen(!modalIsOpen)

  return (
    <>
      <div className='flex justify-center items-center p-10 bg-gray-50'>
        <div className='contact-us-right w-2/4 px-10 py-16 mt-5'>
          <div className='contact-us-content mb-14'>
            <div className='space-y-10'>
              <h1 className='text-4xl font-bold'>Perplexed by Planning Poker Online?</h1>
              <p className='text-gray-500'>
                Get in touch with us today and we’ll happily answer any questions you may have.
                Alternatively, you can visit our FAQ to see if our support team already has the
                answers you’re looking for.
              </p>
              <Button onClick={handleModal} className={contactBtnStyle} title={'Contact Us'} />
            </div>
          </div>
        </div>
        <div className='contact-us-left w-1/3'>
          <img src={ContactUs} alt='Iphone' />
        </div>
      </div>
      <ContactModal handleModal={handleModal} modalIsOpen={modalIsOpen} />
    </>
  )
}

export default Contact
