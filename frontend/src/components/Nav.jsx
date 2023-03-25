import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Navbar, Button, Avatar, Dropdown } from "flowbite-react";
import logo320 from "../assets/images/logo320.png";

const Nav = ({ isHome }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isActive, setIsActive] = useState(isHome ? 1 : 4);
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const handleNavClick = (x) => {
    setIsActive(x);
  };
  return (
    <>
      <Navbar
        fluid={true}
        rounded={true}
        className="fixed w-full top-0 z-[1000] bg-mint"
      >
        <Navbar.Brand href="https://hopechain.com/">
          <img src={logo320} className="h-6 mr-3 sm:h-9" alt="HopeChain Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            HopeChain
          </span>
        </Navbar.Brand>
        {isLogged ? (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block text-sm font-medium truncate">
                  name@hopechain.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Donations</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        ) : (
          <div className="flex md:order-2">
            <Button>Make a change</Button>
            <Navbar.Toggle />
          </div>
        )}
        <Navbar.Collapse>
          <Navbar.Link
            active={isActive === 1}
            onClick={() => handleNavClick(1)}
          >
            <HashLink smooth to="/#" scroll={(el) => scrollWithOffset(el)}>
              Home
            </HashLink>
          </Navbar.Link>
          <Navbar.Link
            active={isActive === 2}
            onClick={() => handleNavClick(2)}
          >
            <HashLink smooth to="/#about" scroll={(el) => scrollWithOffset(el)}>
              About
            </HashLink>
          </Navbar.Link>
          <Navbar.Link
            active={isActive === 3}
            onClick={() => handleNavClick(3)}
          >
            <HashLink
              smooth
              to="/#impact"
              scroll={(el) => scrollWithOffset(el)}
            >
              Impact
            </HashLink>
          </Navbar.Link>
          <Navbar.Link
            active={isActive === 4}
            onClick={() => handleNavClick(4)}
          >
            <Link to="/downloadApp">App</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Nav;
