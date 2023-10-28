import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import {Tweet} from '@/gql/graphql'

interface FeedCardProps {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const {data} = props;
  return (
    <div className="border border-l-0 border-r-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1">
          {data.author?.profileImageUrl && <Image
            src={data.author.profileImageUrl}
            height={50}
            width={50}
            alt="user-profile-image"
            className="rounded-full"
          />}
        </div>
        <div className="col-span-11">
          <h5>{data.author?.firstName} {data.author?.lastName}</h5>
          <p>
            {data.content}
          </p>
          <div className="flex justify-between mt-5 text-xl items-center p-2">
            <div>
                <BiMessageRounded />
            </div>
            <div>
                <FaRetweet />
            </div>
            <div>
                <AiOutlineHeart />
            </div>
            <div>
                <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
