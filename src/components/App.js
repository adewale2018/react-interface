import React, { Component } from "react";
import { without } from "lodash";
import "../css/App.css";
import AddAppointments from "./AddAppointment";
import SearchAppointments from "./SearchAppointment";
import ListAppointments from "./ListAppointment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      formDisplay: false,
      orderBy: "aptDate",
      orderDir: "asc",
      lastIndex: 0
    };

    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
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
  toggleForm() {
    this.setState({ formDisplay: !this.state.formDisplay });
  }
  addAppointment(apt) {
    let tempApts = this.state.appointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      appointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });
  }
  changeOrder() {

  }
  render() {
    let order;
    let filteredApts = this.state.appointments;
    if (this.state.orderDir === "asc") {
      order = 1;
    } else {
      order = -1;
    }
    filteredApts.sort((a, b) => {
      if (
        a[this.state.orderBy].toLowerCase() <
        b[this.state.orderBy].toLowerCase()
      ) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    });
    return (
      <main className='page bg-white' id='petratings'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 bg-white'>
              <div className='container'>
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment}
                />
                <SearchAppointments orderBy={this.state.orderBy} orderDir={this.state.orderDir} changeOrder={this.changeOrder} />
                <ListAppointments
                  appointments={filteredApts}
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
