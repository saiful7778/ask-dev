import numberFormat from "@/lib/utils/numberFormat";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/ui/avatar";
import { AnimatedList } from "./shadcn/magic-ui/animated-list";

const memberData = [
  {
    id: "1",
    username: "saifulislam",
    name: "Saiful Islam",
    avatar: "https://example.com/avatar1.jpg",
    postCount: 5000,
  },
  {
    id: "2",
    username: "johndoe",
    name: "John Doe",
    avatar: "https://example.com/avatar2.jpg",
    postCount: 4000,
  },
  {
    id: "3",
    username: "jane Smith",
    name: "Jane Smith",
    avatar: "https://example.com/avatar3.jpg",
    postCount: 3000,
  },
];

const Members: React.FC = () => {
  return (
    <div className="h-fit rounded-md border bg-secondary text-secondary-foreground">
      <h6 className="p-5 text-base font-semibold leading-6">Top members</h6>
      <div className="px-2 pb-2">
        <AnimatedList className="gap-0" delay={200}>
          {memberData?.map((member, idx) => (
            <SingleMember key={`member-${idx}`} memberData={member} />
          ))}
        </AnimatedList>
      </div>
    </div>
  );
};

const SingleMember: React.FC<{
  memberData: {
    id: string;
    username: string;
    name: string;
    avatar: string;
    postCount: number;
  };
}> = ({ memberData: { username, name, avatar, postCount } }) => {
  return (
    <Link
      href={`/profile/${username}`}
      className="group flex items-center gap-3 rounded-md px-4 py-3 hover:bg-card"
    >
      <Avatar>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback />
      </Avatar>
      <span className="mr-auto flex flex-col items-start gap-1">
        <span className="text-sm font-semibold capitalize leading-[18px] hover:underline">
          {name}
        </span>
        <span className="text-xs font-normal leading-4 text-[#97989D]">
          {numberFormat(postCount)} Posts
        </span>
      </span>
      <ArrowRight />
    </Link>
  );
};

export default Members;
