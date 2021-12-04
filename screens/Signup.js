import React, { useState, useContext, Component } from "react";
import { StatusBar } from "expo-status-bar";
import { 
    View, TouchableOpacity, ActivityIndicator,
    StyleSheet, Text, Image,
    SafeAreaView,
    Button
} from "react-native";
import { render } from "react-dom";

//formik
import { Formik } from "formik";

//icons
import { Ionicons } from '@expo/vector-icons';

import * as Google from 'expo-google-app-auth';

import * as Facebook from 'expo-facebook';

//keyboard avoiding view
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper"

//date picker
import DateTimePicker from '@react-native-community/datetimepicker';

// Normal picker
import { Picker } from "@react-native-picker/picker";

// axios API client
import axios from "axios";

//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";

import {
    StyledContainer, InnerContainer, PageLogo,
    PageTitle, Subtitle, StyledFormArea,
    PatientForm, StyledTextInput, StyledInputLabel, LeftIcon,
    RightIcon, StyledButton, ButtonText,
    Colors, MessageBox, Line,
    GoogleLogo, ExtraView, ExtraText,
    TextLink, TextLinkContent, 
    SelectInputText, SelectRightIcon, FacebookLogo,
    StyledSelectInput
} from '../components/styles';

//colors
const { brand, darkLight, primary, blue } = Colors;

const Signup = ({navigation}) => {

    const [selectedValue, setSelectedValue] = useState("Male");
    const [genderType, setGenderType] = useState('Male');

    const [hidePassword, setHidePassword ] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    //Actual date of birth to be sent
    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    const showDatePicker = () => {
        setShow(true);
    }
  
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
            <SafeAreaView style={{flex: 1}}>
      {/* <View style={styles.container}>
        <Picker
          selectedValue={genderType}
          onValueChange={(itemValue) => {
            setGenderType(itemValue);
          }}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
        {/*Text to show selected picker value*/}
        {/* <Text style={styles.text}>
          Selected Value: {genderType}
        </Text>
      </View> */}   
    </SafeAreaView>            
            <InnerContainer>
                <Subtitle register={true}>Register</Subtitle>

                {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}

                <Formik
                    initialValues={{
                        fullName: '', dateOfBirth: '', gender: '',
                        address: '', contactNumber: '', 
                        email: '', password: '', confirmPassword: '' 
                    }}
                    onSubmit={ (values, {setSubmitting}) => {
                        values = {...values, dateOfBirth: dob, gender: genderType};
                        if (
                            values.fullName == '' ||
                            values.dateOfBirth == '' ||
                            values.gender == '' ||
                            values.address == '' ||
                            values.contactNumber == '' ||
                            values.email == '' ||
                            values.confirmPassword == ''
                        ) {
                            handleMessage('Please fill all the fields');
                            setSubmitting(false);
                        } else if (values.password !== values.confirmPassword ){
                            handleMessage('Passwords do not match');
                            setSubmitting(false);
                        } else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                        <StyledFormArea>                           
                            <MyTextInput 
                                label="Full Name"
                                placeholder="ex. Juan Dela Cruz"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                            />
                            <MyTextInput 
                                label="Date of Birth"
                                icon="calendar"
                                placeholder="DD/MM/YY"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={dob ? dob.toDateString() : ''}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDatePicker}
                            />                            
                            {/* <MyTextInput 
                                label="Gender"
                                placeholderTextColor={darkLight}
                                placeholder="Please enter your gender"
                                onChangeText={handleChange('gender')}
                                onBlur={handleBlur('gender')}
                                value={values.gender}
                            /> */}
                            <GenderPicker 
                                selectedValue={selectedValue}
                                setSelectedValue={setSelectedValue}
                                genderType={genderType}
                                setGenderType={setGenderType}
                                value={genderType}                             
                            />
                            <MyTextInput 
                                label="Address"
                                placeholder="Please enter your full address"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                            />
                            <MyTextInput 
                                label="Contact Number"
                                placeholder="09XX XXX XXXX"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('contactNumber')}
                                onBlur={handleBlur('contactNumber')}
                                value={values.contactNumber}
                                keyboardType="numeric"
                            />
                            <MyTextInput 
                                label="Email Address"
                                icon="md-mail-outline"
                                placeholder="ex. juandelacruz@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                                autoCapitalize="none" 
                            />
                            {/* <SpecializationPicker /> */}
                            <MyTextInput 
                                label="Password"
                                icon="lock-closed-outline"
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
                            <MyTextInput 
                                label="Confirm Password"
                                icon="lock-closed-outline"
                                placeholder="Please enter again your password"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={hideConfirmPassword}
                                isConfirmPassword={true}
                                hideConfirmPassword={hideConfirmPassword}
                                setHideConfirmPassword={setHideConfirmPassword}
                            /> 
                            <MessageBox type={messageType}>{message}</MessageBox>
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
                                    <ButtonText google={true}>Login with Google</ButtonText>
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

const MyTextInput = ({
    label, icon, isPassword, 
    hidePassword, setHidePassword,
    isConfirmPassword, hideConfirmPassword, setHideConfirmPassword,
    isDate, showDatePicker, isGender, 
    selectedValue, setSelectedValue, genderType, setGenderType,
    ...props
}) => {
    return (
    <View>
        <StyledInputLabel>{label}</StyledInputLabel>
        {!isDate && <StyledTextInput {...props} />}
        {isDate && (
            <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput {...props} />
            </TouchableOpacity>
        )}
        {isPassword && (
            <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye' } size={18} color={darkLight} />
            </RightIcon>
        )}
        {isConfirmPassword && (
            <RightIcon onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                <Ionicons name={hideConfirmPassword ? 'md-eye-off' : 'md-eye' } size={18} color={darkLight} />
            </RightIcon>
        )}
    </View>);
}

const GenderPicker = ({
    selectedValue, setSelectedValue, genderType, setGenderType,
    ...props
}) => {   

    return (
        <View>
            <Text style={{fontSize: 16}}>
                Gender
            </Text>
            <StyledSelectInput>
                <Picker
                    selectedValue={genderType}
                    onValueChange={(itemValue) => {
                        setGenderType(itemValue);
                    }}
                >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
            </StyledSelectInput>
        </View>
    )
}

export default Signup;