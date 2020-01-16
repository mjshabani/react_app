var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;

axios.defaults.baseURL = 'http://127.0.0.1:8080/api';

let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }
  signIn() {
    axios.post('/admin/login',
    {
      username: this.state.username,
      password: this.state.password
    }, axiosConfig)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }
  render() {
    return (
      <div>
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label for="inputusername" className="sr-only">username address</label>
          <input type="username" onChange={this.handleUsernameChange} id="inputusername" className="form-control" placeholder="username address" required autofocus />
          <label for="inputPassword" className="sr-only">Password</label>
          <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />

          <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn} type="button">Sign in</button>
        </form>
        <div>
          <Link to="/signup">{'Signup'}</Link>
        </div>
      </div>

    )
  }
}

class Signup extends React.Component {
  render() {
    return (
      <div>
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign up</h2>
          <label for="inputName" className="sr-only">Name</label>
          <input type="name" onChange={this.handleNameChange} id="inputName" className="form-control" placeholder="Name" required autofocus />
          <label for="inputusername" className="sr-only">username address</label>
          <input type="username" onChange={this.handleUsernameChange} id="inputusername" className="form-control" placeholder="username address" required autofocus />
          <label for="inputPassword" className="sr-only">Password</label>
          <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />

          <button className="btn btn-lg btn-primary btn-block" onClick={this.signUp} type="button">Sign up</button>
        </form>
        <div>
          <Link to="/">{'AdminLogin'}</Link>
        </div>
      </div>

    )
  }
}


ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={AdminLogin} path="/"></Route>
    <Route component={Signup} path="/signup"></Route>
  </Router>,
  document.getElementById('app'));