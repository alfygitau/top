import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WalletCard from "./components/wallet-card";
import {
  executePayment,
  userWalletSummary,
} from "../../dataStore/actions/walletAction";
import { useRouter } from "next/router";

const Transactions = ({ section }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const payerID = router.query.PayerID;
  const paymentId = router.query.paymentId;

  React.useEffect(() => {
    const { id: userID } = JSON.parse(localStorage.currentUser);
    if (payerID && paymentId) {
      executePayment(dispatch, userID, paymentId, payerID).then((response) => {
        window.history.replaceState(null, "", "/dashboard/transactions");
        router.reload();
      });
    }
  }, [dispatch, paymentId, payerID]);

  React.useEffect(() => {
    const { id: userID } = JSON.parse(localStorage.currentUser);
    userWalletSummary(dispatch, userID);
  }, [dispatch, router]);

  return (
    <div>
      <WalletCard section={section} />
    </div>
  );
};

export default Transactions;
