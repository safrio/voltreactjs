import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import TopMenu from './components/TopMenu';
import Posts from './components/Posts';
import AddPostForm from './components/AddPostForm';
import AvatarForm from './components/AvatarForm';
import autoBind from 'react-autobind';
import '../node_modules/toastr/build/toastr.css';
import toastr from 'toastr';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showLoginForm: true,
      showAddPostForm: false,
      AvatarForm: false,
      avatarStatus: false,
      host: 'https://dry-plateau-99266.herokuapp.com',
      token: '',
      urls: {
        login: '/auth_user',
        posts: '/api/v1/posts',
        createPost: '/api/v1/posts',
        uploadAvatar: '/api/v1/users/avatar/create',
        showAvatar: '/api/v1/users/avatar/show'
      },
      textInputs: {
        email: '',
        password: '',
        title: '',
        body: ''
      },
      posts: [],
      avatar: {},
      avatarSrc: ''
    };

    autoBind(this);
  }

  okConfirm() {
    this.auth()
  }

  changeField(field, value) {
    let data = this.state.textInputs;
    data[field] = value;
    return this.setState({textInputs: data});
  }

  auth() {
    let data = this.state.textInputs;

    let request = new Request(this.getURI('login'), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      method: 'post',
      body: `email=${data['email']}&password=${data['password']}`
    });

    fetch(request)
      .then((response) => {
        this.checkResponse(response, this.parseToken);
      })
      .catch((err) => {
        toastr.error(err);
      });
  }

  closeConfirm() {
    this.setState({
      showLoginForm: false
    });
  }

  getURI(uri) {
    return [this.state.host, this.state.urls[uri]].join('');
  }

  reloadPosts() {
    let request = new Request(
      this.getURI('posts')+'?page=1&per_page=99999', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${this.state.token}`
      },
      method: 'GET'
    });

    fetch(request)
      .then((response) => {
        this.checkResponse(response, this.parsePosts);
      })
      .catch((err) => {
        toastr.error(err);
      });
  }

  checkResponse(response, callback) {
    if (response.ok) {
      response.json().then(callback);
    } else {
      toastr.error(`Invalid HTTP response status ${response.status}`);
    }
  }

  parsePosts(json) {
    this.setState({
      posts: json
    });
  }

  parseToken(json) {
    this.setState({
      token: json['auth_token']
    });
    this.closeConfirm();
    this.reloadPosts()
  }

  switchShowAddPostForm() {
    this.setState({
      showAddPostForm: !this.state.showAddPostForm
    });
  }

  switchAvatarForm() {
    if (!this.setState.AvatarForm) this.reloadAvatar();

    this.setState({
      AvatarForm: !this.state.AvatarForm
    });

  }

  reloadAvatar() {
    let request = new Request(
      this.getURI('showAvatar'), {
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      },
      method: 'get'
    });

    fetch(request)
      .then((response) => {
        this.checkResponse(response, (json) => {
          this.setState({
            avatarSrc: json['thumb']
          });
        });
      })
      .catch((err) => {
        toastr.error(err);
      });
  }

  addPost() {
    let data = this.state.textInputs;

    let request = new Request(
      this.getURI('createPost'), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': `Bearer ${this.state.token}`
      },
      method: 'post',
      body: `title=${data['title']}&published_at=${data['published_at']}&body=${data['body']}`
    });

    fetch(request)
      .then((response) => {
        this.checkResponse(response, this.afterAddPost);
      })
      .catch((err) => {
        toastr.error(err);
      });
  }

  afterAddPost() {
    this.switchShowAddPostForm();
    this.reloadPosts();
    this.setState({
      textInputs: {
        title: '',
        body: ''
      }
    });
  }

  switchAvatarStatus() {
    this.setState({
      avatarStatus: !this.state.avatarStatus
    });
  }


  uploadAvatar() {
    let formData = new FormData();
    formData.append('avatar', this.state.avatar);

    this.switchAvatarStatus();

    let request = new Request(
      this.getURI('uploadAvatar'), {
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      },
      method: 'post',
      contentType: false,
      processData: false,
      body: formData
    });

    fetch(request)
      .then((response) => {
        this.checkResponse(response, this.afterUploadAvatar);
      })
      .catch((err) => {
        this.switchAvatarStatus();
        toastr.error(err);
      });
  }

  afterUploadAvatar() {
    this.switchAvatarStatus();
    this.reloadAvatar();
  }

  fileChange(event) {
    this.setState({
      avatar: event.target.files[0]
    });
  }

  render() {
    return (
      <div className="App">
        <TopMenu
          addPostClick={this.switchShowAddPostForm}
          showAvatarClick={this.switchAvatarForm} />
        <Posts posts={this.state.posts} />
        <AddPostForm
          visible={this.state.showAddPostForm}
          data={this.state.textInputs}
          save={this.addPost}
          close={this.switchShowAddPostForm}
          onChange={this.changeField} />
        <AvatarForm
          visible={this.state.AvatarForm}
          upload={this.uploadAvatar}
          close={this.switchAvatarForm}
          fileChange={this.fileChange}
          avatarStatus={this.state.avatarStatus}
          avatarSrc={this.state.avatarSrc} />
        <LoginForm visible={this.state.showLoginForm}
          data={this.state.textInputs}
          login={this.auth}
          onChange={this.changeField} />
      </div>
    );
  }
}

export default App;
