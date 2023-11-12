import type { GetServerSideProps, NextPage } from "next";
import TwitterLayout from "./components/Layout/TwitterLayout";
import { BsArrowLeftShort } from "react-icons/bs";
import  Image  from 'next/image'
import FeedCard from "./components/FeedCard";
import { Tweet, User } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/queries/user";

interface ServerProps {
    user?: User;
}
  
const UserProfilePage: NextPage<ServerProps> = (props) => {
    return (
        <div>
            <TwitterLayout>
                <div>
                    <nav className="flex items-center gap-3 p-3">
                        <BsArrowLeftShort className="text-4xl"/>
                        <div>
                            <h1 className="text-2xl font-bold">{props.user?.firstName} {props.user?.lastName}</h1>
                            <h1 className="text-md text-slate-500">{props.user?.tweets?.length} Tweets</h1>
                        </div>
                    </nav>
                    <div className="p-4 border-b border-slate-800">
                        {props.user?.profileImageUrl && (
                            <Image
                                className="rounded-full" 
                                src={props.user?.profileImageUrl} 
                                alt="user-image" width={100} 
                                height={100}
                            />
                        )}
                        <h1 className="text-2xl font-bold mt-5">{props.user?.firstName} {props.user?.lastName}</h1>                        
                    </div>
                    <div>
                        {props.user?.tweets?.map(tweet => <FeedCard data={tweet as Tweet} key={tweet?.id} />)}
                    </div>
                </div>
            </TwitterLayout>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps<ServerProps> = async (
    context
  ) => {
    const id = context.query.id as string | undefined;
  
    if (!id) return { notFound: true, props: { user: undefined } };
  
    const userInfo = await graphqlClient.request(getUserByIdQuery, { id });
  
    if (!userInfo?.getUserById) return { notFound: true };

    return {
        props: {
          user: userInfo.getUserById as User,
        },
    };
  };
  

export default UserProfilePage;