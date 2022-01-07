import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

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

//yup
import * as yup from 'yup';

//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";

import CustomInput from "../components/common/CustomInput";

//colors
const { primary, brand, darkLight, blue, border, white, tertiary, red } = Colors;

const Login = ({navigation}) => {

    const [hidePassword, setHidePassword ] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter a valid email")
            .required('This field is required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters` )
            .required('This field is required'),
    })

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
            <StyledContainer>
                <StatusBar style="light" backgroundColor={brand} />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')} />
                    <Subtitle login={true}>Login</Subtitle>
                    <Formik
                        validationSchema={loginValidationSchema}
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
                        {({handleChange, handleSubmit, values, isSubmitting, errors, touched, isValid}) => (
                            <StyledFormArea>
                                <CustomInput 
                                    label="Email"
                                    placeholder="someone@email.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none" 
                                />
                                {(errors.email && touched.email) &&
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                }
                                <CustomInput 
                                    label="Password"
                                    placeholder="Please enter your password"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                {(errors.password && touched.password) &&
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                }
                                <MessageBox type={messageType}>{message}</MessageBox>
                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit} disabled={!isValid}>
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
    error, ...props
}) => {
    const [focused, setFocused] = useState(false);
    const getBorderColor = () => {
        if (focused){
            return blue;
        }
        if (error){
            return red;
        }
        else {
            return border;
        }
    }

    return (
        <View style={styles.container}>
            <StyledInputLabel>{label}</StyledInputLabel>
            <View style={[styles.wrapper,{borderColor: getBorderColor()}]}>
                <StyledTextInput 
                    onFocus={() => {setFocused(true)}}
                    onBlur={() => {setFocused(false)}}
                    {...props}
                />
                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye' } size={20} color={darkLight} />
                    </RightIcon>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        marginBottom: 15,
    },
    wrapper:{
        height: 50,
        borderColor: border,
        backgroundColor: white,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,          
    },
    textInput: {
        backgroundColor: white,
        marginLeft: 5,
        fontSize: 15,
        marginTop: 10,
        color: tertiary,
    },
    error: {
        color: red,
        paddingLeft: 5,
        fontSize: 12,
    },
    errorText: {
        fontSize: 12,
        paddingLeft: 5,
        marginTop: -15,
        color: red,
    }
})

export default Login;