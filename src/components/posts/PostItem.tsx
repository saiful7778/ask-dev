import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/ui/avatar";
import { Badge } from "../shadcn/ui/badge";
import PostReactButton from "./PostReactButton";
import { formatDistanceToNow } from "date-fns";
import numberFormat from "@/lib/utils/numberFormat";

interface PostDataProps {
  postData: {
    id: string;
    title: string;
    slug: string;
    author: {
      id: string;
      name: string;
      username: string;
      avatar: string;
    };
    tags: {
      id: string;
      name: string;
    }[];
    viewCount: number;
    likeCount: number;
    commentCount: number;
    isReact: boolean;
    createdAt: string;
  };
}

const PostItem: React.FC<PostDataProps> = ({ postData }) => {
  const {
    id,
    title,
    slug,
    author,
    tags,
    viewCount,
    likeCount,
    commentCount,
    isReact,
    createdAt,
  } = postData;
  const { name: authorName, username, avatar } = author;

  const postTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  return (
    <div className="rounded-md border bg-secondary p-5 text-secondary-foreground">
      <div className="flex items-center justify-between gap-1">
        <Link
          href={`/post/${slug}`}
          className="text-lg font-semibold hover:underline"
        >
          {title}
        </Link>
        <PostReactButton isReact={isReact} />
      </div>
      <div className="flex items-center gap-2">
        {tags?.map((tag, idx) => (
          <Badge variant="secondary" key={`post-${id}-badge-${idx}`}>
            {tag.name}
          </Badge>
        ))}
      </div>
      <div className="mt-5 flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatar} alt={authorName} />
            <AvatarFallback />
          </Avatar>
          <div>
            <Link
              href={`/profile/${username}`}
              className="text-sm font-semibold hover:underline"
            >
              {authorName}
            </Link>
            <div className="text-xs font-normal leading-4">{postTime}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-[#C5D0E6]">
          <div className="flex items-center gap-1">
            <span>{numberFormat(viewCount)}</span>
            <span>Views</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{numberFormat(likeCount)}</span>
            <span>Likes</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{numberFormat(commentCount)}</span>
            <span>Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
