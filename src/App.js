import React from 'react';

class App extends React.Component {
    constructor() {
        super();{/* using super to pass props and their initial state */}

        this.state = {
            final_balance: 0,
            addresses: [],
            total_received: 0,
            total_sent: 0,
            transaction: [],
        };
        {/* Setting inital state for the prop where addresses and transactions are array */}
    }


    componentWillMount() {
        fetch('https://blockchain.info/multiaddr?active=1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq&cors=true&n=50')/* This is to fetch the data from the web address where cors = true and transaction is linited to 50 for now */
            .then(results => {
                return results.json();{/* All the data is feteched from the url above is stored in the result.json*/}

            }).then(data => {
                console.log(data);
                this.setState({
                    final_balance: data.wallet.final_balance,/* Segragated the fields to get the data depending on the data required to be dispalyed */
                    total_received: data.wallet.total_received,
                    total_sent: data.wallet.total_sent,
                    addresses: data.addresses,/*For arrays will use mapping in the render section*/
                    transaction: data.txs,
                });
                console.log(this.state.transaction);
            })
    }

    render() {
        return (
          <div>
            <img src = "http://theme.zdassets.com/theme_assets/224702/f1769fc082175cd2e7ef495fc941b08f235d0a41.png" />
            <h3> For Bitcoin Address </h3> {
                this.state.addresses.map(value => (
                  <ul>
                    <li>
                      {value.address}/*This would map over all the array values and print it out*/
                    </li>
                  </ul >
                ))
            }
            <p> <strong> Final Balance </strong> : U.S.D ${this.state.final_balance}</p>
            <p> <strong> Total Received </strong>: U.S.D ${this.state.total_received}</p>
            <p> <strong> Total Sent </strong>: U.S.D ${this.state.total_sent}</p>
            <h4> Top 50 Transactions </h4> {
                this.state.transaction.map(value => (
                  <ul>
                    <li>
                      <strong> Hash Value </strong>: {value.hash}
                    </li>
                    <li>
                      <strong> Balance of Transcation < /strong>: ${value.balance}
                    </li>
                  </ul>

                ))
            } </div>

        );
    }
}

export default App;
