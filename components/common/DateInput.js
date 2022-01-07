import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyledTextInput, StyledInputLabel, RightIcon, Colors } from '../styles';

const { brand, darkLight, primary, blue, border, white, tertiary, red, black } = Colors;

const DateInput = ({
    icon, label, error,
    isDate, showDatePicker, 
    errors, touched, isValid, setShow,
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
        <View style={styles.container} >
            <StyledInputLabel>{label}</StyledInputLabel>
            <View style={[styles.wrapper,{borderColor: getBorderColor()}]}>
                   
                <TouchableOpacity 
                        onPress={()=>setShow(true)}
                    >
                        <StyledTextInput {...props} />
                        <RightIcon 
                            style={styles.icon} 
                            onPress={()=>setShow(true)}
                        >
                            <Ionicons name={icon} size={20} color={darkLight}/>
                        </RightIcon>
                    </TouchableOpacity>
            </View>
            {error ? ( <Text style={styles.error}>{error}</Text> ) : null }
        </View>
    );
};

const styles = StyleSheet.create({
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
    icon: {
        right: -10,
        paddingHorizontal: 25,
    },
    error: {
        color: red,
        paddingLeft: 5,
        fontSize: 12,
    },
})

export default DateInput;