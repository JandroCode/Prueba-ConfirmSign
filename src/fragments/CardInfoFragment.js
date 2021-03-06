import React from 'react';

const CardInfoFragment = (props) => {
    return (
        <>
            <div className="card-info-item"><strong>CfsCode </strong><span>{props.cfscode}</span></div>
            <div className="card-info-item"><strong>Date</strong><span>{props.date}</span></div>
            <div className="card-info-item"><strong>Subject </strong><span>{props.subject}</span></div>
            <div className="card-info-item"><strong>Recipient </strong><span>{props.recipient}</span></div>
        </>
    )

}
export default CardInfoFragment;