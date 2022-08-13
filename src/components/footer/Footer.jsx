import { FaCanadianMapleLeaf } from 'react-icons/fa'

const Footer = () => (
  <div className='footer-main bg-color-dark-blue w-full h-96'>
    <div className='flex justify-around items-center'>
      <div className='footer-right h-60 mt-14 flex space-x-3'>
        <span className='text-4xl text-blue-500'>
          <FaCanadianMapleLeaf />
        </span>
        <div>
          <p className='font-bold text-blue-500 text-xl'>we agile you</p>
          <p className='text-white text-sm font-bold'>Planning Poker Online</p>
        </div>
      </div>
      <div className='footer-left flex space-x-20'>
        <ul className='text-white space-y-6 '>
          <li className='text-2xl font-bold'>Product</li>
          <li className='text-gray-400 hover:text-white cursor-pointer'>Start new game</li>
          <li className='text-gray-400 hover:text-white cursor-pointer'>FAQs</li>
          <li className='text-gray-400 hover:text-white cursor-pointer'>Terms</li>
        </ul>
        <ul className='text-white space-y-6'>
          <li className='text-2xl font-bold'>Connect</li>
          <li className='text-gray-400 hover:text-white cursor-pointer'>Contact us</li>
          <li className='text-gray-400 hover:text-white cursor-pointer'>LinkedIn</li>
          <li className='text-gray-400 hover:text-white cursor-pointer'>What is planning poker?</li>
        </ul>
        <ul className='text-white space-y-6'>
          <li className='text-2xl font-bold'>Legal</li>
          <li className='text-gray-400 hover:text-white cursor-pointer'>Legal notice</li>
          <li className='text-gray-400 hover:text-white cursor-pointer'>Cookie policy</li>
          <li className='text-gray-400 hover:text-white cursor-pointer'>Privacy policy</li>
        </ul>
      </div>
    </div>
    <p className='text-center text-gray-400'>We Agile You ®</p>
  </div>
)

export default Footer
