import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Colors } from '../components/styles';

import HomeNavigator from './HomeNavigator';
import { HOME_NAVIGATOR } from '../constants/routeNames';

import SideNavigation from './SideNavigation';
    
const getDrawerContent = (navigation) => {
    return <SideNavigation navigation = {navigation}/>
}

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            screenOptions={{ drawerType: "slide" }} 
            drawerContent={({navigation}) => getDrawerContent(navigation)}
        >
            <Drawer.Screen 
                name={HOME_NAVIGATOR} 
                component={HomeNavigator}
                options={{headerShown: false}}             
            />
            
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;