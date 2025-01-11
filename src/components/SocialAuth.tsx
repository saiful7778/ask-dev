import { Button } from "./shadcn/ui/button";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";

const SocialAuth: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" className="w-full">
        <AiFillGoogleCircle />
        Login with Google
      </Button>
      <Button variant="outline" className="w-full">
        <AiFillGithub />
        Login with GitHub
      </Button>
    </div>
  );
};

export default SocialAuth;
