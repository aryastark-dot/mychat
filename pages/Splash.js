import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Dimensions, StyleSheet, ImageBackground, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import bgImage from '../assets/screen.png'
import Logo from '../assets/frendy.png'

class Splash extends Component{
    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate('Login')
        }, 4000);
    }
    render() {
        return (
             <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                   <View style={styles.Container}>
                   <Text style={styles.logoText}>smilon</Text>
                           <Animatable.Image
                             animation="bounceIn"
                             duration={3000}
                             source={Logo}
                             style={styles.logo}
                             resizeMode={"stretch"}
                             />
                              
                   </View>  
                        {/* <Image source={Logo} style={styles.logo} /> */}
                    <View style={styles.Container}>
                         {/* <Text style={styles.logoText}>smilon</Text> */}
                         <Animatable.Text
                             animation="zoomIn"
                             duration={3000}
                             source={Logo}
                             style={styles.logoTexts}
                             resizeMode={"stretch"}
                             >We're with the Chat </Animatable.Text>
                         {/* <Text style = {styles.logoTexts}>Securely Connecting  Chat </Text>
                          <Text style = {styles.logosTexts}> Beeps</Text> */}
                           
                         
                     </View>
               </ImageBackground> 
        );
    }
}
export default Splash;
const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    backgroundContainer: {
        flex: 1,
        width: 375,
        height: 620,
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    logoText: {
        color: 'purple',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: 70,
        left: -10
    },
    logoTexts: {
        color: 'purple',
        fontSize: 16,
        fontWeight: 'bold',
        margin: 20,
        top: -100,
        left: -10
    },
    logosTexts: {
        color: 'purple',
        fontSize: 16,
        fontWeight: 'bold',
        margin: 16,
        top: -120,
        left: -5
    },
    logo: {
        justifyContent: 'center',
        width: 100,
        height: 100,
        left: -10,
        top: 70,
        alignItems: 'center',
    },
    
    submitButton: {
        margin: 50,
        height: 45,
        width: 110,
        backgroundColor: '#F49F1C',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        marginVertical: 1,
        left: 15,
        right: 40,
        top: -130,
        color: 'transparent',
    },
    submitButtonText:{
        color: '#1D2951',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});