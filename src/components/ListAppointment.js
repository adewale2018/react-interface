import React, { Component } from "react";
import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

class ListAppointment extends Component {
  render() {
    return (
      <div className='appointment-list item-list mb-3'>
        {this.props.appointments.map(
          ({ petName, aptDate, ownerName, aptNotes, aptId }) => (
            <div className='pet-item col media py-3' key={aptId}>
              <div className='mr-3'>
                <button className='pet-delete btn btn-sm btn-danger'>
                  <FaTimes />
                </button>
              </div>

              <div className='pet-info media-body'>
                <div className='pet-head d-flex'>
                  <span className='pet-name'>{petName}</span>
                  <span className='apt-date ml-auto'>
                    <Moment
                      date={aptDate}
                      parse="YYYY-MM-dd hh:mm"
                      format="MMM-d h:mma"
                     />
                  </span>
                </div>

                <div className='owner-name'>
                  <span className='label-item'>Owner: </span>
                  <span>{ownerName}</span>
                </div>
                <div className='apt-notes'>{aptNotes}</div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default ListAppointment;
