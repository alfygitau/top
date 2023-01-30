/** @jsx jsx */
import { jsx, Box, Button, Label, Input, Text, Image } from "theme-ui";
import Head from "next/head";
import Link from "next/link";
import { Message } from "rsuite";
import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { loginUser } from "../../dataStore/actions/userLoginAction";
import PatternBG from "../../assets/login.svg";
import checkDetailsReducer, {
  initialCheckDetailsState,
} from "../../dataStore/reducers/checkDetailsReducer";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [checkDetailsData, dispatchCheckDetails] = useReducer(
    checkDetailsReducer,
    initialCheckDetailsState
  );

  const handleUserLogin = (e) => {
    e.persist();
    e.preventDefault();
    const { email, password } = loginDetails;

    const bodyData = {
      email,
      password,
    };
    if (bodyData.email !== "" && bodyData.password !== "") {
      loginUser(dispatch, bodyData).then((response) => {
        if (response.status === 200) router.push("/dashboard/all-orders");
      });
    } else {
      dispatchCheckDetails({
        type: "ERROR",
        errorMessage: "Make sure all the fields all filled",
      });
    }
  };

  const handleInputChange = (e) => {
    e.persist();
    setLoginDetails((details) => ({
      ...details,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const user =
      localStorage.currentUser && JSON.parse(localStorage.currentUser);
    if (user) {
      router.push("/dashboard/all-orders");
    } else {
      localStorage.clear();
    }
  }, [dispatch, router]);

  return (
    <>
    <Box>
      <Box>
      <Head>
        <title>
          Login - Top Rated Professors
        </title>
        <link rel="shortcut icon" href="/logo.ico" />
        <link
          href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      </Box>
      <Box sx={styles.login}>
        <Box sx={styles.loginImage}>
          <Box sx={styles.home} onClick={() => router.push("/")}>
            Top Rated Professors
          </Box>
          <Image src={PatternBG} alt="" sx={styles.patternImage} />
        </Box>
        <Box sx={styles.form}>
          <Box sx={styles.formLogin} as="form" onSubmit={handleUserLogin}>
            <center>
              <Box sx={{ textAlign: "center", fontSize: "35px" }}>
                Welcome to Top Rated Professors
              </Box>
              <br />
              {checkDetailsData.errorMessage && (
                <Message style={{ marginTop: "10px" }} closable type="error">
                  {checkDetailsData.errorMessage}
                </Message>
              )}
            </center>
            <br />
            <Box sx={{ textAlign: "center", fontSize: "30px" }}>Login</Box>
            <Label sx={styles.formLogin.label} htmlFor="email">
              Email
            </Label>
            <Input
              sx={styles.formLogin.input}
              id="email"
              type="email"
              name="email"
              value={loginDetails.email}
              onChange={handleInputChange}
            />
            <Label sx={styles.formLogin.label} htmlFor="password">
              Password
            </Label>
            <Input
              sx={styles.formLogin.input}
              id="password"
              type="password"
              name="password"
              value={loginDetails.password}
              onChange={handleInputChange}
            />
            <Button sx={styles.formLogin.login}>Login</Button>
            <br />
            <Text as="p">
              Don't have an account ?{" "}
              <Link href="/user/register">
                <a style={{ color: "blue" }}>Register Here</a>
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
}

const styles = {
  login: {
    display: "flex",
    "@media screen and (max-width:768px)": {
      display: "flex",
      gap: "20px",
      flexDirection: "column",
    },
    a: {
      textDecoration: "none",
      color: "white",
    },
  },
  grid: {
    pt: [0, null, null, null, null, null, 2],
    px: [5, 6, 0, null, 7, 8, 7],
    gridTemplateColumns: [
      "repeat(1,1fr)",
      "repeat(2,1fr)",
      "repeat(2,1fr)",
      "repeat(2,1fr)",
    ],
  },
  loginImage: {
    display: "grid",
    maxHeight: "100vh",
    borderRight: "1px solid whitesmoke",
    "@media screen and (max-width:768px)": {
      display: "none",
    },
  },
  home: {
    position: "absolute",
    paddingTop: "20px",
    paddingLeft: "20px",
    fontSize: "30px",
    cursor: "pointer",
  },
  patternImage: {
    maxWidth: "100%",
    height: "100vh",
    margin: "auto",
  },
  form: {
    margin: "auto",
    height: "100vh",
    paddingTop: "15vh",
  },
  formLogin: {
    padding: "30px",
    width: ["250px", "420px"],
    display: "block",
    input: {
      borderColor: "gray",
      mb: "30px",
      borderRadius: "3px",
      width: "100%",
      "&:focus": {
        borderColor: "primary",
        boxShadow: (t) => `0 0 0 2px rgba(0, 0, 0, 0.2)`,
        outline: "none",
      },
    },
    login: {
      margin: "10px 0 0 0",
      padding: "7px 10px",
      border: "1px solid #efffff",
      borderRadius: "3px",
      background: "#17c671",
      width: "100%",
      fontSize: "15px",
      color: "white",
      display: "block",
    },
    register: {
      margin: "10px 0 0 0",
      padding: "7px 10px",
      border: "1px solid #efffff",
      borderRadius: "3px",
      background: "#FDAA8F",
      width: "100%",
      fontSize: "15px",
      color: "white",
      display: "block",
    },
  },
};
