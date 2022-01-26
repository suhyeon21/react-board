import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef(); //createRef는 특정 DOM을 잡아야 할 때 사용, 컴포넌트에 접근하여 원하는 값 제공?useRef 방식이랑 비교, 각 컴포넌트의 핸들을 가져오는 ref
  }
  state = {
    maxNo: 3, //기본적으로 2개의 데이터 갖고 있는 상황이기 때문
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

  handleSaveData = (data) => {
    let boards = this.state.boards;
    if (data.brdno === null || data.brdno === "" || data.brdno === undefined) {
      //new : Insert
      this.setState({
        maxNo: this.state.maxNo + 1,
        boards: boards.concat({
          brdno: this.state.maxNo,
          brddate: new Date(),
          brdwriter: data.brdwriter,
          brdtitle: data.brdtitle,
        }),
      });
    } else {
      this.setState({
        boards: boards.map((row) =>
          data.brdno === row.brdno ? { ...data } : row,
        ),
      });
    }
  };

  handleRemove = (brdno) => {
    this.setState({
      boards: this.state.boards.filter((row) => row.brdno !== brdno),
    });
  };

  render() {
    const { boards } = this.state; //const boards = this.state.boards

    return (
      <div>
        <BoardForm onSaveData={this.handleSaveData} />
        <table border="1">
          <tbody>
            <tr align="center">
              <td width="50">No.</td>
              <td width="300">Title</td>
              <td width="100">Name</td>
              <td width="100">Date</td>
            </tr>
            {boards.map((row) => (
              <BoardItem
                key={row.brdno}
                row={row} //이걸 왜 줬을까, 데이터 하나 하나에 접근하려고?
                onRemove={this.handleRemove}
                onSelectRow={this.handleSelectRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  handleSelectRow = (row) => {
    this.child.current.handleSelectRow(row);
  };
  render() {
    const { boards } = this.state;

    return (
      <div>
        <BoardForm onSaveData={this.handleSaveData} ref={this.child} />
        <table border="1">
          <tbody>
            <tr align="center">
              <td width="50">No.</td>
              <td width="300">Title</td>
              <td width="100">Name</td>
              <td width="100">Date</td>
            </tr>
            {boards.map((row) => (
              <BoardItem
                key={row.brdno}
                row={row}
                onRemove={this.handleRemove}
                onSelectRow={this.handleSelectRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class BoardItem extends React.Component {
  handleRemove = () => {
    const { row, onRemove } = this.props;
    onRemove(row.brdno);
  };

  render() {
    // const r = this.props.row;
    // console.log(r);
    console.log(this.props.brdno);
    return (
      <tr>
        <td>{this.props.row.brdno}</td>
        <td>
          <a onClick={this.handleSelectRow}>{this.props.row.brdtitle}</a>
        </td>
        <td>{this.props.row.brdwriter}</td>
        <td>{this.props.row.brddate.toLocaleDateString("ko-KR")}</td>
        <td>
          <button onClick={this.handleRemove}>X</button>
        </td>
      </tr>
    );
  }

  handleSelectRow = () => {
    const { row, onSelectRow } = this.props;
    onSelectRow(row);
  };
  render() {
    return (
      <tr>
        <td>{this.props.row.brdno}</td>
        <td>
          <a onClick={this.handleSelectRow}>{this.props.row.brdtitle}</a>
        </td>
        <td>{this.props.row.brdwriter}</td>
        <td>{this.props.row.brddate.toLocaleDateString("ko-KR")}</td>
        <td>
          <button onClick={this.handleRemove}>X</button>
        </td>
      </tr>
    );
  }
}

class BoardForm extends Component {
  state = {
    brdwriter: "",
    brdtitle: "", //원래 state 비워놨는데 이거 왜 적었는지 모르겠음
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSelectRow = (row) => {
    this.setState(row); //부모로부터 받은 값 그대로state로
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSaveData(this.state);
    this.setState({
      brdno: "",
      brdwriter: "",
      brdtitle: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="title"
          name="brdtitle"
          value={this.state.brdtitle}
          onChange={this.handleChange} //입력 상자와 handleChange 연결, 컴포넌트 내의 변수나 함수 참조할 경우 this 붙임
        />
        <input
          placeholder="name"
          name="brdwriter"
          value={this.state.brdwriter}
          onChange={this.handleChange}
        />
        <button type="submit">Save</button>
      </form>
    );
  }
}
export default App;
