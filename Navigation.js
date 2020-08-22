import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import Splash from './pages/Splash';
import Chat from './pages/Chat';

const AuthStackNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
    },
    Login: {
        screen: Login,
    },
    RegisterPage: {
        screen: RegisterPage,
    }
 }, { headerMode: 'none'});

 const AppStackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: true,
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: '#FD6A02'
            }
        },
    },
    Chat: {
        screen: Chat,
        navigationOptions: {
            title: 'Chat Room',
            headerShown: true,
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: '#FD6A02'
            }
        },
    },
 });

    const SwitchNavigator = createSwitchNavigator({
        AuthLoading: AuthStackNavigator,
        App: AppStackNavigator
    },
    {
        initialRouteName: 'AuthLoading',
    });

const Navigation = createAppContainer(SwitchNavigator);
export default Navigation;
