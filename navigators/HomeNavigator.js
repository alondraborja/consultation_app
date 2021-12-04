import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

import { Colors } from '../components/styles';

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';

// route name
import { APPOINTMENT, HOME, SETTINGS, WELCOME } from '../constants/routeNames';

import Welcome from '../screens/Welcome';
import Settings from '../screens/Navigations/Settings';
import Home from '../screens/Navigations/Home';
import Appointment from '../screens/Navigations/Appointment';

const { primary, brand } = Colors;

const HomeNavigator = () => {
    const HomeStack = createStackNavigator();

    return (
        <HomeStack.Navigator initialRouteName={WELCOME} >
            <HomeStack.Screen name={WELCOME} 
                options={{headerTintColor: brand}} component={Welcome}>
            </HomeStack.Screen>
            <HomeStack.Screen name={HOME} component={Home}>
            </HomeStack.Screen>    
            <HomeStack.Screen name={APPOINTMENT} component={Appointment}>
            </HomeStack.Screen>
            <HomeStack.Screen name={SETTINGS} component={Settings}>
            </HomeStack.Screen>    
        </HomeStack.Navigator>
    )
}

export default HomeNavigator;