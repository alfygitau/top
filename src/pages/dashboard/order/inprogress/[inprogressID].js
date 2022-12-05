import React, {useEffect} from 'react';
import Dashboard from "../../../../components/admin/dashboard";

const InProgressOrder = () => {
    useEffect(() => {
        try {
            JSON.parse(localStorage.currentUser);
        } catch (error) {
            localStorage.clear();
            window.location.replace('/user/login');
        }
    }, []);
    return (
        <Dashboard page='order' section='inprogress-order'/>
    );
};

export default InProgressOrder;