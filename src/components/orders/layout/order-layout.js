import React, { useState } from "react";
import {
  Container,
  Header,
  Content,
  Nav,
  Sidebar,
  Dropdown,
  Navbar,
  Tag,
} from "rsuite";
import { logoutUser } from "../../../dataStore/actions/userLogoutAction";
import { useDispatch, useSelector } from "react-redux";
import { Sidenav, Badge } from "rsuite";
import { FaWallet, FaUserCircle } from "react-icons/fa";
import { Box, jsx } from "theme-ui";
import Geal from "../../../assets/logo.png";
import ArowBackIcon from "@rsuite/icons/ArowBack";
import DashboardIcon from "@rsuite/icons/Dashboard";
import PeopleBranchIcon from "@rsuite/icons/PeopleBranch";
import PeoplesIcon from "@rsuite/icons/Peoples";
import LocationIcon from "@rsuite/icons/Location";
import ExploreIcon from "@rsuite/icons/Explore";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import AlipayIcon from "@rsuite/icons/Alipay";
import OffIcon from "@rsuite/icons/Off";
import PageNextIcon from "@rsuite/icons/PageNext";
import { useRouter } from "next/router";
import {
  getOrders,
  getPendingOrders,
  getCompletedOrders,
  userCountOrderSummary,
} from "dataStore/actions/ordersAction";
import { userWalletSummary } from "../../../dataStore/actions/walletAction";
import Sticky from "react-stickynode";

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Navbar.Body>
        <Nav>
          <Dropdown placement="topStart" trigger="click">
            <Dropdown.Item>Help</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </Nav>

        <Nav pullRight>
          <Nav.Item
            onClick={onChange}
            style={{ width: 56, textAlign: "center" }}
          >
            {expand ? (
              <ArowBackIcon style={{ color: "red", fontSize: "30px" }} />
            ) : (
              <PageNextIcon style={{ fontSize: "30px", color: "red" }} />
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

const OrderLayout = ({ children }) => {
  const [username, setUsername] = React.useState(null);
  const [expand, setExpand] = React.useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const userCountOrderSummarySelector = useSelector(
    (state) => state.orderState
  );
  const user_Wallet_Summary = useSelector((state) => state.walletState);
  const { user_wallet_summary } = user_Wallet_Summary;
  const { user_balance } = user_wallet_summary;
  const { user_order_count_summary } = userCountOrderSummarySelector;
  const {
    all_orders_count,
    pending_orders_count,
    revision_orders_count,
    paid_orders_count,
    available_orders_count,
    editing_orders_count,
    confirmed_orders_count,
    active_orders_count,
    complete_orders_count,
    rejected_orders_count,
    disputed_orders_count,
    approved_orders_count,
    cancelled_orders_count,
  } = user_order_count_summary;

  const handleLogout = () => {
    const sessionID = localStorage.sessionID;
    if (sessionID) {
      logoutUser(dispatch, sessionID);
      localStorage.clear();
      router.push("/");
    } else {
      dispatch({
        type: "ERROR",
        errorMessage: "Unable to logout user",
      });
    }
  };

  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      setIsSticky(true);
    } else if (status.status === Sticky.STATUS_ORIGINAL) {
      setIsSticky(false);
    }
  };

  const CustomDropdown = ({ ...props }) => (
    <Dropdown {...props}>
      <Dropdown.Item
        onClick={() => router.push("/settings/view")}
        style={{ fontSize: "1.2em" }}
        icon={<FaWallet color="black" />}
      >
        {" "}
        Profile
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => router.push("/dashboard/wallet")}
        style={{ fontSize: "1.2em" }}
        icon={<FaWallet color="black" />}
      >
        {" "}
        My Finances
      </Dropdown.Item>
      <Dropdown.Item
        style={{ fontSize: "1.2em" }}
        onClick={handleLogout}
        icon={<OffIcon color="red" />}
      >
        {" "}
        Logout({username})
      </Dropdown.Item>
    </Dropdown>
  );

  React.useEffect(() => {
    const { id: userId } = JSON.parse(localStorage.currentUser);
    getOrders(dispatch, userId);
    getPendingOrders(dispatch, userId);
    getCompletedOrders(dispatch, userId);
    userCountOrderSummary(dispatch, userId);
    userWalletSummary(dispatch, userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user_balance]);

  React.useEffect(() => {
    try {
      JSON.parse(localStorage.currentUser);
    } catch (error) {
      localStorage.clear();
      window.location.replace("/");
    }
  }, []);

  React.useEffect(() => {
    const value = localStorage.currentUser;
    const user = value ? JSON.parse(value) : undefined;
    setUsername(user.username);
  }, []);

  return (
    <div className="show-fake-browser sidebar-page" style={{ color: "black" }}>
      <Container>
        <Sidebar
          style={{
            display: "flex",
            position: "fixed",
            color: "black",
            flexDirection: "column",
          }}
          width={expand ? 260 : 56}
          collapsible
          appearance="inverse"
        >
          <Sidenav.Header onClick={() => router.push("/")}>
            <center>
              <Box sx={styles.headerStyles}>
                <img className="image" src={Geal} height={47} alt="" />
              </Box>
            </center>
          </Sidenav.Header>
          <Sidenav
            style={{ color: "black" }}
            expanded={expand}
            defaultOpenKeys={["3"]}
            appearance="default"
          >
            <Sidenav.Body>
              <Nav>
                <Nav.Item
                  eventKey="1"
                  active
                  icon={<DashboardIcon />}
                  style={{ fontSize: "20px" }}
                  onClick={() =>
                    router.push("/dashboard/all-orders", undefined, {
                      shallow: true,
                    })
                  }
                >
                  Dashboard
                  {all_orders_count > 0 && (
                    <Tag
                      style={{ float: "right", borderRadius: 100 }}
                      color="green"
                    >
                      {all_orders_count}
                    </Tag>
                  )}
                </Nav.Item>
                <Nav.Item
                  eventKey="2"
                  style={{ fontSize: "20px" }}
                  icon={<PeopleBranchIcon color="#3498FF" />}
                  onClick={() =>
                    router.push("/dashboard/create_order", undefined, {
                      shallow: true,
                    })
                  }
                >
                  Place Order
                </Nav.Item>
                <Nav.Item
                  eventKey="3"
                  style={{ fontSize: "20px" }}
                  icon={<LocationIcon color="#3498FF" />}
                  onClick={() =>
                    router.push("/dashboard/pending", undefined, {
                      shallow: true,
                    })
                  }
                >
                  Pending
                  {pending_orders_count > 0 && (
                    <Tag
                      style={{ float: "right", borderRadius: 100 }}
                      color="green"
                    >
                      {pending_orders_count - paid_orders_count}
                    </Tag>
                  )}
                </Nav.Item>
                <Nav.Item
                  eventKey="4"
                  style={{ fontSize: "20px" }}
                  icon={<AlipayIcon color="#3498FF" />}
                  onClick={() =>
                    router.push("/dashboard/waiting-assign", undefined, {
                      shallow: true,
                    })
                  }
                >
                  To be Assigned
                  {available_orders_count > 0 && (
                    <Tag
                      style={{ float: "right", borderRadius: 100 }}
                      color="green"
                    >
                      {available_orders_count}
                    </Tag>
                  )}
                </Nav.Item>
                <Nav.Item
                  eventKey="5"
                  style={{ fontSize: "20px" }}
                  icon={<PeoplesIcon color="#3498FF" />}
                  onClick={() =>
                    router.push("/dashboard/in-progress", undefined, {
                      shallow: true,
                    })
                  }
                >
                  In Progress
                  {active_orders_count > 0 && (
                    <Tag
                      style={{ float: "right", borderRadius: 100 }}
                      color="green"
                    >
                      {active_orders_count}
                    </Tag>
                  )}
                </Nav.Item>
                <Nav.Item
                  eventKey="6"
                  style={{ fontSize: "20px" }}
                  icon={<CheckOutlineIcon color="#3498FF" />}
                  onClick={() =>
                    router.push("/dashboard/cancelled", undefined, {
                      shallow: true,
                    })
                  }
                >
                  Cancelled
                  {cancelled_orders_count > 0 && (
                    <Tag
                      style={{ float: "right", borderRadius: 100 }}
                      color="green"
                    >
                      {cancelled_orders_count}
                    </Tag>
                  )}
                </Nav.Item>
                <Nav.Item
                  eventKey="7"
                  style={{ fontSize: "20px" }}
                  icon={<PeopleBranchIcon color="#3498FF" />}
                  onClick={() =>
                    router.push("/dashboard/revision", undefined, {
                      shallow: true,
                    })
                  }
                >
                  Revision
                  {revision_orders_count > 0 && (
                    <Tag
                      style={{ float: "right", borderRadius: 100 }}
                      color="green"
                    >
                      {revision_orders_count}
                    </Tag>
                  )}
                </Nav.Item>
                <Nav.Item
                  eventKey="8"
                  style={{ fontSize: "20px" }}
                  icon={<PeopleBranchIcon color="#3498FF" />}
                  onClick={() =>
                    router.push("/dashboard/completed", undefined, {
                      shallow: true,
                    })
                  }
                >
                  Completed
                  {complete_orders_count > 0 && (
                    <Tag
                      style={{ float: "right", borderRadius: 100 }}
                      color="green"
                    >
                      {complete_orders_count}
                    </Tag>
                  )}
                </Nav.Item>
                <Nav.Item
                  eventKey="9"
                  style={{ fontSize: "20px" }}
                  icon={<ExploreIcon color="#3498FF" />}
                  onClick={() =>
                    router.push("/dashboard/approved", undefined, {
                      shallow: true,
                    })
                  }
                >
                  Approved
                  {approved_orders_count > 0 && (
                    <Tag
                      style={{ float: "right", borderRadius: 100 }}
                      color="green"
                    >
                      {approved_orders_count}
                    </Tag>
                  )}
                </Nav.Item>
                <Nav.Item
                  eventKey="10"
                  style={{ fontSize: "20px" }}
                  icon={<ExploreIcon color="#3498FF" />}
                  onClick={() =>
                    router.push("/dashboard/rejected", undefined, {
                      shallow: true,
                    })
                  }
                >
                  Rejected
                  {rejected_orders_count > 0 && (
                    <Tag
                      style={{ float: "right", borderRadius: 100 }}
                      color="green"
                    >
                      {rejected_orders_count}
                    </Tag>
                  )}
                </Nav.Item>
                <Nav.Item
                  eventKey="10"
                  style={{ fontSize: "20px" }}
                  icon={
                    <ExploreIcon color="#3498FF" style={{ fontSize: "20px" }} />
                  }
                  onClick={() =>
                    router.push("/settings/view", undefined, { shallow: true })
                  }
                >
                  Settings
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>
        <Container style={{ marginLeft: expand ? 260 : 56 }}>
          <Sticky innerZ={1001} top={0} onStateChange={handleStateChange}>
            <Header className={`${isSticky ? "sticky" : "unSticky"}`}>
              <Navbar>
                <Nav style={{ color: "black", fontSize: "16px" }}>
                  <Nav.Item
                    onClick={() =>
                      router.push("/dashboard/all-orders", undefined, {
                        shallow: true,
                      })
                    }
                  >
                    My Orders
                  </Nav.Item>
                  <Nav.Item
                    onClick={() =>
                      router.push("/dashboard/create_order", undefined, {
                        shallow: true,
                      })
                    }
                  >
                    Create Order
                  </Nav.Item>
                  <Nav.Item
                    onClick={() =>
                      router.push("/settings/view", undefined, {
                        shallow: true,
                      })
                    }
                  >
                    Profile
                  </Nav.Item>
                  <Nav.Item
                    onClick={() =>
                      router.push("/dashboard/wallet", undefined, {
                        shallow: true,
                      })
                    }
                  >
                    Wallet
                  </Nav.Item>
                  <Nav.Item
                    onClick={() =>
                      router.push("/dashboard/blogs", undefined, {
                        shallow: true,
                      })
                    }
                  >
                    Blogs
                  </Nav.Item>
                </Nav>
                <Nav pullRight style={{ marginRight: "70px" }}>
                  <Nav.Item
                    onClick={() =>
                      router.push("/dashboard/wallet", undefined, {
                        shallow: true,
                      })
                    }
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FaWallet style={{ fontSize: "2em" }} /> &#160;&#160;
                      <span style={{ marginTop: "-3px", fontSize: "24px" }}>
                        ${user_balance}
                      </span>
                    </div>
                  </Nav.Item>
                  <CustomDropdown
                    icon={<FaUserCircle style={{ fontSize: "2.5em" }} />}
                    trigger="hover"
                  />
                </Nav>
              </Navbar>
            </Header>
          </Sticky>
          <Content>{children}</Content>
        </Container>
      </Container>
    </div>
  );
};

export default OrderLayout;

const styles = {
  headerStyles: {
    display: "flex",
    gap: 1,
    paddingBottom: "10px",
    fontSize: 36,
    height: 56,
    background: "linear-gradient(to right, #f44336, #3CB371)",
    color: " #fff",
    whiteSpace: "nowrap",
    overflow: "hidden",
    cursor: "pointer",
  },
  iconStyles: {
    width: 56,
    height: 56,
    padding: 18,
    lineHeight: "56px",
    textAlign: "center",
  },
  logo: {
    marginTop: "5px",
    ".image": {
      borderTopLeftRadius: "20px",
      borderBottomRightRadius: "20px",
      height: "30px",
      width: "30px",
    },
  },
};
