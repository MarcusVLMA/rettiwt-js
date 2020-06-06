import React from "react";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import { withSnackbar } from 'notistack';
import Menu from "../components/Menu";
import SearchUserItem from "../components/SearchUserItem";
import { Background } from "../styles/General";
import {
  Container,
  ListUserCard,
  SearchInput,
} from "../styles/screens/SearchUser";
import backendApi from "../backendApi";


class SearchUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      currentUser: {},
    };
    
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    const response = await backendApi.get("/users");
    this.setState({
      currentUser: response.data,
    });
  };

  search = async (searchInput) => {
    if (searchInput) {
      const response = await backendApi.get(`/search/users/${searchInput}`);
      if (response.data) {
        this.setState({
          usersList: response.data,
        });
      } else {
        this.setState({
          usersList: [],
        });
      }
    } else {
      this.setState({
        usersList: [],
      });
    }
  };

  onClickFollow = async (userIdToFollow) => {
    const response = await backendApi.post("/follow", { userIdToFollow });
    if(response.ok) {
      let currentUser = this.state.currentUser;
      currentUser.following.push(userIdToFollow);
      this.setState({ currentUser });
    } else {
      this.props.enqueueSnackbar('Ops. Could not follow this user. Try again later', { variant:'error' });
    }
  }

  onClickUnfollow = async (userIdToUnfollow) => {
    const response = await backendApi.post("/unfollow", { userIdToUnfollow });
    if(response.ok) {
      let currentUser = this.state.currentUser;
      
      for(let i = 0; i < currentUser.following.length; i++) {
        if(currentUser.following[i] === userIdToUnfollow) {
          currentUser.following.splice(i, 1);
          break;
        }
      }

      this.setState({ currentUser });
    } else {
      this.props.enqueueSnackbar('Ops. Could not unfollow this user. Try again later', { variant:'error' });
    }
  }

  render() {
    const { usersList } = this.state;
    return (
      <Background className="d-flex justify-content-center">
        <Container className="mr-4">
          <SearchInput
            multiline
            className="w-100 pl-3 pt-2 pr-3 pb-2"
            placeholder="Search for some username"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            inputProps={{ "aria-label": "naked" }}
            onChange={(event) => this.search(event.target.value)}
          />
          {usersList.length > 0 ? (
            <ListUserCard className="mt-3">
              {usersList.map((user) => {
                if(this.state.currentUser._id !== user._id) {
                  return (
                    <SearchUserItem 
                      user={user}
                      currentUser={this.state.currentUser}
                      onClickFollow={this.onClickFollow}
                      onClickUnfollow={this.onClickUnfollow} 
                    />);
                }
              })}
            </ListUserCard>
          ) : null}
        </Container>
        <Menu history={this.props.history} />
      </Background>
    );
  }
}

export default withSnackbar(SearchUser);