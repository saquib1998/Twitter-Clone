import { useCurrentUser } from "@/hooks/user";
import React, { useCallback, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { BiBell, BiImageAlt } from "react-icons/bi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { TbNotes } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { CiCircleMore } from "react-icons/ci";
import FeedCard from "../FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { Tweet } from "@/gql/graphql";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import { useQueryClient } from "@tanstack/react-query";

interface SidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: SidebarButton[] = [
  {
    title: "Home",
    icon: <GoHomeFill />,
  },
  {
    title: "Explore",
    icon: <FiSearch />,
  },
  {
    title: "Notification",
    icon: <BiBell />,
  },
  {
    title: "Messages",
    icon: <HiOutlineEnvelope />,
  },
  {
    title: "Lists",
    icon: <TbNotes />,
  },
  {
    title: "Profile",
    icon: <AiOutlineUser />,
  },
  {
    title: "More",
    icon: <CiCircleMore />,
  },
];

interface TwitterLayoutProps {
  children: React.ReactNode;
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google token not found");

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries(["current-user"]);
    },
    [queryClient]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-20">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <div>
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 px-5 cursor-pointer transition-all">
              <BsTwitter />
            </div>
            <div className="mt-4 text-xl pr-4">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li
                    className="flex mt-2 justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer"
                    key={item.title}
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <span className="hidden sm:inline">{item.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pr-4">
                <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  Tweet
                </button>
                <button className="sm:hidden block bg-[#1d9bf0] font-semibold text-lg p-4 rounded-full">
                  <BsTwitter />
                </button>
              </div>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center hover:bg-slate-800 px-3 py-2 rounded-full">
              {user && user.profileImageUrl && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageUrl}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div className="hidden sm:block">
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
          {props.children}
        </div>
        <div className="col-span-0 sm:col-span-3 p-5">
          {!user && (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin
                onSuccess={(cred) => {
                  handleLoginWithGoogle(cred);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwitterLayout;
