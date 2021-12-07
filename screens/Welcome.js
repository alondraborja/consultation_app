import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";

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

//colors
const { brand } = Colors;

const Welcome = () => {

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {fullName, name, email, photoUrl}= storedCredentials;
    AvatarImg = photoUrl ? {uri: photoUrl}: require('./../assets/img/avatar.png');     
    
    const clearLogin = () => {
        AsyncStorage.removeItem('brgyHealthCenterAppCredentials')
            .then(() => {
                setStoredCredentials("");
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <ScreenContainer>
            <InnerContainer>                               
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

export default Welcome;