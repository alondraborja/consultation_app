import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors, RightIcon, StyledInputLabel, StyledTextInput, TouchableOpacity } from "../styles";

//icons
import { Ionicons } from '@expo/vector-icons';

const { blue, red, border, darkLight, white, tertiary } = Colors;

const CustomInput = ({
    icon, label, isPassword, 
    hidePassword, setHidePassword,
    error, isDate, isConfirmPassword, 
    showDatePicker, hideConfirmPassword, setHideConfirmPassword, handleBlur,
    ...props
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
                    onBlur={() => {setFocused(false) && handleBlur('fullname')}}
                    {...props}                 
                />
                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye' } size={20} color={darkLight} />
                    </RightIcon>
                )}
                {isConfirmPassword && (
                    <RightIcon onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                        <Ionicons name={hideConfirmPassword ? 'md-eye-off' : 'md-eye' } size={20} color={darkLight} />
                    </RightIcon>
                )}
            </View>
            {error ? ( <Text style={styles.error}>{error}</Text> ) : null }
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
    // genderPickerContainer: {
    //     marginTop: 5,
    //     marginBottom: 15,
    // },
    // label: {
    //     fontSize: 16,        
    // },
    // picker: {
    //     marginLeft: 5,
    // },
    // pickerItem : {
    //     fontSize: 15,
    // }
})

export default CustomInput;