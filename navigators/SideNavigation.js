import React from "react";
import { useNavigation } from "@react-navigation/core";
import { 
    Text, Alert,
    TouchableOpacity, View, StyleSheet 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { APPOINTMENT, CONSULTATION, HOME, WELCOME } from "../constants/routeNames";

const SideNavigation = ({navigation}) => {
    const { navigate } = useNavigation();
    
    const clearLogin = () => {
        AsyncStorage.removeItem('brgyHealthCenterAppCredentials')
        .then(() => {
            setStoredCredentials("");
        })
        .catch(error => console.log(error));
    }    
    
    const handleLogout = () => {
        navigation.toggleDrawer();
        Alert.alert('Logout!', 'Are you sure you want to logout?', [
            {
              text: 'Cancel',
              onPress: () => {},
            },
            {
              text: 'OK',
              onPress: () => {
                AsyncStorage.removeItem('brgyHealthCenterAppCredentials')
                .then(() => {
                    setStoredCredentials("");
                })
                .catch(error => console.log(error));
              }
            
            },
        ]);
    }        

    const menuItems = [
        {
            icon: <MaterialIcon name="home" size={23}></MaterialIcon>, 
            name:'Welcome',
            onPress: () => {
                navigate(WELCOME);
            },  
        },
        // {
        //     icon: <MaterialIcon name="home" size={23}></MaterialIcon>, 
        //     name:'Home',
        //     onPress: () => {
        //         navigate(HOME);
        //     },  
        // },
        {
            icon: <MaterialCommunityIcons name="calendar-text" size={23}></MaterialCommunityIcons>, 
            name:'Appointment',
            onPress: () => {
                navigate(APPOINTMENT);
            },  
        },
        // {
        //     icon: <MaterialIcon name="logout" size={23}></MaterialIcon>, 
        //     name:'Logout',
        //     onPress: handleLogout
        // },
    ]    


    return (
        <SafeAreaView>
                <View style={{paddingHorizontal: 10}}>
                    <View>
                        {menuItems.map(({name, icon, onPress}) => (
                            <TouchableOpacity onPress={onPress} key={name} style={styles.navItems}>
                                {icon}

                                <Text style={styles.itemText}>{name}</Text>
                            </TouchableOpacity>    
                        ))}
                    </View>
                </View>
        </SafeAreaView>
    )      
  
    
};

const styles = StyleSheet.create({
    navItems: {
        flexDirection: "row",
        alignItems: "center",

    },
    itemText: {
        fontSize: 17,
        paddingVertical: 20,
        paddingLeft: 30,
    }
})

export default SideNavigation;