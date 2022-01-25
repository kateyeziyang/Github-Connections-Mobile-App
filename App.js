import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CONSTANTS from './constants';
import { ProfileScreen } from './components/profile'
import { FollowScreen } from './components/follow'
import { RepoScreen } from './components/repo'
import { LoadingScreen } from './components/loading'
import Icon from 'react-native-vector-icons/Entypo';

export default function App() {
  return (
    <NavigationContainer>
        <Home loginUser={'kateyeziyang'}/>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
function Home({ loginUser }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Profile':
              iconName = 'user';
              break;
            case 'Repo':
              iconName = 'flow-tree';
              break;
            case 'Followers':
              iconName = 'users';
              break;
            default:
              iconName = 'users'
          }
          return(<Icon name={iconName} size={size} color={color} />);
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Profile">
        {props => <Profile {...props} loginUser={'kateyeziyang'} doPush={false}/>}
      </Tab.Screen>
      <Tab.Screen name="Repo">
        {props => <RepoWrapper {...props} loginUser={'kateyeziyang'}/>}
      </Tab.Screen>
      <Tab.Screen name="Followers">
        {props => <FollowWrapper {...props} loginUser={'kateyeziyang'} isFollower={true}/>}
      </Tab.Screen>
      <Tab.Screen name="Following">
        {props => <FollowWrapper {...props} loginUser={'kateyeziyang'} isFollower={false}/>}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function Profile({ navigation, loginUser, doPush, route }) {
  let username;
  let curPush;
  console.log("Current Push");
  if (route.params) {
    const { uid } = route.params;
    const { followPush } = route.params;
    username = uid;
    curPush = followPush;
  } else {
    username = loginUser;
    curPush = doPush;
  }
  console.log(curPush);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'DONE':
          return {
            ...prevState,
            isLoading: false,
            gitdata: action.gdata,
          };
      }
    },
    {
      isLoading: true,
      gitdata: null,
    }
  );

  React.useEffect(() => {
    const query = "{ user(login: \""+username+`\")
    {
      avatarUrl
      name
      login
      bio
      websiteUrl
      email
      followers(first: 100) {
        totalCount
      }
      following(first: 100) {
        totalCount
      }
      updatedAt
      repositories(first: 100) {
        totalCount
      }
    }}
    `;
    bootstrapAsync(query, dispatch);
  }, []);

  return (
      state.isLoading ? (
        <LoadingScreen />
      ) : (
        <ProfileScreen extra={state.gitdata} navigation={navigation} doPush={curPush}/>
      )
  );
}

const RepoStack = createStackNavigator();
function RepoWrapper({ loginUser }) {
  return(
    <RepoStack.Navigator initialRouteName="Repo">
      <RepoStack.Screen name="Repo">
        {props => <Repo {...props} loginUser={loginUser}/>}
      </RepoStack.Screen>
      <RepoStack.Screen name="Followers">
        {props => <Follow {...props} loginUser={loginUser} isFollower={true}/>}
      </RepoStack.Screen>
      <RepoStack.Screen name="Following">
        {props => <Follow {...props} loginUser={loginUser} isFollower={false}/>}
      </RepoStack.Screen>
      <RepoStack.Screen name="Profile">
        {props => <Profile {...props} doPush={true}/>}
      </RepoStack.Screen>
    </RepoStack.Navigator>
  )
}

function Repo({ navigation, loginUser, route }) {
  let username;
  if (route.params) {
    const { uid } = route.params;
    username = uid;
  } else {
    username = loginUser;
  }

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'DONE':
          return {
            ...prevState,
            isLoading: false,
            gitdata: action.gdata,
          };
      }
    },
    {
      isLoading: true,
      gitdata: null,
    }
  );

  React.useEffect(() => {
    const query = "{ user(login: \""+username+`\")
    {
      repositories(first: 100) {
        nodes {
          name
          owner {
            login
          }
          description
        }
      }
    }}
    `;
    bootstrapAsync(query, dispatch);
  }, []);

  return (
      state.isLoading ? (
        <LoadingScreen />
      ) : (
        <RepoScreen extra={state.gitdata} navigation={navigation}/>
      )
  );
}

const FollowStack = createStackNavigator();
function FollowWrapper({ loginUser, isFollower }) {
  let followName;
  if (isFollower) {
    followName = "Follower";
  } else {
    followName = "Following";
  }

  return(
    <FollowStack.Navigator initialRouteName={followName}>
      <FollowStack.Screen name="Followers">
        {props => <Follow {...props} loginUser={loginUser} isFollower={isFollower}/>}
      </FollowStack.Screen>
      <FollowStack.Screen name="Following">
        {props => <Follow {...props} loginUser={loginUser} isFollower={isFollower}/>}
      </FollowStack.Screen>
      <FollowStack.Screen name="Profile">
        {props => <Profile {...props} doPush={true}/>}
      </FollowStack.Screen>
      <FollowStack.Screen name="Repo">
        {props => <Repo {...props} loginUser={loginUser}/>}
      </FollowStack.Screen>
    </FollowStack.Navigator>
  )
}

function Follow({ navigation, loginUser, isFollower, route }) {
  console.log(navigation);
  let username;
  let isFollower2;
  if (route.params) {
    const { uid } = route.params;
    const { isFollower1 } = route.params;
    username = uid;
    isFollower2 = isFollower1;
  } else {
    username = loginUser;
    isFollower2 = isFollower;
  }

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'DONE':
          return {
            ...prevState,
            isLoading: false,
            gitdata: action.gdata,
          };
      }
    },
    {
      isLoading: true,
      gitdata: null,
    }
  );

  React.useEffect(() => {
    let followQuery;
    if (isFollower2) {
      followQuery = `
      {
        followers(first: 100) {
          nodes {
            avatarUrl
            name
            login
          }
        }
      }}
      `
    } else {
      followQuery = `
      {
        following(first: 100) {
          nodes {
            avatarUrl
            name
            login
          }
        }
      }}
      `
    }
    const query = "{ user(login: \""+username+"\")"+followQuery;
    bootstrapAsync(query, dispatch);
  }, []);

  return (
      state.isLoading ? (
        <LoadingScreen />
      ) : (
        <FollowScreen extra={state.gitdata} isFollower={isFollower2} navigation={navigation}/>
      )
  );
}

const bootstrapAsync = async (query, dispatch) => {
  let gitdata;
  const accessToken = CONSTANTS.GIT_TOKEN;
  const opt = {
    method: 'POST',
    body: JSON.stringify({query}),
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  try {
    let response = await fetch('https://api.github.com/graphql', opt);
    let responseJson = await response.json();
    // console.log(responseJson);
    gitdata = responseJson.data.user;
  } catch (e) {
    alert('Some error happened. Please exit and try again');
  }
  dispatch({ type: 'DONE', gdata: gitdata });
};
