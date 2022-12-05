import React from "react";
import Head from "next/head";
import CompletedOrders from "../orders/components/completedOrders";
import AllOrders from "../orders/components/allOrders";
import WaitingAssign from "../orders/components/waitingAssign";
import ApprovedOrders from "../orders/components/approvedOrders";
import PendingOrders from "../orders/components/pendingOrders";
import OrderLayout from "../orders/layout/order-layout";
import CreateOrder from "../orders/components/createOrder";
import Finances from "../wallet/finances";
import SettingView from "../settings/view";
import OrderDetails from "components/orders/components/order-details";
import Transactions from "../wallet/transactions";
import InProgress from "components/orders/sections/in-progress";
import OrderCompletedDetails from "components/orders/components/completed-order-details";
import CancelledRejectedDetails from "../orders/components/cancelledRejected";
import RevisionDetails from "../orders/components/revisionDetails";
import InProgressDetails from "components/orders/components/inProgressDetails";
import ReserveOrder from "../orders/components/reserve-order";
import Blogs from "../orders/components/blogs";

const Dashboard = ({ section }) => {
  const renderOrderPages = () => {
    switch (section) {
      case "completed":
        return <CompletedOrders section={section} />;
      case "all-orders":
        return <AllOrders section={section} />;
      case "waiting-assign":
        return <WaitingAssign section={section} />;
      case "rejected":
        return <WaitingAssign section={section} />;
      case "approved":
        return <ApprovedOrders section={section} />;
      case "pending":
        return <PendingOrders section={section} />;
      case "in-progress":
        return <InProgress section={section} />;
      case "available":
        return <PendingOrders section={section} />;
      case "cancelled":
        return <PendingOrders section={section} />;
      case "revision":
        return <PendingOrders section={section} />;
      case "cancelled-order":
        return <CancelledRejectedDetails section={section} />;
      case "reserve-order":
        return <ReserveOrder section={section} />;
      case "revision-order":
        return <RevisionDetails section={section} />;
      case "inprogress-order":
        return <InProgressDetails section={section} />;
      case "wallet":
        return <Finances section={section} />;
      case "transactions":
        return <Transactions section={section} />;
      case "view":
        return <SettingView section={section} />;
      case "specific-order":
        return <OrderDetails section={section} />;
      case "completed-order":
        return <OrderCompletedDetails section={section} />;
      case "create_order":
        return <CreateOrder section={section} />;
      case "blogs":
        return <Blogs section={section} />;
      case undefined:
        return "";
      default:
        return "";
    }
  };
  return (
    <div>
      <Head>
        <title>
          {section.toUpperCase().replace(/_/g, " ")} - TopRated Professors
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
      <OrderLayout>{renderOrderPages()}</OrderLayout>
    </div>
  );
};

export default Dashboard;
