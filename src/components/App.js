import React, { Component } from "react";
import "../css/App.css";
import AddAppointments from "./AddAppointment";
import SearchAppointments from "./SearchAppointment";
import ListAppointments from "./ListAppointment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { myName: "Saheed", appointments: [], lastIndex: 0 };
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
  render() {
    return (
      <main className='page bg-white' id='petratings'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 bg-white'>
              <div className='container'>
                <AddAppointments />
                <SearchAppointments />
                <ListAppointments appointments={this.state.appointments} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
