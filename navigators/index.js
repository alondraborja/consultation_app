import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";

const AppNavContainer = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer>
                    { storedCredentials ? <HomeNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer> 
    )    
}

export default AppNavContainer;