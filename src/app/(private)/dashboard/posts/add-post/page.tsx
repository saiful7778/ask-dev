import PostCreateForm from "@/components/forms/PostCreateForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add post - ASK DEV",
  description: "This is ask-dev post create page",
};

const AddPost: React.FC = () => {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Add new post</h1>
      <PostCreateForm />
    </div>
  );
};

export default AddPost;
