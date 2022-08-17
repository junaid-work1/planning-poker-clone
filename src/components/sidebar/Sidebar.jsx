import { useState } from 'react'

import { BiNotepad } from 'react-icons/bi'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showIssueBox, setShowIssueBox] = useState(false)

  const issueStateHandler = () => setShowIssueBox(!showIssueBox)
  const showStateHandler = () => setShowSidebar(!showSidebar)

  return (
    <>
      {showSidebar ? (
        <button
          className='text-3xl text-gray-400 items-center cursor-pointer fixed right-10 top-6 z-50'
          onClick={showStateHandler}
        >
          x
        </button>
      ) : (
        <span
          className='cursor-pointer text-blue-500 border-2 border-blue-500 p-2 rounded-lg text-3xl'
          onClick={showStateHandler}
        >
          <BiNotepad />
        </span>
      )}

      <div
        className={`top-0 right-0 shadow-lg bg-white p-10 pl-20 text-white fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <h3 className='mt-20 w-60 text-4xl font-semibold text-black mb-6'>Issues</h3>
        <div className='sidebar-issue-box flex flex-col bg-gray-200 w-full h-24 p-3 text-black rounded-lg mb-3 '>
          <span>issue num</span>
          <span>issue name</span>
        </div>

        {!showIssueBox ? (
          <div
            className='flex space-x-2 text-gray-500 p-2 rounded-md cursor-pointer mb-4 hover:bg-gray-100 text-lg'
            onClick={issueStateHandler}
          >
            <span>+</span>
            <p>Add an issue</p>
          </div>
        ) : (
          <>
            <input
              type='text'
              placeholder='Enter a title for the issue'
              className='bg-gray-200 w-full h-24 p-3 text-black rounded-lg mb-3'
            />
            <div className='space-x-2'>
              <button
                className='px-8 py-2 text-blue-500 border-2 border-gray-200 rounded-lg font-bold hover:bg-blue-200'
                onClick={issueStateHandler}
              >
                Cancel
              </button>
              <button
                className='bg-blue-500 px-10 py-2.5 rounded-lg font-bold hover:bg-blue-400'
                onClick={issueStateHandler}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Sidebar
