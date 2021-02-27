import React from 'react';
import '../../../Containers/DashboardPage/DashboardPage.css';

class OrderList extends React.Component {

  render() {
    const data = JSON.parse(localStorage[('myBackEndData')]).dasbhoardPage.orders;

    const renderingData = data.map((item,pos)=>{

        let classStr = 'tm-status-circle';

        switch (item.status) {
            case 'Moving':
                classStr+= ' moving';
                break;
            case 'Pending':
                classStr+= ' pending';
                break;
            case 'Cancelled':
                classStr+= ' cancelled';
                break;
            case 'Delivered':
                    classStr+= ' delivered';
                    break;
            default: classStr = 'tm-status-circle';
        }

        return (
            <tr key={pos+1}>
                <th><b>#{item.orderNo}</b></th>
                <td>
                    <div className={classStr}>
                    </div>{item.status}
                </td>
                <td><b>{item.operators}</b></td>
                <td><b>{item.location}</b></td>
                <td><b>{item.distance} km</b></td>
                <td>{item.startDate}</td>
                <td>{item.deliveryDate}</td>
            </tr>
        )
    });

    return (
        <div className="order">
            <div>
                <h2>Order List</h2>
                <div className="order-table-wrapper">
                    <table className="table" >
                        <thead>
                            <tr>
                                <th>ORDER NO.</th>
                                <th>STATUS</th>
                                <th>OPERATORS</th>
                                <th>LOCATION</th>
                                <th>DISTANCE</th>
                                <th>START DATE</th>
                                <th>EST DELIVERY DUE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderingData}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }
}

export default OrderList;