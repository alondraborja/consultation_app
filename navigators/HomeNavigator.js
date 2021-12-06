import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from '../components/styles';

// route name
import { APPOINTMENT, HOME, SETTINGS, WELCOME } from '../constants/routeNames';

import Welcome from '../screens/Welcome';
import Settings from '../screens/navigations/Settings';
import Home from '../screens/navigations/Home';
import Appointment from '../screens/navigations/Appointment';

const {  brand } = Colors;

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