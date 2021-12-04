import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { render } from "react-dom";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "./styles";

import { StyledSelectInput } from "./styles";

const { tertiary } = Colors;

class GenderPicker extends Component {

    state = {
        gender: 'male'
    }
    
    render(){
        return (
            <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 16}}>
                    Gender
                </Text>
                <StyledSelectInput>                
                    <Picker
                        dropdownIconColor={'#9CA3AF'}
                        selectedValue={this.state.gender}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({userType:itemValue})
                        }}
                    >
                        <Picker.Item style={styles.pickerItem} label="Male" value="male" />
                        <Picker.Item style={styles.pickerItem} label="Female" value="female" />
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

export default GenderPicker;
