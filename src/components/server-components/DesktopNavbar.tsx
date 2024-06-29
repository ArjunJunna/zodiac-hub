import { ThemeSwitcherBtn } from '../ThemeSwitcherBtn';
import DesktopDropdownMenu from '../client-components/DesktopDropdownMenu';
import SignInButton from '../SignInButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import CreatePostButton from '../client-components/CreatePostButton';
import AppbarLogo from '../client-components/AppbarLogo';
import SearchBar from '../client-components/SearchBar';
import NotificationBar from '../client-components/NotificationBar';

export async function DesktopNavbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="hidden border-b bg-background lg:block px-2 sticky top-0 z-20 w-full">
      <nav className="container flex gap-x-2 items-center justify-between px-4 py-1">
        <AppbarLogo />
        <SearchBar />
        <div className="flex items-center gap-x-5 gap-y-2">
          {session ? <CreatePostButton /> : null}
          {!session ? <SignInButton /> : null}
          {session ? <NotificationBar /> : null}
          <DesktopDropdownMenu />
          <ThemeSwitcherBtn />
        </div>
      </nav>
    </div>
  );
}
