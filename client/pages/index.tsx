import React, { useCallback } from 'react'
import { BsTwitter} from 'react-icons/bs'
import { GoHomeFill} from 'react-icons/go'
import { FiSearch } from 'react-icons/fi'
import { BiBell } from 'react-icons/bi'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import { TbNotes } from 'react-icons/tb'
import { AiOutlineUser } from 'react-icons/ai'
import { CiCircleMore } from 'react-icons/ci'
import FeedCard from './components/FeedCard'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'

interface SidebarButton {
  title: string,
  icon: React.ReactNode
}

const sidebarMenuItems: SidebarButton[] = [
  {
    title: 'Home',
    icon: <GoHomeFill />
  },
  {
    title: 'Explore',
    icon: <FiSearch />
  },
  {
    title: 'Notification',
    icon: <BiBell />
  },
  {
    title: 'Messages',
    icon: <HiOutlineEnvelope />
  },
  {
    title: 'Lists',
    icon: <TbNotes />
  },
  {
    title: 'Profile',
    icon: <AiOutlineUser />
  },
  {
    title: 'More',
    icon: <CiCircleMore />
  }
]

export default function Home() {

  const handleLoginWithGoogle = useCallback((cred : CredentialResponse) => {

  }, [])

  return (
    <div>
      <div className='grid grid-cols-12 h-screen w-screen px-20'>
        <div className='col-span-3 pt-1 px-4 pl-14'>
          <div className="h-fit w-fit text-4xl hover:bg-gray-800 rounded-full p-2 px-5 cursor-pointer transition-all">
            <BsTwitter/>
          </div>
          <div className='mt-4 text-xl'>
            <ul>
              {sidebarMenuItems.map(item => 
                <li className='flex mt-2 justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer' key={item.title}>
                  <span>{item.icon}</span><span>{item.title}</span>
                </li>
              )}
            </ul>
            <div className='mt-5 pr-4'>
              <button className='bg-[#1d9bf0] font-semibold text-lg p-4 rounded-full w-full'>Tweet</button>
            </div>
          </div>
        </div>
        <div className='col-span-5 h-screen overflow-scroll border-l-[0.2px] border-r-[0.2px] border-gray-600'>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className='col-span-3 p-5'>
          <div className="border p-5 bg-slate-700 rounded-lg">
            <h1 className='my-2 text-2xl'>New to Twitter?</h1>
            <GoogleLogin onSuccess={cred => console.log(cred)} />
          </div>
        </div>
      </div>
    </div>
  )
}
