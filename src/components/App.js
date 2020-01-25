import React, { Component } from "react";
import { without } from "lodash";
import "../css/App.css";
import AddAppointments from "./AddAppointment";
import SearchAppointments from "./SearchAppointment";
import ListAppointments from "./ListAppointment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { myName: "Saheed", appointments: [], lastIndex: 0, formDisplay: false };

    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }
  componentDidMount() {
    fetch("./data.json")
      .then(res => res.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({ appointments: apts });
      });
  }
  deleteAppointment(apt) {
    let tempApts = this.state.appointments;
    tempApts = without(tempApts, apt);
    this.setState({ appointments: tempApts });
  }
  toggleForm(){
    this.setState({ formDisplay: !this.state.formDisplay});
  }
  render() {
    return (
      <main className='page bg-white' id='petratings'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 bg-white'>
              <div className='container'>
                <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm} />
                <SearchAppointments />
                <ListAppointments
                  appointments={this.state.appointments}
                  deleteAppointment={this.deleteAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
