import React from 'react';
import {View, Text} from 'react-native';

const Header = (props) =>{
    const { textContainer , viewContainer } = styles;
    return(
        <View style={viewContainer}>
            <Text style={textContainer}>
                {props.headerText}
            </Text>
        </View>
    )
}
const styles = {
    viewContainer:{
        padding: 30,
        marginTop:0,
        height : 80,
        backgroundColor: '#F49F1C',
        alignItems: 'center',
        shadowColor: '#1D2951',
        shadowOffset: {width:0, height: 2},
        shadowOpacity: 1.2,
    },
    textContainer:{
        fontSize: 20
    }
}
export default Header;