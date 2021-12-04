import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { render } from "react-dom";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "./styles";

import { StyledSelectInput } from "./styles";

const { tertiary } = Colors;

class SpecializationPicker extends Component {

    state = {
        specialization: 'pediatrician'
    }
    
    render(){
        return (
            <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 16}}>
                    Specialization
                </Text>
                <StyledSelectInput>                
                    <Picker
                        dropdownIconColor={'#9CA3AF'}
                        selectedValue={this.state.specialization}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({userType:itemValue})
                        }}
                    >
                        <Picker.Item style={styles.pickerItem} label="Pediatrician" value="pediatrician" />
                        <Picker.Item style={styles.pickerItem} label="Obstetrician" value="obstetrician" />
                        <Picker.Item style={styles.pickerItem} label="Cardiologist" value="cardiologist" />
                        <Picker.Item style={styles.pickerItem} label="Dentist" value="dentist" />
                        <Picker.Item style={styles.pickerItem} label="Opthalmologist" value="opthalmologist" />
                    </Picker>
                </StyledSelectInput>
            </View>
        )
    } 
}

const styles = StyleSheet.create({
    pickerItem: {
        fontSize: 14,
    }
})

export default SpecializationPicker;
