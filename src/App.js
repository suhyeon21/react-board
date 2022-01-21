import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    boards: [
      {
        brdno: 1,
        brdwriter: "Lee SunSin",
        brdtitle: "If you intend to live then you die",
        brddate: new Date(),
      },
      {
        brdno: 2,
        brdwriter: "So Sino",
        brdtitle: "Founder for two countries",
        brddate: new Date(),
      },
    ],
  };
  render() {
    const { boards } = this.state; //const boards = this.state.boards
    const list = boards.map(function (row) {
      return row.brdno + row.brdwriter;
    });

    return <div>{list}</div>;
  }
}

export default App;
