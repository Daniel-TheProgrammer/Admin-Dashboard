import React from 'react';
import './DashboardPage.css';

import LatestHits from '../../Components/DashboardPage/Charts/LatestHits';
import Perform from '../../Components/DashboardPage/Charts/Performance';
import Storage from '../../Components/DashboardPage/Charts/Storage';
import Notifications from '../../Components/DashboardPage/Notifications/Notifications';
import OrderList from '../../Components/DashboardPage/OrderList/OrderList';

class Dashboard extends React.Component {

  render() {

    return (

      <div className="dashboard container">

        <p className="greeting">Welcome back, <b>{JSON.parse(localStorage[('userData')]).userName}</b></p>

        <div className="charts">
          
            <LatestHits />
            <Perform />
            <Storage />
            <Notifications />
            <OrderList />

        </div>

      </div>
    );
  }
}

export default Dashboard;
