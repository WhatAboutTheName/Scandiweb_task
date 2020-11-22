import './swipe.css';
import './app.css';

const URL = 'https://jsonplaceholder.typicode.com/photos';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      range: 0,
      touchDown: 0,
      targetNumber: 0,
      prevNumber: 0,
      nextNumber: 1,
      elNumber: 0,
      data: [],
      error: null
    }
    this.leftPhoto = React.createRef();
    this.centerPhoto = React.createRef();
    this.rightPhoto = React.createRef();

    this.getSomePhoto = this.getSomePhoto.bind(this);
  }

  componentDidMount() {
    fetch(URL)
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({
            ...this.state,
            prevNumber: res.length - 1,
            data: res
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  }

  getSomePhoto(value) {
    let number = this.state.elNumber;
    if (value === 'previous') {
      this.setState({ ...this.state, elNumber: number -= 1 });
      if (number === -1) this.setState({
        ...this.state,
        elNumber: number = this.state.data.length - 1
      });
    } else {
      this.setState({ ...this.state, elNumber: number += 1 });
      if (number === this.state.data.length) this.setState({
        ...this.state,
        elNumber: number = 0
      });
    }
  }

  setValue(e) {
    let newNumber = this.state.targetNumber;
    if (e.keyCode === 13) {
      if (newNumber <= 0 || newNumber > this.state.data.length) {
        this.setState({ ...this.state, elNumber: this.state.elNumber });
      } else {
        this.setState({
          ...this.state,
          elNumber: Number(newNumber) === 1 ? Number(newNumber) - 1 : Number(newNumber) - 1
        });
      }
    }
  }

  touchStart(e) {
    this.setState({
      ...this.state,
      touchDown: e.changedTouches[0].clientX,
      range: 0
    });
  }

  swipe(e) {
    const dinamicX = e.changedTouches[0].clientX;
    const range = dinamicX - this.state.touchDown;
    this.setState({
      ...this.state,
      range: range
    });
    this.centerPhoto.current.style.transform = `translateX(${range}px)`;
    if (range > 0) {
      this.leftPhoto.current.style.transform = `translateX(${range}px)`;
      this.rightPhoto.current.style.transform = `translateX(${range}px)`;
    } else {
      this.leftPhoto.current.style.transform = `translateX(${range}px)`;
      this.rightPhoto.current.style.transform = `translateX(${range}px)`;
    }
  }

  touchEnd() {
    this.centerPhoto.current.style.transform = `translateX(0px)`;
    this.leftPhoto.current.style.transform = `translateX(0px)`;
    this.rightPhoto.current.style.transform = `translateX(0px)`;
    if (this.state.range > 150) {
      this.getSomePhoto('previous');
    }
    if (this.state.range < -150) {
      this.getSomePhoto('next');
    }
  }

  render() {
    return (
      <div className="container">
        <div className="arrow_btn center" onClick={() => this.getSomePhoto('previous')}>
          <i className="left_arrow" />
        </div>
        <div
          className="content center"
          onTouchStart={e => this.touchStart(e)}
          onTouchMove={e => this.swipe(e)}
          onTouchEnd={e => this.touchEnd(e)}
        >
          {
            this.state.data.length &&
            <>
              <img src={
                this.state.data[
                  this.state.elNumber === 0 ?
                    this.state.prevNumber = this.state.data.length - 1 : this.state.prevNumber = this.state.elNumber - 1
                ].url
              } ref={this.leftPhoto} className="swipe" />
              <img src={
                this.state.data[
                  this.state.elNumber
                ].url
              } ref={this.centerPhoto} className="swipe padding" />
              <img src={
                this.state.data[
                  this.state.elNumber === this.state.data.length - 1 ?
                    this.state.nextNumber = 0 : this.state.nextNumber = this.state.elNumber + 1
                ].url
              } ref={this.rightPhoto} className="swipe" />
            </>
          }
        </div>
        <div className="fast_scroll">
          <input
            type="number"
            step="1"
            onChange={e => this.setState({ ...this.state, targetNumber: e.target.value })}
            onKeyDown={e => this.setValue(e)}
          />
          /
          {
            this.state.data.length ?
              this.state.data.length : 0
          }
        </div>
        <div className="arrow_btn center" onClick={() => this.getSomePhoto('next')} >
          <i className="right_arrow" />
        </div>
      </div>
    );
  }
}

export default App;
