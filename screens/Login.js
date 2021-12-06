import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";

//formik
import { Formik } from "formik";

//icons
import { Ionicons } from '@expo/vector-icons';

//keyboard avoiding view
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper"

// axios API client
import axios from "axios";

import {
    StyledContainer, InnerContainer, PageLogo,
    Subtitle, StyledFormArea,
    StyledTextInput, StyledInputLabel, 
    RightIcon, StyledButton, ButtonText,
    Colors, MessageBox, Line,
    GoogleLogo, ExtraView, ExtraText,
    TextLink, TextLinkContent, FacebookLogo
} from '../components/styles';

import * as Google from 'expo-google-app-auth';

import * as Facebook from 'expo-facebook';

//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";

//colors
const { primary, brand, darkLight, blue } = Colors;

const Login = ({navigation}) => {

    const [hidePassword, setHidePassword ] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'https://calm-depths-11821.herokuapp.com/user/signin';
        
        axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS'){
                handleMessage(message, status);
            } else {
                persistLogin({ ...data[0] }, message, status);
            }
            setSubmitting(false);
        })
        .catch(error => {
            console.log(error.JSON());
            setSubmitting(false);
            handleMessage("An error occured. Check you network and try again.");
        }) 

    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    const handleGoogleSignIn = () => {
        setGoogleSubmitting(true);
        const config = {
            androidClientId: `752674595355-7fijh1h1jckvdkenev8gj7ut93kf0bfr.apps.googleusercontent.com`,
            iosClientId: `752674595355-58ih3ti1nq9hoi93kgkti6d91fkr12dr.apps.googleusercontent.com`,            
            scopes: ['profile', 'email']
        }

        Google
            .logInAsync(config)
            .then((result) => {
                const {type, user} = result;

                if (type == 'success'){
                    const {email, name, photoUrl} = user;
                    persistLogin({email, name, photoUrl}, message, "SUCCESS");
                } else {
                    handleMessage('Google signin was cancelled');
                }
                setGoogleSubmitting(false);
            })
            .catch(error => {
                console.log(error);
                handleMessage('An error occured. Check your network and try again.');
                setGoogleSubmitting(false);
            });
    }

    async function handleFacebookLogin() {
        try {
          await Facebook.initializeAsync({
            appId: '330259771802666',
          });
          const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?fields=email,id,picture.type(large)&access_token=${token}`);
            Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }
    

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('brgyHealthCenterAppCredentials', JSON.stringify(credentials))
            .then(() => {
                handleMessage(message, status);
                setStoredCredentials(credentials);
            })
            .catch((error) => {
                console.log(error);
                handleMessage('Persisting login failed');
            })
    }
  

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer backgroundColor={brand}>
                <StatusBar style="light" backgroundColor={brand} />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')} />
                    {/* <PageTitle>Brgy. Health Center App</PageTitle> */}
                    <Subtitle login={true}>Login</Subtitle>

                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            if (values.email == '' || values.password == ''){
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                            } else {
                                handleLogin(values, setSubmitting);
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea>
                                <MyTextInput 
                                    label="Email"
                                    placeholder="someone@email.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none" 
                                />
                                <MyTextInput 
                                    label="Password"
                                    placeholder="Please enter your password"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MessageBox type={messageType}>{message}</MessageBox>
                                {/* <MessageBox type={messageType}>{message}</MessageBox> */}
                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Login</ButtonText>
                                    </StyledButton>
                                )}
                                {isSubmitting && (
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>
                                )}
                                <Line />
                                <StyledButton facebook={true} onPress={handleFacebookLogin}>
                                        <FacebookLogo
                                            resizeMode="cover" 
                                            source={require('./../assets/img/facebook-logo.png')}     
                                        />
                                    <ButtonText facebook={true}>Login with Facebook</ButtonText>
                                </StyledButton>                                
                                {!googleSubmitting && (
                                    <StyledButton google={true} onPress={handleGoogleSignIn}>
                                        <GoogleLogo 
                                            resizeMode="cover" 
                                            source={require('./../assets/img/google-logo.png')}     
                                        />
                                        <ButtonText google={true}>Login with Google</ButtonText>
                                    </StyledButton>
                                )}                            
                                {googleSubmitting && (
                                    <StyledButton google={true} disabled={true}>
                                        <ActivityIndicator size="large" color={blue} />
                                    </StyledButton>
                                )}                                  
                                <ExtraView>
                                    <ExtraText>Don't have an account?</ExtraText>
                                    <TextLink>
                                        <TextLinkContent
                                            onPress={() => {
                                                navigation.navigate("Signup")
                                            }}
                                        >
                                            Register here
                                        </TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({
    icon, label, isPassword, 
    hidePassword, setHidePassword,

    ...props
}) => {
    return (<View>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
        {isPassword && (
            <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye' } size={20} color={darkLight} />
            </RightIcon>
        )}
    </View>);
}

export default Login;