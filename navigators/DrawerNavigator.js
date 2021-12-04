import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';

import { Colors } from '../components/styles';

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';

import Welcome from '../screens/Welcome';

import Home from '../screens/Navigations/Home';
import HomeNavigator from './HomeNavigator';
import { HOME_NAVIGATOR } from '../constants/routeNames';

const { primary, brand } = Colors;
    
const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
            <Drawer.Screen name={HOME_NAVIGATOR} component={HomeNavigator}></Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;