import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";

const AppNavContainer = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer>
                    { storedCredentials ? <DrawerNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer> 
    )    
}

export default AppNavContainer;