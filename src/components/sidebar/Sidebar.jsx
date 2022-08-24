import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BiNotepad } from 'react-icons/bi'
import { onSnapshot } from 'firebase/firestore'

import { addIssueToStore, deleteIssueToStore, getIssueFromStore } from 'services/firebase'
import Button from 'components/elements/Button'
import Input from 'components/elements/Input'

const Sidebar = () => {
  let { id } = useParams()

  const [showSidebar, setShowSidebar] = useState(false)
  const [showIssueBox, setShowIssueBox] = useState(false)
  const [issueTitle, setIssueTitle] = useState('')
  const [issueList, setIssueList] = useState([])

  const issueStateHandler = () => setShowIssueBox(!showIssueBox)
  const showStateHandler = () => setShowSidebar(!showSidebar)

  const handleChange = async e => {
    setIssueTitle(e.target.value)
  }

  const handleDeleteIssue = async issueId => {
    await deleteIssueToStore(issueId, id)
  }

  const handleSubmit = async () => {
    if (issueTitle) {
      addIssueToStore(id, issueTitle)
    }
    setIssueTitle('')
  }

  const getIssue = async () => {
    onSnapshot(getIssueFromStore(id), querySnapshot => {
      const activeIssues = []
      querySnapshot.forEach(doc => {
        activeIssues.push(doc.data())
      })
      setIssueList(activeIssues)
    })
  }

  useEffect(() => {
    getIssue()
  }, [id])

  const CrossBtn = (
    <Button
      className='text-3xl text-gray-400 items-center cursor-pointer fixed right-10 top-6 z-50'
      onClick={showStateHandler}
      title='x'
    />
  )

  const hamburgerMenu = (
    <span
      className='cursor-pointer text-blue-500 border-2 border-blue-500 p-2 rounded-lg text-3xl'
      onClick={showStateHandler}
    >
      <BiNotepad />
    </span>
  )

  const issueDiv = (
    <div
      className='flex space-x-2 text-gray-500 p-2 rounded-md cursor-pointer mb-4 hover:bg-gray-100 text-lg'
      onClick={issueStateHandler}
    >
      <span>+</span>
      <p>Add an issue</p>
    </div>
  )

  const issueDivElement = (
    <>
      <Input
        type='text'
        value={issueTitle}
        placeholder='Enter a title for the issue'
        className='bg-gray-200 w-full h-24 p-3 text-black rounded-lg mb-3'
        onChange={handleChange}
      />

      <div className='space-x-2'>
        <Button
          className='px-8 py-2 text-blue-500 border-2 border-gray-200 rounded-lg font-bold hover:bg-blue-200'
          onClick={issueStateHandler}
          title='Cancel'
        />
        <Button
          className='bg-blue-500 px-10 py-2.5 rounded-lg font-bold hover:bg-blue-400'
          onClick={handleSubmit}
          title=' Save'
        />
      </div>
    </>
  )

  return (
    <>
      {showSidebar ? CrossBtn : hamburgerMenu}

      <div
        className={`top-0 right-0 shadow-lg bg-white p-10 pl-20 text-white fixed h-full z-40 overflow-y-auto ease-in-out duration-300 ${
          showSidebar ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <h3 className='mt-20 w-60 text-4xl font-semibold text-black mb-6'>Issues</h3>
        {issueList?.map(item => (
          <div
            className='sidebar-issue-box relative flex flex-col bg-gray-200 w-full h-24 p-3 text-black rounded-lg mb-3'
            key={item?.id}
          >
            <p
              className='w-6 absolute right-3 text-center rounded-lg test hover:bg-gray-400 cursor-pointer'
              onClick={() => handleDeleteIssue(item?.id)}
            >
              X
            </p>
            <span>{item?.title}</span>
          </div>
        ))}

        {!showIssueBox ? issueDiv : issueDivElement}
      </div>
    </>
  )
}

export default Sidebar
