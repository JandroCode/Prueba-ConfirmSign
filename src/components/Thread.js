import React, { Component } from 'react';
import axios from 'axios';
import History from './History';
import NavFragment from '../fragments/NavFragment';
import TheadFragment from '../fragments/TheadFragment';
import CardInfoFragment from '../fragments/CardInfoFragment';

export default class Thread extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cfscode: '',
      date: '',
      subject: '',
      recipient: '',
      histoy: [],
      isFetch: true,
      event: []
    }
  }

  componentDidMount() {
    axios.get('https://virtserver.swaggerhub.com/confirmsign/cfs-4_api/4.0/threads/4170504135949_101235_2_2488629_f385a')
      .then(res => {
        this.setState(
          {
            cfscode: res.data.cfscode,
            date: res.data.date,
            subject: res.data.subject,
            recipient: res.data.recipient.address,
            history: res.data.history,
            isFetch: false,
            event: res.data.agreement.forms
          })
      }).catch(err => console.log(err));
  }

  render() {
    if (this.state.isFetch === true) {
      return 'Loading'
    }
    return (
      <>
        <NavFragment />
        <div className="card-info">
          {
            <CardInfoFragment cfscode={this.state.cfscode} date={this.state.date}
                      subject={this.state.subject} recipient={this.state.recipient}      
             />
          }

          <div className="history-container">
            <h3>History</h3>
            <table>
              <TheadFragment/>
              <tbody>
                <div className="separator"></div>
                {this.state.history.map((element, i) => (
                  <tr key={element.sid}>
                    <td>{element.date} </td>
                    <td><span>{element.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {this.state.event.map((element, i) => (
            <div key={element.sid}>
              <h3 className="event">Event Information</h3>
              <div className="card-event-item"><strong>Date</strong>
                <span><History eventoDate={element.event.date} /></span>
              </div>
              <div className="card-event-item"><strong>Status</strong>
                <span className="status"><History eventoDate={element.event.status} /></span>
              </div>
            </div>
          ))}
        </div>

      </>
    )
  }
}

