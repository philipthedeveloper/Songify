import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useProfile, useRoute } from "../hooks";
import streaksLogo from "../assets/images/main-image-xs.png";

interface SidebarProps extends PropsWithChildren {
  toggleHide: (e: any) => void;
  smallNav: boolean;
  sideNavRef: React.MutableRefObject<HTMLElement | null>;
}

const routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    Icon: (
      <i className="fi fi-sr-house-crack flex text-2xl text-[var(--base-color)]"></i>
    ),
  },
  {
    name: "Question",
    path: "/question",
    Icon: (
      <i className="fi fi-sr-messages-question flex text-2xl text-[var(--base-color)]"></i>
    ),
  },
  {
    name: "Chats",
    path: "/chat",
    Icon: (
      <i className="fi fi-sr-comment-alt flex text-2xl text-[var(--base-color)]"></i>
    ),
  },
];

const Sidebar = ({ toggleHide, smallNav, sideNavRef }: SidebarProps) => {
  const { currentPath } = useRoute();
  const navigate = useNavigate();
  const { userProfile } = useProfile();

  const toggleInView = (e: any) => {
    // e.preventDefault();
    if (sideNavRef.current === null) return;
    sideNavRef.current.classList.toggle("out-of-view");
  };

  const logoutHandler = () => {
    navigate("/logout", { replace: true });
  };

  return (
    <SideNavContainer ref={sideNavRef} className="hide out-of-view side-nav">
      <Header className="flex items-center gap-2  h-[56px] md:h-[64px] lg:h-[72px] cursor-pointer">
        <img
          src={streaksLogo}
          className="w-8 h-8 object-contain aspect-square"
        />
        <span className="link-name text-[var(--base-color)] font-semibold">
          Streaks
        </span>
      </Header>
      {/* <Header
        onClick={(e) => toggleHide(e)}
        className={`flex justify-end items-center h-[57px] md:h-[65px] lg:h-[73px] ${
          smallNav && "justify-center"
        } cursor-pointer`}
      >
        {smallNav ? (
          // <i className="fi fi-sr-arrow-small-right flex"></i>
          <img src={rightArrow32} className="flex" />
        ) : (
          <img src={rightArrow32} className="flex rotate-180" />
        )}
      </Header> */}
      <NavList>
        {routes.map(({ path, name, Icon }) => (
          <LinkItem
            to={path}
            key={path + name}
            className={`${currentPath.includes(path) && "active"} flex`}
            onClick={(e) => toggleInView(e)}
          >
            {Icon}
            <span className="link-name text-[var(--base-color)] font-semibold">
              {name}
            </span>
          </LinkItem>
        ))}
        <LinkItem
          to={"/profile"}
          className={`${
            currentPath.includes("/profile") && "active"
          } flex sm:hidden`}
          onClick={(e) => toggleInView(e)}
        >
          <i className="fi fi-sr-circle-user flex text-2xl text-[var(--base-color)]"></i>
          <span className="link-name text-[var(--base-color)] font-semibold">
            Profile
          </span>
        </LinkItem>
      </NavList>
      <LogoutButton onClick={logoutHandler}>
        <i className="fi fi-sr-sign-out-alt flex text-2xl"></i>
        <span className="text-sm font-semibold">Logout</span>
      </LogoutButton>
      <Footer
        onClick={(e) => toggleHide(e)}
        className={`flex justify-end items-center text-white ${
          smallNav && "justify-center"
        } cursor-pointer`}
      >
        {smallNav ? (
          <i className="fi fi-rr-angle-double-small-right flex"></i>
        ) : (
          <>
            <i className="fi fi-rr-angle-double-small-left flex"></i>
            <span className="ml-2 text-sm font-medium">Collapse</span>
          </>
        )}
      </Footer>
    </SideNavContainer>
  );
};

const SideNavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 185px;
  grid-column: 1 / 2;
  background-color: var(--navbar-bg);
  transition: 0.4s ease;
  overflow: hidden;

  a,
  button,
  header {
    transition: 0.4s ease;
  }

  a,
  button {
    i,
    span {
      transition: 0.4s ease;
    }
  }

  header {
    img {
      transition: 0.4s ease;
    }
  }

  &.hide {
    width: 84px;

    a,
    button,
    header {
      gap: 2.4rem;
      padding-left: 25px;
    }

    header span {
      display: none;
    }

    header img {
      width: 40px;
      height: 40px;
    }

    header {
      padding: 1rem;
    }

    @media (min-width: 640px) {
      a,
      button {
        i {
          transform: translateX(3.2px);
        }
      }

      header {
        img {
          transform: translateX(3.2px);
        }
      }
    }
  }

  @media (max-width: 640px) {
    position: fixed;
    height: max-content;
    transition: 0.4s ease;
    z-index: 1000;
    width: 100dvw;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom-right-radius: 0rem;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;

    &.hide {
      width: 100dvw;

      a,
      button {
        gap: initial;
        padding-left: initial;
      }
    }

    &.out-of-view {
      transform: translateX(0%);
    }
  }
`;

// const Header = styled.header`
//   padding: 1rem;
//   border-bottom: 1px solid lightgray;

//   i {
//     color: #fff;
//     font-size: 1.6rem;
//     cursor: pointer;
//   }

//   // i[class*="arrow"] {
//   //   display: none;
//   // }

//   @media (max-width: 640px) {
//     display: none;
//   }
// `;

const Header = styled.header`
  padding: 1rem 1.2rem;

  span {
    font-size: 1.5rem;
    cursor: pointer;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const Footer = styled.footer`
  padding: 1rem;

  i {
    color: white;
    font-size: 1.6rem;
    cursor: pointer;
  }

  &:hover {
    i,
    span {
      color: var(--base-color);
    }
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 640px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
  }

  @media (max-width: 320px) {
    padding: 1.4rem 1rem;
  }
`;

const ListItem = styled.li``;

const LinkItem = styled(Link)`
  padding: 1rem 1.5rem;
  color: #fff;
  gap: 1rem;
  font-size: 0.875rem;
  align-items: center;

  i,
  span {
    color: white;
    font-family: var(--sofia-sans);
    font-weight: 600;
  }

  &.active {
    i,
    span {
      color: var(--base-color);
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center !important;
    gap: 0.3rem !important;
    padding: 0 !important;
    margin: 0 !important;

    i {
      font-size: 1.35rem;
    }

    .link-name {
      font-size: 0.7rem;
      font-weight: 500;
    }

    &.active {
      background: none;
    }
  }

  @media (max-width: 340px) {
    .link-name {
      display: none;
    }
  }
`;

const LogoutButton = styled.button`
  display: flex;
  padding: 1rem 1.5rem;
  color: #fff;
  gap: 1rem;
  border: none;
  outline: none;
  margin-top: auto;
  background: none;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;

  i,
  span {
    color: white;
    font-family: var(--sofia-sans);
    font-weight: 600;
  }

  &:hover {
    i,
    span {
      color: var(--base-color);
    }
  }

  &.active {
    i,
    span {
      color: var(--base-color);
    }
  }

  @media (max-width: 640px) {
    width: max-content;
    display: none;

    span {
      display: none;
    }
  }
`;

export default Sidebar;
