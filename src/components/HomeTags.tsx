import numberFormat from "@/lib/utils/numberFormat";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const tagData = [
  { id: "1", name: "javascript", postCount: 5000 },
  { id: "2", name: "react", postCount: 4000 },
  { id: "3", name: "nodejs", postCount: 3000 },
  { id: "4", name: "typescript", postCount: 2000 },
  { id: "5", name: "angular", postCount: 1000 },
];

const HomeTags: React.FC = () => {
  return (
    <div className="h-fit rounded-md bg-secondary text-secondary-foreground">
      <h6 className="p-5 text-base font-semibold leading-6">Popular Tags</h6>
      <div className="px-2 pb-2">
        {tagData?.map((tag, idx) => (
          <TagItem key={`tag-${idx}`} tagData={tag} />
        ))}
      </div>
    </div>
  );
};

const TagItem: React.FC<{
  tagData: { id: string; name: string; postCount: number };
}> = ({ tagData: { name, postCount } }) => {
  return (
    <Link
      href={`/tag/${name}`}
      className="group flex items-center justify-between gap-3 rounded-md px-4 py-3 hover:bg-card"
    >
      <span className="flex flex-col items-start gap-1">
        <span className="text-sm font-semibold capitalize leading-[18px]">
          {name}
        </span>
        <span className="text-xs font-normal leading-4 text-[#97989D]">
          {numberFormat(postCount)} Posted by this tag
        </span>
      </span>
      <ArrowRight strokeWidth={1} />
    </Link>
  );
};

export default HomeTags;
