// import AppNavigation from './config/appNavigation'
// import provider from './config/provider'
import provider from './config/provider'
import { App } from './redux/store'
export default provider(App)

// import React from "react";
// import { BackHandler } from "react-native";
// import { connect } from "react-redux";
// import { NavigationActions } from "react-navigation";

// // import { App } from "../index";

// class ReduxNavigation extends React.Component {
//   componentDidMount() {
//     BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
//   }

//   componentWillUnmount() {
//     BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
//   }

//   onBackPress = () => {
//     const { nav, dispatch } = this.props;
//     if (nav.index === 0) {
//       return false;
//     }
//     dispatch(NavigationActions.back());
//     return true;
//   };

//   render() {
//     const { nav, dispatch } = this.props;

//     return <App state={nav} dispatch={dispatch} />;
//   }
// }

// const mapStateToProps = ({ nav }) => ({
//   nav
// });

// export default connect(mapStateToProps)(ReduxNavigation)