import React from 'react';

const History = (props) =>{
    return(
      <>
            <h3 className="event">Event Information</h3>
              <div className="card-event-item"><strong>Date</strong>
                <span>{props.eventoDate}</span>
              </div>
              <div className="card-event-item"><strong>Status</strong>
                <span className="status">{props.eventoStatus}</span>
              </div>
      </>
    )
  }
  

export default History;