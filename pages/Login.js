import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, TextButton, ImageBackground, Image, StyleSheet, Button, ToastAndroid } from 'react-native';
 import bgImage from '../assets/screen.png'
import Logo from '../assets/frendy.png'
import Icon from 'react-native-vector-icons/Ionicons';
import { userLogin } from '../actions/userAction';
import { userAuth } from '../actions/userAction';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
        };
         this.validateForm=this.validateForm.bind(this);
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    validateForm(){
        const { errors } = this.state;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg =/^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        if (emailaddr ===''){
            errors.email="Email address cannot be empty.";
        }else if(emailaddr.length > 0 && !reg.test(emailaddr)){
            errors.email="please provide correct email address.";
        }else {
            errors.email='';
        }
        if (pass ===''){
            errors.pass="password cannot be empty.";
        }else if(pass && pass.length < 5){
            errors.pass="Password should have more than 5 characters.";
        }else {
            errors.pass="";
        }
        this.setState({ errors })
        if(errors.email==='' && errors.pass===''){
            const userinfo={
                email:this.state.email,
                password:this.state.password
            }
            this.props.onLogin(userinfo)
        }
    }

    goToRegister = () => {
        this.props.navigation.navigate('RegisterPage');
    }

    // componentDidMount () {
    //     this.props.userAuth()
    // }
     componentDidUpdate(nextProps){
         if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userReducer.userAuth && this.props.userReducer.userAuthSuccess=== true) {
             this.props.navigation.navigate('Home');
         }
     }

    // submitForm = async () => {
    //     let that = this;
    //     axios.post('http://192.168.1.100:8082/loginuser', {
    //         email: this.state.email,
    //         password: this.state.password
    //     })
    //     .then(function (response) {
    //         if(response && response.data && response.data._id) {
    //             that.props.navigation.navigate('Home');
    //         } else if(response && response.data && response.data.message) {
    //             Toast.show(response.data.message, 500);
    //         }
    //     })
    //     .catch(function (error){
    //         console.log(error);
    //     });
    // }

    // goToRegister = () => {
    //     this.props.navigation.navigate('RegisterPage');
    // }
    render() {
        const {errors} =this.state;
        return (
                <ImageBackground source={bgImage} style={styles.backgroundContainer}>
              <View style={styles.Container}>
                     {/* <Text style={styles.logoText}>smilon</Text>    */}
                     <Animatable.Text
                             animation="zoomIn"
                             duration={3000}
                             source={Logo}
                             style={styles.logoText}
                             resizeMode={"stretch"}
                             iterationCount={"infinite"}
                             >smileon </Animatable.Text>
                     <Image source={Logo} style={styles.logo} />
                </View>
                <View style={styles.Container}>
                   <Icon name={'ios-mail-outline'} size={20} color={"black"}
                       style={styles.inputIcons} />
                       
                    <TextInput style = {styles.input}
                       underlineColorAndroid = 'rgba(0,0,0,0)'
                       placeholder = "Email"
                       placeholderTextColor = "black"
                       autoCapitalize = "none"
                       onChangeText = {this.handleEmail}/>
                      <Text style={styles.errorstyle}>{errors.email}</Text>

                   <Icon name={'ios-key-outline'} size={20} color={"black"}
                       style={styles.inputsIcons} />
                   <TextInput style = {styles.input}
                      underlineColorAndroid = 'rgba(0,0,0,0)'
                      placeholder = "Password"
                      placeholderTextColor = "black"
                      autoCapitalize = "none"
                      onChangeText = {this.handlePassword}/>
                      <Text style={styles.errorstyle}>{errors.pass}</Text>

                    <TouchableOpacity
                       style = {styles.submitButton}
                        onPress = {
                           () => this.validateForm()
                        }>
                        <Text style = { styles.submitButtonText }> Login</Text>
                    </TouchableOpacity>
                    <Text style = { styles.subButtonText}>Not a member?</Text>
                    <TouchableOpacity
                       style = {styles.submButton}
                        onPress = {
                           () =>  this.goToRegister()
                        }>
                        <Text style = { styles.submitButtonsText }> SignUp </Text>
                    </TouchableOpacity>
                    </View>
                 </ImageBackground>
        );
    }
}
function mapStateToProps(state){
    return {
        userReducer: state.userReducer
    };
}
function mapDispatchToProps(dispatch){
    return {
        onLogin:(userinfo) => dispatch(userLogin(userinfo)),
        // userAuth: () => dispatch(userAuth())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // backgroundColor: '#F05E23',
    },
   
    backgroundContainer: {
        flex: 1,
        width: 375,
        height: 620,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        justifyContent: 'flex-end',
        width: 75,
        height: 75,
        alignItems: 'center',
        left: 1,
        top: 10,
    },
    logoText: {
        color: 'purple',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        left: -15
    },
    errorstyle: {
         left: 90,
         color: 'black',
         top: 18
    },
    input: {
        margin: 100,
        height: 50,
        width: 280,
        backgroundColor: 'rgba(255, 255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 40,
        fontSize: 14,
        color: "black",
        borderBottomWidth: 0.1,
        marginVertical: 5,
        left: -10,
        top: 20,
    },
    inputIcons: {
        position: 'absolute',
        top: 35,
        left: 93,
        margin: 6
    },
    inputsIcons: {
        position: 'absolute',
        top: 15,
        left: -12,
        margin: 115
    },
    submitButton: {
        margin: 100,
        height: 50,
        width: 280,
        backgroundColor: 'black',
        borderRadius: 25,
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        marginVertical: 15,
        left: -8,
    },
    
    submitButtonText:{
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    submitButtonsText:{
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        textDecorationLine: 'underline',
        left: -10
    },
    subButton: {
        margin: 10,
        height: 30,
        width: 290,
        color: 'transparent',
        borderRadius: 1,
        paddingHorizontal: 16,
        paddingVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 0.1,
        marginVertical: 1,
    },
    subButtonText: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        left: -10
    },
    text: {
        color: 'purple',
        fontWeight: '500',
        fontSize: 14
    }
})