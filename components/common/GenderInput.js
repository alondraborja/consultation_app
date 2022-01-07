import React, { useState } from "react";

import {StyleSheet, View, Text} from 'react-native';

import {StyledInputLabel, Colors} from '../styles';

import { Picker } from "@react-native-picker/picker"; 

const { brand, darkLight, primary, blue, border, white, tertiary, red, black } = Colors;

const GenderInput = ({
    error, label, genderType, setGenderType, errors, touched, isValid, ...props 
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
                <Picker
                    style={{borderColor:getBorderColor()}}
                    mode="dropdown"
                    {...props}
                >
                    <Picker.Item label="Select gender" value="" color={darkLight} />
                    <Picker.Item label="Male" value="Male" style={styles.pickerItem} />
                    <Picker.Item label="Female" value="Female"  style={styles.pickerItem}/>
                </Picker>
            </View>
            {error ? ( <Text style={styles.error}>{error}</Text> ) : null }            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,        
    },
    pickerItem : {
        fontSize: 15,
        color: black,
    },
    wrapper:{
        justifyContent: "center",
        height: 50,
        backgroundColor: white,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    error: {
        color: red,
        paddingLeft: 5,
        fontSize: 12,
    },
})

export default GenderInput;