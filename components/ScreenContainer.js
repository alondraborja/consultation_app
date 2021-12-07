import React from "react";
import { 
    ScrollView
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { Colors, StyledContainer } from "./styles";

const { brand } = Colors;

const ScreenContainer = ({children}) => {
    return (
        <ScrollView>
            <StyledContainer>
                <StatusBar style="light" backgroundColor={brand} />
                {children}
            </StyledContainer>
        </ScrollView>

    );
}

export default ScreenContainer;