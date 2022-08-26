import { FaCanadianMapleLeaf } from 'react-icons/fa'

import { footerListItem } from 'constants/inputLists'

const Footer = () => (
  <div className='footer-main bg-color-dark-blue sm:w-full h-96'>
    <div className='flex justify-around items-center'>
      <div className='footer-right h-60 mt-14 flex sm:space-x-3'>
        <span className='text-4xl text-blue-500'>
          <FaCanadianMapleLeaf />
        </span>
        <div>
          <p className='font-bold text-blue-500 text-xl'>we agile you</p>
          <p className='text-white text-sm font-bold'>Planning Poker Online</p>
        </div>
      </div>
      <div className='footer-left flex sm:space-x-20'>
        {footerListItem.map((item, index) => (
          <ul className='text-white space-y-6' key={index.toString() + 1}>
            {item.map((subItem, subIndex) => (
              <li
                className={`${
                  subIndex === 0
                    ? 'text-2xl font-bold'
                    : 'text-gray-400 hover:text-white cursor-pointer'
                }`}
                key={subIndex.toString() + 1}
              >
                {subItem}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
    <p className='text-center text-gray-400'>We Agile You ®</p>
  </div>
)

export default Footer
