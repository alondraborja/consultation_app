import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";
import DrawerNavigator from './DrawerNavigator';

const AppNavContainer = () => {
    // const {
    //     authState: {isLoggedIn} 
    // } = useContext(GlobalContext);
    
    // const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
    // const [authLoaded, setAuthLoaded] = useState(false);
     
    // const getUser = async () => {
    //     try {
    //         const user = await AsyncStorage.getItem('user');
    //         if (user) {
    //             setAuthLoaded(true);
    
    //             setIsAuthenticated(true);
    //         } else {
    //         setAuthLoaded(true);
    
    //         setIsAuthenticated(false);
    //         }
    //     } catch (error) {}
    //   };

    // useEffect(() => {
    //     getUser();
    // }, [isLoggedIn]);

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