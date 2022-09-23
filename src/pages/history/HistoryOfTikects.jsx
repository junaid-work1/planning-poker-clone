import { useParams } from 'react-router-dom'
import { MdDeleteOutline } from 'react-icons/md'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import { deleteVoteToStore } from 'services/firebase'
import { votingHistoryStyles } from 'constants/customStyle'

const HistoryOfTikects = ({ handleModal, modalIsOpen, voteList }) => {
  let { id } = useParams()

  return (
    <Modal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      onRequestClose={handleModal}
      style={votingHistoryStyles}
    >
      <p className='text-center font-bold'>Voting History</p>
      <p
        className='absolute text-white right-5 top-2 bg-gray-400 py-1.5 px-3 rounded-2xl font-bold cursor-pointer'
        onClick={handleModal}
      >
        X
      </p>
      <div className='mt-10'>
        <table className='w-full text-sm text-center'>
          <thead className='bg-gray-300'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                Issue
              </th>
              <th scope='col' className='py-3 px-6'>
                Average Points
              </th>
              <th scope='col' className='py-3 px-6'>
                Players voted / Total
              </th>
              <th scope='col' className='py-3 px-6'>
                Time
              </th>
              <th scope='col' className='py-3 px-6'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {voteList?.map((item, index) => (
              <tr
                className='bg-gray-100 hover:bg-gray-200 cursor-pointer'
                key={index.toString() + 1}
              >
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-black whitespace-nowrap dark:text-black'
                >
                  {item.issueTitle}
                </th>
                <td className='py-4 px-6'>{item.average}</td>
                <td className='py-4 px-6'>{item.playerCount}</td>
                <td className='py-4 px-6'>{item.createdAt.toDate().toString()}</td>
                <td
                  className='py-4 px-6 text-lg text-red-500 flex items-center cursor-pointer'
                  onClick={() => {
                    deleteVoteToStore(item.id, id)
                  }}
                >
                  <MdDeleteOutline /> <span className='text-sm'>/ Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}

HistoryOfTikects.propTypes = {
  handleModal: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  voteList: PropTypes.array
}

export default HistoryOfTikects
