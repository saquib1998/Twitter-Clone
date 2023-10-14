import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

const FeedCard: React.FC = () => {
  return (
    <div className="border border-l-0 border-r-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/54936572?v=4"
            height={50}
            width={50}
            alt="user-profile-image"
            className="rounded-full"
          />
        </div>
        <div className="col-span-11">
          <h5>Saquib Ali</h5>
          <p>
            The Israeli military told people living in northern Gaza to evacuate
            their homes and go to the south. When people left towards the south,
            the Israeli fighter jets bombed them on the way killing many. Never
            forget this.
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
