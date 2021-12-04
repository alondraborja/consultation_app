import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Colors } from "../components/styles";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Welcome from "../screens/Welcome";
import Home from "../screens/Navigations/Home";

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";

// route name
import { LOGIN, SIGNUP } from '../constants/routeNames';

const { primary, tertiary } = Colors;

const AuthNavigator = () => {   
    const AuthStack = createStackNavigator();

    return (
            <AuthStack.Navigator
                screenOptions={{
                    headerStyled: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    } 
                }}
                initialRouteName="Login"  
            >
                    <AuthStack.Screen name={LOGIN} component={Login} />
                    <AuthStack.Screen name={SIGNUP} component={Signup} />
            </AuthStack.Navigator>
    )
}

export default AuthNavigator;