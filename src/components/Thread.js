import React, { Component } from 'react';
import axios from 'axios';
import History from './History'


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
        <nav>
          <h2>ConfirmSign Thread Comunication</h2>
          <hr className="first-line" />
        </nav>

        <div className="card-info">
          {
            <>
              <div className="card-info-item"><strong>CfsCode </strong><span>{this.state.cfscode}</span></div>
              <div className="card-info-item"><strong>Date</strong><span>{this.state.date}</span></div>
              <div className="card-info-item"><strong>Subject </strong><span>{this.state.subject}</span></div>
              <div className="card-info-item"><strong>Recipient </strong><span>{this.state.recipient}</span></div>
            </>
          }

          <div className="history-container">
            <h3>History</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

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

