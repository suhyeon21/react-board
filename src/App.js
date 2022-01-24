import React, { Component } from "react";

class App extends Component {
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
    this.setState({
      boards: this.state.boards.concat({
        brdno: this.state.maxNo++,
        brddate: new Date(),
        ...data, // ...은 뭔가 복사해온다는 것 같은데 여기서 data에 뭐가 들어온다는 거지?title과 name은 입력값 받아서 작성하니까
      }),
    });
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
          <a onClick={this.handleSelectRow}>{this.props.row.brdttile}</a>
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
  //1
  state = {};

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSaveData(this.state); //이 부분 왜 쓴건지 모르겠음, 이 함수 자체가 이해가 안감. state 비우는 건가
    this.setState({});
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="title"
          name="brdtitle"
          onChange={this.handleChange} //입력 상자와 handleChange 연결, 컴포넌트 내의 변수나 함수 참조할 경우 this 붙임
        />
        <input
          placeholder="name"
          name="brdwriter"
          onChange={this.handleChange}
        />
        <button type="submit">Save</button>
      </form>
    );
  }
}
export default App;
