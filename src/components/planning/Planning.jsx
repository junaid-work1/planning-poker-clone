import csv from 'assets/images/csv.webp'
import facilitators from 'assets/images/facilitators.webp'
import Iphone from 'assets/images/iphone.webp'
import Issues from 'assets/images/issues.webp'
import jira from 'assets/images/jira.webp'
import Result from 'assets/images/results.webp'
import Vote from 'assets/images/voting.webp'

const Planning = () => {
  const posts = [
    {
      id: 1,
      title: 'Vote and Estimate Issues in Real-Time',
      des: 'Our crisp and clean interface is not only easy-to-use, but also enables outstanding team engagement for development project estimates.',
      image: Vote
    },
    {
      id: 2,
      title: 'Voting Round Visual Results at a Glance',
      des: 'With Poker Planner Online, results are quick and super-easy to understand – while still providing in-depth and high-quality insights.',
      image: Result
    },
    {
      id: 3,
      title: 'In-Game Issue Management',
      des: 'As the scrum poker leader, our sidebar enables you to streamline the issues your agile development team is currently working on.',
      image: Issues
    },
    {
      id: 4,
      title: 'Effortless JIRA Integration',
      des: 'Access to import project development issues directly from JIRA. For complete integration, our platform also allows you to export and easily save your voting results back into JIRA in just one click.',
      image: jira
    },
    {
      id: 5,
      title: 'Import issues from CSV File or Pasting a list of URLs',
      des: 'Either upload your CSV files or paste several of your issue’s URLs directly into any game and start your project estimation voting process.',
      image: csv
    },
    {
      id: 6,
      title: 'The Single Solution for Organizations of All Sizes',
      des: 'Manage all of your various facilitators’ licenses from one single account.',
      image: facilitators
    }
  ]

  return (
    <div className='planning-main w-full bg-gray-50 mb-20'>
      <div className='planning-title text-center space-y-6 pt-20'>
        <h1 className='text-4xl font-bold'>Stop boring plannings</h1>
        <p className='text-gray-600'>
          We give you the confidence that your team is connected and stays productive.
        </p>
      </div>
      {posts.map(({ id, title, des, image }) => (
        <div
          className={`flex justify-center items-center mt-10 p-10 ${
            id % 2 === 0 ? 'flex-row-reverse' : ''
          }`}
          key={id}
        >
          <div className='planning-right w-2/4 flex flex-col px-10 py-16 mt-5'>
            <div className='planning-content space-y-6 mb-14'>
              <div className=' space-y-6'>
                <h1 className='text-4xl font-bold'>{title}</h1>
                <p className='text-gray-500'>{des}</p>
              </div>
            </div>
          </div>
          <div className='planning-left w-2/4'>
            <img src={image} alt='Result' className='shadow-2xl rounded-lg' />
          </div>
        </div>
      ))}
      <div className='flex flex-row-reverse justify-center items-center mt-10 p-10 '>
        <div className='planning-right w-2/4 flex flex-col px-10 py-16 mt-5'>
          <div className='planning-content space-y-6 mb-14'>
            <div className=' space-y-6'>
              <h1 className='text-4xl font-bold'>Stay on Top of Estimates On-The-Go</h1>
              <p className='text-gray-500'>
                We’ve ensured the Planning Poker Online web app is compatible on all devices. Now,
                you and your agile development team can vote on any issue, anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
        <div className='planning-left w-1/3'>
          <img src={Iphone} alt='Iphone' />
        </div>
      </div>
    </div>
  )
}

export default Planning
