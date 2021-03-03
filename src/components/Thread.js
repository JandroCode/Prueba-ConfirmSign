import React, { Component } from 'react';
import axios from 'axios';
import Hijo from './History'


export default class Thread extends Component{
  constructor(props){
    super(props)

    this.state = {
      cfscode:'',
      date:'',
      subject:'',
      recipient:'',
      histoy:[],
      isFetch:true,
      event:[]
    }
  }

  componentDidMount() {
    axios.get('https://virtserver.swaggerhub.com/confirmsign/cfs-4_api/4.0/threads/4170504135949_101235_2_2488629_f385a')
      .then(res => {
        this.setState(
          { cfscode:res.data.cfscode, 
            date:res.data.date,
            subject:res.data.subject,
            recipient:res.data.recipient.address,
            history:res.data.history,
            isFetch:false,
            event:res.data.agreement.forms
          });
      })
  }

  render() {
    if(this.state.isFetch === true){
      return 'Loading'
    }
    return (
      
      <>
      <nav>
        <h2>ConfirmSign Thread Comunication</h2>
        <hr />
      </nav>

     
      <div className="card-info">
        {
            <>
              <div className="card-info-item"><strong>CfsCode </strong><span>{this.state.cfscode}</span></div>
              <div className="card-info-item"><strong>Date</strong><span>{this.state.date}</span></div>
              <div className="card-info-item"><strong>Subject </strong>{this.state.subject}</div>
              <div className="card-info-item"><strong>Recipient </strong>{this.state.recipient}</div>
            </>
              
      
        }

        <div className="history-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
            {
            this.state.history.map((element,i) => (
              <tr key={element.sid}>
                 <td>{element.date} </td> 
                 <td>{element.status}</td>
              </tr>
              ))}
              
            </tbody>

          </table>

        </div>


        {
            this.state.event.map((element,i) => (
              <div key={element.sid}>
                <h2>Evento particular</h2>
                 <p><Hijo eventoDate={element.event.date}/></p>
                 <p><Hijo eventoStatus={element.event.status}/></p>
              </div>
              ))}
        </div>

        </>
    )
  }
}

