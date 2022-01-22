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

    return (
      <div>
        <table border="1">
          <tbody>
            <tr align="center">
              <td width="50">No.</td>
              <td width="300">Title</td>
              <td width="100">Name</td>
              <td width="100">Date</td>
            </tr>
            {boards.map((row) => (
              <BoardItem key={row.brdno} row={row} /> //BoardItem 이라고 앞에 왜 적었지? Boarditem 컴포넌트 이용하려고?
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class BoardItem extends React.Component {
  render() {
    const r = this.props.row;
    console.log(r);
    return (
      <tr>
        <td>{this.props.row.brdno}</td>
        <td>{this.props.row.brdtitle}</td>
        <td>{this.props.row.brdwriter}</td>
        <td>{this.props.row.brddate.toLocaleDateString("ko-KR")}</td>
      </tr>
    );
  }
}

export default App;
