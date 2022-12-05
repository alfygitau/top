/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import { Button } from "rsuite";
import { keyframes } from "@emotion/core";
import Link from "next/link";
import Logo from "components/home/logo";
import LogoDark from "assets/logo.png";
import USflag from "../../assets/usa.png";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Header = ({ className }) => {
  const router = useRouter();
  const handleClearStorage = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <header sx={styles.header} className={className}>
      <Link style={{ cursor: "pointer" }} href="/">
        <a>
          <Logo className="logo" src={LogoDark} href="/" />
        </a>
      </Link>
      <Flex as="nav" sx={styles.nav}>
        <Link href="/header/about-us">
          <a>About Us</a>
        </Link>
        <Link href="/header/reviews">
          <a>Reviews</a>
        </Link>
        <Link href="/header/why-us">
          <a>Why Us</a>
        </Link>
        <Link href="/header/services">
          <a>Services</a>
        </Link>
        <Link href="/header/blog">
          <a>Blogs List</a>
        </Link>
        <Link href="/">
          <a>
            <img src={USflag} alt="usflag" width="30" /> +1-814-250-1019
          </a>
        </Link>
      </Flex>
      <div style={{ display: "flex", gap: "1em" }}>
        {typeof window !== "undefined" && localStorage.currentUser ? (
          <Button
            className="login__btn"
            size="sm"
            variant="secondary"
            aria-label="logout"
            onClick={handleClearStorage}
          >
            Logout
          </Button>
        ) : (
          <Link href="/user/login">
            <a>
              <Button
                className="login__btn"
                size="sm"
                variant="secondary"
                aria-label="Login"
              >
                Login
              </Button>
            </a>
          </Link>
        )}
        {typeof window !== "undefined" && !localStorage.currentUser ? (
          <Link href="/user/register">
            <Button
              className="register__btn"
              size="sm"
              variant="secondary"
              aria-label="Get Started"
            >
              Get Started
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard/all-orders">
            <Button
              className="register__btn"
              size="sm"
              variant="secondary"
              aria-label="Get Started"
            >
              Go To Dashboard
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

const positionAnim = keyframes`
  from {
    position: fixed;
    opacity: 1;
  }

  to {
    position: absolute;
    opacity: 1;
    transition: all 0.4s ease;
  }
`;

const styles = {
  header: {
    fontFamily: "body",
    display: "flex",
    pl: ["0px", "10px", "20px"],
    pr: ["0px", "10px", "20px"],
    alignItems: "center",
    justifyContent: "space-between",
    color: "text",
    fontWeight: "body",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "primary",
    transition: "all 0.4s ease",
    animation: `${positionAnim} 0.4s ease`,
    ".login__btn": {
      borderRadius: "50px",
      fontSize: ["14px", null, null, 2],
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "10px",
      paddingBottom: "10px",
      letterSpacings: "-0.15px",
      fontFamily: "body",
      cursor: "pointer",
      transition: "all 0.25s",
      fontWeight: 500,
      backgroundColor: "secondary",
      color: "white",
      "&:focus": {
        outline: 0,
      },
      "@media screen and (max-width:768px)": {
        ml: ["-120px", "-100px", "-60px", "-30px", "20px"],
      },
      "&:hover": {
        backgroundColor: "white",
        color: "black",
      },
    },
    ".register__btn": {
      borderRadius: "50px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "10px",
      paddingBottom: "10px",
      fontSize: ["14px", null, null, 1],
      letterSpacings: "-0.15px",
      fontFamily: "body",
      cursor: "pointer",
      transition: "all 0.25s",
      fontWeight: 500,
      backgroundColor: "secondary",
      color: "white",
      "@media screen and (max-width: 768px)": {
        display: "none",
      },
      "&:focus": {
        outline: 0,
      },
      "@media screen and (max-width:768px)": {
        display: "none",
      },
      "&:hover": {
        backgroundColor: "white",
        color: "black",
      },
    },
    "&.sticky": {
      position: "fixed",
      backgroundColor: "secondary",
      color: "#000000",
      boxShadow: "0 1px 1px rgba(0, 0, 0, 0.06)",
      py: 1,
      "nev > a": {
        color: "text",
      },
      ".login__btn": {
        borderRadius: "45px",
        fontSize: ["14px", null, null, 2],
        letterSpacings: "-0.15px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "10px",
        fontFamily: "body",
        cursor: "pointer",
        lineHeight: 1.2,
        transition: "all 0.25s",
        fontWeight: 500,
        "&:focus": {
          outline: 0,
        },
        backgroundColor: "primary",
        color: "black",
        "&:hover": {
          backgroundColor: "white",
          color: "black",
        },
      },
      ".register__btn": {
        borderRadius: "45px",
        fontSize: ["14px", null, null, 2],
        letterSpacings: "-0.15px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "10px",
        fontFamily: "body",
        cursor: "pointer",
        lineHeight: 1.2,
        transition: "all 0.25s",
        fontWeight: 500,
        "&:focus": {
          outline: 0,
        },
        backgroundColor: "primary",
        color: "black",
        "&:hover": {
          backgroundColor: "white",
          color: "black",
        },
      },
      a: {
        "&:sticky": {
          color: "white",
        },
      },
    },
  },
  nav: {
    mx: "auto",
    "@media screen and (min-width: 1024px)": {
      display: "block",
    },
    "@media screen and (max-width: 768px)": {
      display: "none",
    },
    a: {
      color: "black",
      textDecoration: "none",
      fontSize: 1,
      fontWeight: "body",
      px: 4,
      cursor: "pointer",
      lineHeight: "1.2",
      transition: "all 0.15s",
      "&:hover": {
        color: "white",
      },
      "&.active": {
        color: "white",
      },
    },
  },
};
