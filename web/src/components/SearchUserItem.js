import React from "react";
import {
  Username,
  Container,
  Stats,
  StatsTitle,
  StatsValue,
  FollowButton,
  UnfollowButton,
} from "../styles/components/SearchUserItem";

export default class SearchUserItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followedByCurrentUser: false
    };
  }

  componentDidMount = () => {
    this.checkIfIsFollowedByCurrentUser();
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.checkIfIsFollowedByCurrentUser();
    }
  }

  checkIfIsFollowedByCurrentUser = () => {
    if (this.props.currentUser.following.includes(this.props.user._id)) {
      this.setState({
        followedByCurrentUser: true
      });
    } else {
      this.setState({
        followedByCurrentUser: false
      });
    }
  };

  render() {
    const { user } = this.props;
    
    return (
      <Container>
        <Username className="mr-3">{user.username}</Username>
        <Stats className="mr-2">
          <StatsTitle>Followers</StatsTitle>
          <StatsValue>{user.followed.length}</StatsValue>
        </Stats>
        <Stats className="mr-2">
          <StatsTitle>Following</StatsTitle>
          <StatsValue>{user.following.length}</StatsValue>
        </Stats>
        <Stats className="mr-5">
          <StatsTitle>Tweets</StatsTitle>
          <StatsValue>{user.tweets.length}</StatsValue>
        </Stats>
        {this.state.followedByCurrentUser ? (
          <UnfollowButton className="ml-3" onClick={() => this.props.onClickUnfollow(user._id)}>
            Unfollow
          </UnfollowButton>
        ) : (
          <FollowButton className="ml-3" onClick={() => this.props.onClickFollow(user._id)}>
            Follow
          </FollowButton>
        )}
      </Container>
    );
  }
}
