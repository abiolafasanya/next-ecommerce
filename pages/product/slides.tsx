import React, { Component } from 'react';
import Alert, { AlertMsg } from '../../components/Alert';

type classTypes = {
  firstname: string;
  lastname: string;
  submitted: boolean;
  message: string;
};

type classProps = {
  username: string;
};

export class slides extends Component<classProps, classTypes> {
  static propTypes = { username: 'abiola fasanya' };

  inputRef = React.createRef<HTMLInputElement>()

  componentDidMount() {
    this.inputRef.current?.focus()
  }

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      submitted: false,
      message: '',
    };
  }
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.setState((prev) => ({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      submitted: !this.state.submitted,
      message: 'your data has been submitted successfully',
    }));
    setTimeout(() => {
      this.setState(prev => ({
        firstname: '',
      lastname: '',
      submitted: !this.state.submitted,
      message: '',
      }))
    }, 3000)
    console.clear();
    console.log(this.state.firstname);
  };

  render() {
    return (
      <div>
        <div className="max-w-2xl mx-auto mt-14">
          <form onSubmit={this.handleSubmit}>
            <h2 className="text-2xl">User Data</h2>
            {this.state.submitted && (
              <AlertMsg type="alert-success" message={this.state.message} />
            )}
            <div className="form-group">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                className="form-control"
                ref={this.inputRef}
                onChange={(e) => this.setState({ firstname: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstname" className="form-label">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                className="form-control"
                onChange={(e) => this.setState({ lastname: e.target.value })}
              />
            </div>
            <div className="form-group">
              <button className="btn py-3 px-5 ronded-sm text-blue-50">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default slides;
