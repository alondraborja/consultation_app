import React, { useState, useContext, Component } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as yup from 'yup';
import Moment from 'moment';
import * as Google from 'expo-google-app-auth';
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper"
import { CredentialsContext } from "../components/CredentialsContext";

import {
    StyledContainer, InnerContainer, 
    Subtitle, StyledFormArea,
    StyledButton, ButtonText,
    Colors, MessageBox, Line,
    GoogleLogo, ExtraView, ExtraText,
    TextLink, TextLinkContent, 
    FacebookLogo
} from '../components/styles';

import CustomInput from "../components/common/CustomInput";
import DateInput from "../components/common/DateInput";
import GenderInput from "../components/common/GenderInput";

const { brand, darkLight, primary, blue } = Colors;

const Signup = ({navigation}) => {

    const [hidePassword, setHidePassword ] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date('01 January 2000 08:00 UTC'));

    const signupValidationSchema = yup.object({
        fullName: yup
            .string()
            .min(3, 'Invalid full name')
            .matches(/(\w.+\s).+/, 'Enter your full name')
            .required('This field is required'),
        dateOfBirth: yup
            .string()
            .required('This field is required'),
        gender: yup
            .string()
            .required('This field is required'),
        address: yup
            .string()
            .matches(/^[a-zA-Z0-9\s,.'-]/, 'Enter your address')
            .required('This field is required'),              
        contactNumber: yup
            .string()
            .matches(/^(09|\+639|639)\d{9}$/, 'Enter a valid phone number')
            .required('This field is required'),
        email: yup
            .string()
            .email('Invalid email')
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Enter a valid email')
            .required('This field is required'),
        password: yup
            .string()
            // .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
            // .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
            // .matches(/\d/, "Password must have a number")
            // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('This field is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords do not match')
            .required('This field is required'),
    })

    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);    
        const url = 'https://calm-depths-11821.herokuapp.com/user/signup';

        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS'){
                    handleMessage(message, status);
                } else {
                    persistLogin({ ...data }, message, status);
                }
                 setSubmitting(false);
            })
            .catch(error => {
                console.log(error.JSON());
                setSubmitting(false);         
                handleMessage("An error occured. Check you network and try again.");
            });
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
                <Subtitle register={true}>Register</Subtitle>
                
                <Formik
                    initialValues={{
                        fullName: '', dateOfBirth: '', 
                        gender: '', address: '', contactNumber: '', 
                        email: '', password: '', confirmPassword: '' 
                    }}
                    validationSchema={signupValidationSchema}
                    onSubmit={ (values, {setSubmitting}) => {
                        values = {...values};
                        if (
                            values.fullName == '' |
                            values.dateOfBirth == '' |
                            values.gender == '' |
                            values.address == '' |
                            values.contactNumber == '' |
                            values.email == '' |
                            values.confirmPassword == ''
                        ) {
                            handleMessage('This field is required');
                            setSubmitting(false);
                        } else if (values.password !== values.confirmPassword ){
                            handleMessage('Passwords do not match');
                            setSubmitting(false);
                        } else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                >
                    {({handleChange, handleSubmit, handleBlur, setFieldValue, values, isSubmitting, errors, touched}) => (
                        <StyledFormArea>
                            {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                mode='date'
                                value={date}
                                is24Hour={true}
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShow(false);
                                    setFieldValue("dateOfBirth",Moment(selectedDate).format("YYYY-MM-DD"));
                                }}
                                />
                            )}

                            <CustomInput 
                                label="Full Name"
                                placeholder="ex. Juan Dela Cruz"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('fullName')}
                                handleBlur={handleBlur}
                                // onBlur={handleBlur('fullname')}
                                error={touched.fullName && errors.fullName}
                                value={values.fullName}
                            />
                            {/* <MessageBox type={messageType}>{message}</MessageBox> */}
                            <DateInput 
                                label="Date of Birth"
                                icon="calendar"
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('dateOfBirth')}
                                handleBlur={handleBlur}
                                //onBlur={handleBlur('dateOfBirth')}
                                error={touched.dateOfBirth && errors.dateOfBirth}
                                value={values.dateOfBirth}
                                editable={true}
                                setShow={setShow}
                            />
                            <GenderInput
                                label="Gender" 
                                selectedValue={values.gender}
                                onValueChange={handleChange("gender")}
                                handleBlur={handleBlur}
                                //onBlur={handleBlur('gender')}
                                error={touched.gender && errors.gender}              
                            />
                            <CustomInput 
                                label="Address"
                                placeholder="Please enter your full address"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('address')}
                                handleBlur={handleBlur}
                                //onBlur={handleBlur('address')}
                                error={touched.address && errors.address}
                                value={values.address}
                            />
                            <CustomInput 
                                label="Contact Number"
                                placeholder="09XXXXXXXXX"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('contactNumber')}
                                handleBlur={handleBlur}
                                //onBlur={handleBlur('contactNumber')}
                                error={touched.contactNumber && errors.contactNumber}
                                value={values.contactNumber}
                                keyboardType="numeric"
                            />
                            <CustomInput 
                                label="Email Address"
                                icon="md-mail-outline"
                                placeholder="ex. juandelacruz@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                handleBlur={handleBlur}
                                //onBlur={handleBlur('email')}
                                error={touched.email && errors.email}
                                value={values.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <CustomInput 
                                label="Password"
                                icon="lock-closed-outline"
                                placeholder="Please enter your password"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                handleBlur={handleBlur}
                                //onBlur={handleBlur('password')}
                                error={touched.password && errors.password}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <CustomInput 
                                label="Confirm Password"
                                icon="lock-closed-outline"
                                placeholder="Please enter again your password"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('confirmPassword')}
                                handleBlur={handleBlur}
                                //onBlur={handleBlur('confirmPassword')}
                                error={touched.confirmPassword && errors.confirmPassword}
                                value={values.confirmPassword}
                                secureTextEntry={hideConfirmPassword}
                                isConfirmPassword={true}
                                hideConfirmPassword={hideConfirmPassword}
                                setHideConfirmPassword={setHideConfirmPassword}
                            />
                            <MessageBox type={messageType} style={{marginBottom: 15}}>{message}</MessageBox>
                            {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Register</ButtonText>
                                    </StyledButton>
                            )}
                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>
                            )}
                            <ExtraText belowRegister={true}>
                                {' '}By registering, you confirm that you accept {"\n"}
                                {' '}to our {' '}
                                <TextLinkContent belowRegister={true}>
                                    Terms of Use
                                </TextLinkContent>
                                {' '} and {' '}
                                <TextLinkContent belowRegister={true}>
                                    Privacy Policy
                                </TextLinkContent>
                            </ExtraText>
                            <Line />
                            <StyledButton facebook={true} onPress={handleSubmit}>
                                <FacebookLogo
                                    resizeMode="cover" 
                                    source={require('./../assets/img/facebook-logo.png')}     
                                />
                                <ButtonText facebook={true}>Register with Facebook</ButtonText>
                            </StyledButton>
                            {!googleSubmitting && (
                                <StyledButton google={true} onPress={handleGoogleSignIn}>
                                    <GoogleLogo 
                                        resizeMode="cover" 
                                        source={require('./../assets/img/google-logo.png')}     
                                    />
                                    <ButtonText google={true}>Register with Google</ButtonText>
                                </StyledButton>
                            )}                            
                            {googleSubmitting && (
                                <StyledButton google={true} disabled={true}>
                                    <ActivityIndicator size="large" color={blue} />
                                </StyledButton>
                            )}
                            <ExtraView>
                                <ExtraText>Already have an account?</ExtraText>
                                <TextLink onPress={() => {
                                    navigation.navigate("Login")
                                }}>
                                    <TextLinkContent>Login here</TextLinkContent>
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

export default Signup;