import { Navbar, DarkThemeToggle, Button } from "flowbite-react";
import { Link, useLinkClickHandler } from "react-router-dom";
import { useSession } from "../shared/hooks/useSession";

export interface AppNavLinkProps {
  to: string;
  text: string;
}

function AppNavLink(props: AppNavLinkProps) {
  const clickHandler = useLinkClickHandler(props.to);

  return (
    <span onClick={clickHandler}>
      <Navbar.Link href={props.to}>{props.text}</Navbar.Link>
    </span>
  );
}

const NavbarTop = () => {
  const { token, logout } = useSession();

  return (
    <div className="dark:bg-black">
      <Navbar
        className="max-w-screen-xl bg-inherit dark:bg-black capitalize mx-auto"
        fluid
      >
        <Navbar.Brand href="/">
          <Link
            to={"/"}
            className="self-center text-xl font-bold whitespace-nowrap  dark:text-white"
          >
            out<span className="text-3xl">S</span>tanding
          </Link>
        </Navbar.Brand>
        <div className="flex items-center list-none gap-3 lg:order-2">
          {!token ? (
            <>
              <AppNavLink to="/signin" text="Log In" />
              <AppNavLink to="/signup" text="Sign Up" />
            </>
          ) : (
            <Button onClick={logout}> Log Out</Button>
          )}
          <DarkThemeToggle />
          <Navbar.Toggle theme={{ icon: "h-5 w-5 shrink-0" }} />
        </div>
        <Navbar.Collapse
          theme={{
            list: "mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:text-base lg:font-medium",
          }}
          className="lg:order-1"
        >
          <AppNavLink to="/" text="home" />
          <AppNavLink to="/blog/create" text="create" />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarTop;
