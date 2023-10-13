import React from 'react'
import { BsTwitter} from 'react-icons/bs'
import { GoHomeFill} from 'react-icons/go'
import { FiSearch } from 'react-icons/fi'
import { BiBell } from 'react-icons/bi'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import { TbNotes } from 'react-icons/tb'
import { AiOutlineUser } from 'react-icons/ai'
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"]})

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
  }
]

export default function Home() {
  return (
    <div className={inter.className}>
      <div className='grid grid-cols-12 h-screen w-screen px-56'>
        <div className='col-span-3 pt-8 px-4'>
          <div className="h-fit w-fit text-4xl hover:bg-gray-800 rounded-full p-2 px-5 cursor-pointer transition-all">
            <BsTwitter/>
          </div>
          <div className='mt-4 text-2xl'>
            <ul>
              {sidebarMenuItems.map(item => 
                <li className='flex mt-2 justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer' key={item.title}>
                  <span>{item.icon}</span><span>{item.title}</span>
                </li>
              )}
            </ul>
            <div className='mt-5 pr-4'>
              <button className='bg-[#1d9bf0] font-semibold text-lg p-4 rounded-full w-full'>Tweet</button>
            </div>
          </div>
        </div>
        <div className='col-span-6 border-l-[0.2px] border-r-[0.2px] border-gray-400'></div>
        <div className='col-span-3'></div>
      </div>
    </div>
  )
}
