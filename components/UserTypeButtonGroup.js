import React, { useState } from "react";
import { 
    StyleSheet, View, TouchableOpacity, Text
} from "react-native";

import { Colors } from "./styles";

const { white, darkLight, brand } = Colors;

const UserTypeButtonGroup = ({ userTypeButtons, doSomethingAfterClick}) => {
    const [clickedId, setClickedId] = useState();
    const handleClick = (item, id) => {
        setClickedId(id)
        doSomethingAfterClick(item)        
    }

    return (
        <View style={{flex:1,flexDirection:"row", alignContent: "center"}}>
            {
                userTypeButtons.map((buttonLabel, index) => {
                    return (
                        <TouchableOpacity 
                            onPress = {(item) => handleClick(item, index)}
                            style={[
                                index === clickedId ? styles.buttonActive : styles.button,
                                index === 0 ? {borderTopLeftRadius: 10, borderBottomLeftRadius: 10} : "",
                                index === 1 ? {borderTopRightRadius: 10, borderBottomRightRadius: 10} : "",
                            ]}
                            key={index}
                        >
                            <Text
                                style={index === clickedId ? styles.textActive : styles.text}
                            >
                                {buttonLabel}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: white,
        borderWidth: 0.5,
        borderColor: darkLight,
    },
    buttonActive: {
        flex: 1,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: brand,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    text: {
        color: 'black',
    },
    textActive : {
        color: 'white'
    }
})

export default UserTypeButtonGroup;