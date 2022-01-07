import React, { useContext, useEffect } from "react";
import { useNavigation } from '@react-navigation/core';
import MaterialIcon from "react-native-vector-icons/MaterialIcons"; 

import { TouchableOpacity, View, Text, StyleSheet} from "react-native";

import {
    InnerContainer, PageTitle, Subtitle, 
    StyledFormArea, StyledButton, ButtonText,
    Colors, Line, WelcomeContainer,
    Avatar
} from '../components/styles';

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";

import ScreenContainer from "../components/ScreenContainer";
import { Alert } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//colors
const { brand, blue, darkLight, border } = Colors;

const Welcome = () => {

    const { setOptions, toggleDrawer } = useNavigation();

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {fullName, name, email, photoUrl}= storedCredentials;
    AvatarImg = photoUrl ? {uri: photoUrl}: require('./../assets/img/avatar.png');     
    
    React.useEffect(() => {

        setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    toggleDrawer();
                }}>
                    <MaterialIcon 
                        style={{padding: 15, paddingRight: 20, color: brand}} size={23} name="menu">                        
                    </MaterialIcon>
                </TouchableOpacity>
            ),    
        });
    }, []);

    const clearLogin = () => {
            AsyncStorage.removeItem('brgyHealthCenterAppCredentials')
            .then(() => {
                setStoredCredentials("");
            })
            .catch(error => console.log(error));

        // Alert.alert('Are you sure you want to logout?', [
        //     {
        //       text: 'Cancel',
        //       onPress: () => {},
        //     },
        //     {
        //       text: 'OK',
        //       onPress: () => {
        //         AsyncStorage.removeItem('brgyHealthCenterAppCredentials')
        //         .then(() => {
        //             setStoredCredentials("");
        //         })
        //         .catch(error => console.log(error));
        //       },              
        //     },
        // ]);
        // AsyncStorage.removeItem('brgyHealthCenterAppCredentials')
        //     .then(() => {
        //         setStoredCredentials("");
        //     })
        //     .catch(error => console.log(error));
    }

    return (
        <>
            <ScreenContainer>
            <InnerContainer>
                {/* <View>
                <Text style={styles.greetings1}>Good day, user!</Text>
                <Text style={styles.greetings2}>Start getting better today</Text>
                <Text style={styles.greetings3}>Select your preferred services </Text>
                </View>
                <View>
                <View style={styles.services}>
                    <MaterialCommunityIcons 
                        name="calendar-text" size={20}
                        style={{paddingRight: 20, color: brand}} >
                    </MaterialCommunityIcons>
                    <TouchableOpacity>
                        
                        <Text style={styles.textInside}>Schedule an appointment</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.services}>
                    <MaterialIcon name="event-available" size={20} style={{paddingRight: 20, color: brand}}></MaterialIcon>
                    <TouchableOpacity>                        
                        <Text style={styles.textInside}>Consult a doctor</Text>
                    </TouchableOpacity>
                </View>
                </View>                                */}
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome back,</PageTitle>
                    <Subtitle welcome={true}>{name || fullName || 'Juan Dela Cruz'}</Subtitle>
                    <Subtitle welcome={true}>{email || 'juandelacruz@gmail.com'}</Subtitle>
                    <StyledFormArea>
                    <Avatar resizeMode="cover" source={AvatarImg} />
                    <Line />    
                        <StyledButton 
                            onPress={clearLogin}
                        >
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
            </ScreenContainer>
        </>
    );
}

const styles = StyleSheet.create({
    greetings1: {
        fontSize: 30,
        paddingBottom: 15,
        color: brand,

    },
    greetings2: {
        fontSize: 20,
        paddingBottom: 15,
        color: brand,
    },
    greetings3: {
        fontSize: 16,
        fontWeight: '400',
        paddingBottom: 10,
    },
    services:{
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        height: 60,
        marginTop: 20,
        backgroundColor: border,
    },
    textInside: {
        fontSize: 16,
    }

 
});

export default Welcome;