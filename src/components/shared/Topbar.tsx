import { MessageIcon1, NotificationIcon1 } from "@/assets/icons";
import { Button } from "../shadcn/ui/button";
import SiteLogo from "../SiteLogo";
import { SearchInput } from "../utilities/SearchInput";
import UserDropdown from "../UserDropdown";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Topbar: React.FC = async () => {
  const session = await getServerSession();

  return (
    <header className="topbar fixed left-0 top-0 z-50 w-full bg-secondary">
      <div className="container mx-auto flex h-14 items-center justify-between gap-2 p-2">
        <SiteLogo />
        <SearchInput
          placeholder="Type here to search..."
          containerClassName="w-full max-w-sm"
        />
        <div className="flex items-center gap-2">
          {!!session ? (
            <>
              <Button size="icon" variant="secondary">
                <MessageIcon1 />
              </Button>
              <Button size="icon" variant="secondary">
                <NotificationIcon1 />
              </Button>
              <UserDropdown user={session?.user} />
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
