import styled from "styled-components";
import { View, Text, Image, TextInput, TouchableOpacity, Modal, SafeAreaView } from "react-native";
import  Constants  from "expo-constants";


const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: '#F5F5F5',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#23467A',
    blue: '#36a7e3',
    green: '#10B981',
    red: '#EF4444',
    gray: '#5C5C5C',
    white: '#FFFFFF',
    black: '#000000',
    border: '#ced4da',
    facebook: '#4267b2',
}

const {
    primary, secondary, tertiary, darkLight,
    brand, blue, green, red, gray, white, black, 
    border, facebook
} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px;
    background-color: ${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
    margin-top: 25px;
    padding-horizontal: 25px;
    justify-content: center;
    align-items: center;
    width: 100%;    
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 90px;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 30px;    
`;

export const WelcomeImage = styled.Image`
    height: 40%;
    min-width: 80%;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px;  
    
    ${(props) => props.welcome && `
        font-size: 35px;
    `}
`;

export const PageTitle = styled.Text`
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;

    ${(props) => props.welcome && `
        margin-top: 30px;
    `}
`;

export const Subtitle = styled.Text`
    font-size: 24px;
    margin-vertical: 35px;
    font-weight: bold;
    color: ${brand};
    align-self: flex-start;
    margin-left: 5px;

    ${(props) => props.login && `
        margin-left: 10px;
    `}

    ${(props) => props.welcome && `
        font-weight: normal,
        letter-spacing: 0;
        color: ${black};
        margin-top: 10px;
        margin-bottom: 0;
        text-align: center;
        justify-content: center;
    `}
`;

export const LabelText = styled.Text`
    font-size: 16px;
    align-self: flex-start;
    margin-left: 5%;
    margin-bottom: 10px;
`;

export const StyledFormArea = styled.View`
    flex: 1;
`;

export const StyledTextInput1 = styled.TextInput`
    
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${white};
    margin-left: 5px;
    font-size: 15px;
    margin-top: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    margin-vertical: 5px;
    font-size: 16px;
    text-align: left;
    color: ${black};
`;

export const RightIcon = styled.TouchableOpacity`
    padding-horizontal: 15px;
    padding-vertical: 13px;
    right: 5px;
    position: absolute;
    z-index: 1;
`;

export const StyledSelectInput = styled.View`
    background-color: ${white};
    border-radius: 5px;
    width: 100%;
    margin-vertical: 5px;
`;

export const SelectInputText = styled.Text`
    color: ${black};
    margin-left: 10px;
`;

export const SelectRightIcon = styled.TouchableOpacity`
    padding-horizontal: 15px;
    padding-vertical: 3px;
    right: 5px;
    top: 10px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    background-color: ${blue};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 15px;
    height: 55px;

    ${(props) => props.google == true && `
        background-color: ${white};
        border: 0.5px;
        border-color: ${tertiary};
        flex-direction: row;
        justify-content: center; 
    `}

    ${(props) => props.facebook == true && `
        background-color: ${facebook};
        border: 0.5px;
        border-color: ${facebook};
        flex-direction: row;
        margin-top: 15px;
    `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 18px;

    ${(props) => props.google == true && `
        color: ${gray};
        font-size: 16px;
    `}

    ${(props) => props.facebook == true && `
        font-size: 16px;
    `}
`;

export const MessageBox = styled.Text`
    text-align: left;
    font-size: 14px;
    margin-bottom: 3px;
    color: ${(props) => (props.type == 'SUCCESS' ? blue : red)};
`;

export const Line = styled.View`
    background-color: ${darkLight};
    height: 1px;
    margin-vertical: 20px;
`;

export const GoogleLogo = styled.Image`
    width: 25px;
    height: 25px;
    left: -25px;
`;

export const FacebookLogo = styled.Image`
    left: -10px;
    margin-right: 10px;
    width: 30px;
    height: 30px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 15px;    
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px; 

    ${(props) => props.belowRegister == true && `
        padding-top: 5px;
    `}
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding-left: 7px;
`;

export const TextLinkContent = styled.Text`
    color: ${blue};
    font-size: 16px; 
    
    ${(props) => props.belowRegister == true && `
        font-size: 15px;
    `}
`;


// For screens styling
export const Wrapper = styled.View`
    padding: 20px;
`;
