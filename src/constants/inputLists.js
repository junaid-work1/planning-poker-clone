import csv from 'assets/images/csv.webp'
import facilitators from 'assets/images/facilitators.webp'
import Invite from 'assets/images/invite.svg'
import Issues from 'assets/images/issues.webp'
import jira from 'assets/images/jira.webp'
import Result from 'assets/images/results.webp'
import StartGame from 'assets/images/startGame.svg'
import Vote from 'assets/images/vote.svg'
import Votes from 'assets/images/voting.webp'

export const contactModalinputList = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Your name (optional)',
    styling: 'w-full mt-1 mb-3 p-2 border-2 border-gray-300 rounded-md'
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Your email (optional)',
    styling: 'w-full mt-1 mb-3 p-2 border-2 border-gray-300 rounded-md'
  }
]

export const footerListItem = [
  ['Product', 'Start new game', 'FAQs', 'Terms'],
  ['Connect', 'Contact us', 'LinkedIn', 'What is planning poker?'],
  ['Legal', 'Legal notice', 'Cookie policy', 'Privacy policy']
]

export const gameStepsArray = [
  {
    title: 'Step 1. Initiate a New Game',
    subtitle: 'Start new game',
    des: ' with the option to add your issues right off the bat.',
    image: StartGame
  },
  {
    title: 'Step 2: Invite Your Agile Development Team',
    des: 'Send your new game URL to your people and let the game begin.',
    image: Invite
  },
  {
    title: 'Step 3: Vote!',
    des: 'Enjoy every aspect of our online scrum planning poker – and have fun while being productive!',
    image: Vote
  }
]

export const planningPostsArray = [
  {
    id: 1,
    title: 'Vote and Estimate Issues in Real-Time',
    des: 'Our crisp and clean interface is not only easy-to-use, but also enables outstanding team engagement for development project estimates.',
    image: Votes
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

export const Fibonacci = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '5', value: 5 },
  { label: '8', value: 8 },
  { label: '13', value: 13 },
  { label: '21', value: 21 },
  { label: '34', value: 34 },
  { label: '55', value: 55 },
  { label: '89', value: 89 },
  { label: '?', value: '?' }
]
export const Powers = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '4', value: 4 },
  { label: '8', value: 8 },
  { label: '16', value: 16 },
  { label: '32', value: 32 },
  { label: '64', value: 64 },
  { label: '?', value: '?' }
]

export const status = {
  Started: 'Started',
  NotStarted: 'Not Started',
  InProgress: 'In Progress',
  Finished: 'Finished'
}
