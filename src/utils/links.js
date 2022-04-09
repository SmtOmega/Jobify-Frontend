import {IoBarChartSharp} from 'react-icons/io5'
import {ImProfile} from 'react-icons/im'
import { FaWpforms } from 'react-icons/fa'
import {MdQueryStats} from 'react-icons/md'

export const links = [
    {id: 1, text: 'Stats', path: '/', icon : <IoBarChartSharp />},
    {id: 2, text: 'All Jobs', path: 'all-jobs', icon : <MdQueryStats />},
    {id: 3, text: 'Add Job', path: 'add-job', icon : <FaWpforms />},
    {id: 4, text: 'Profile', path: 'profile', icon : <ImProfile />},

]