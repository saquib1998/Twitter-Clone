import React, { useCallback, useState } from 'react'
import { BsTwitter} from 'react-icons/bs'
import { GoHomeFill} from 'react-icons/go'
import { FiSearch } from 'react-icons/fi'
import { BiBell, BiImageAlt } from 'react-icons/bi'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import { TbNotes } from 'react-icons/tb'
import { AiOutlineUser } from 'react-icons/ai'
import { CiCircleMore } from 'react-icons/ci'
import FeedCard from './components/FeedCard'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'
import { graphqlClient } from '@/clients/api'
import { verifyUserGoogleTokenQuery } from '@/graphql/queries/user'
import { useCurrentUser } from '@/hooks/user'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useCreatTweet, useGetAllTweets } from '@/hooks/tweet'
import {Tweet} from '@/gql/graphql'

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

  const {user} = useCurrentUser()
  const {tweets = []} = useGetAllTweets()
  const {mutate} = useCreatTweet()

  const [content, setContent] = useState('')

  const queryClient = useQueryClient()

  const handleLoginWithGoogle = useCallback(async (cred : CredentialResponse) => {
    const googleToken = cred.credential
    if(!googleToken) return toast.error('Google token not found');
    
    const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, {token: googleToken});
    toast.success('Verified Success');
    console.log(verifyGoogleToken);

    if(verifyGoogleToken) window.localStorage.setItem('twitter_token', verifyGoogleToken)
    
    await queryClient.invalidateQueries(["current-user"]);
  }, [queryClient])

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*')
    input.click()
  }, [])

  const handleCreateTweet = useCallback(() => {
    mutate({
      content
    })
  }, [content, mutate])

  return (
    <div>
      <div className='grid grid-cols-12 h-screen w-screen px-20'>
        <div className='col-span-3 pt-1 px-4 pl-14 relative'>
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
          {user && <div className='absolute bottom-5 flex gap-2 items-center hover:bg-slate-800 px-3 py-2 rounded-full'>
            {user && user.profileImageUrl &&(
            <Image 
              className="rounded-full" 
              src={user?.profileImageUrl}
              alt="user-image"
              height={50}
              width={50} />
            )}
            <div>
              <h3 className='text-xl'>
                {user.firstName} {user.lastName}
                </h3>
            </div>
          </div>}
        </div>
        <div className='col-span-5 h-screen overflow-scroll border-l-[0.2px] border-r-[0.2px] border-gray-600'>
          <div>
            <div className="border border-l-0 border-r-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-1">
                    {user?.profileImageUrl && <Image
                      src={user.profileImageUrl}
                      height={50}
                      width={50}
                      alt="user-profile-image"
                      className="rounded-full"
                    />}
                  </div>
                  <div className="col-span-11">
                    <textarea 
                      value={content}
                      onChange={e => setContent(e.target.value)}
                      className='w-full bg-transparent text-xl px-3 border-b border-slate-700' 
                      placeholder='What is happening?!' rows={3}>

                    </textarea>
                    <div className='flex justify-between items-center'>
                      <BiImageAlt onClick={handleSelectImage} className="text-xl" />
                      <button onClick={handleCreateTweet} className='bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full'>Tweet</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          {
            tweets?.map(tweet => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null)
          }
        </div>
        <div className='col-span-3 p-5'>
          {!user && <div className="border p-5 bg-slate-700 rounded-lg">
            <h1 className='my-2 text-2xl'>New to Twitter?</h1>
            <GoogleLogin onSuccess={cred => {handleLoginWithGoogle(cred)}} />
          </div>}
        </div>
      </div>
    </div>
  )
}
