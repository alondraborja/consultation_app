import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { render } from "react-dom";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "./styles";

import { StyledSelectInput } from "./styles";

const { tertiary } = Colors;

class PickerComponent extends Component {

    state = {
        userType: 'patient'
    }
    
    render(){
        return (
            <StyledSelectInput>
                <Picker
                    dropdownIconColor={'#9CA3AF'}
                    selectedValue={this.state.userType}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({userType:itemValue})
                    }}
                >
                    <Picker.Item style={styles.pickerItem} label="Patient" value="patient" />
                    <Picker.Item style={styles.pickerItem} label="Doctor" value="doctor" />
                </Picker>
            </StyledSelectInput>
        )
    } 
}

const styles = StyleSheet.create({
    pickerItem: {
        fontSize: 14,
    }
})

export default PickerComponent;
