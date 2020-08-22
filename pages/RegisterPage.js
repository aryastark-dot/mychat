import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, TextButton, ImageBackground, Image, StyleSheet, Button, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { userRegister } from '../actions/userAction';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import bgImage from '../assets/screen.png'
import Logo from '../assets/frendy.png'


class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            displayname: '',
            email: '',
            password: '',
            errors: {},
        };
         this.validateForm=this.validateForm.bind(this);
    }
    handleName = (text) => {
        this.setState({ name: text })
    }
    handleDisplayname = (text) => {
        this.setState({ displayname: text })
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    validateForm(){
        const { errors } = this.state;
        const name = this.state.name;
        const displayname = this.state.displayname
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg =/^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        const reg1 = /^[a-zA-Z\s]+$/;
        if (name ===''){
            errors.name="Name cannot be empty.";
           }else {
            errors.name="";
           }
           if (displayname ===''){
            errors.displayname="Name cannot be empty.";
           }else {
            errors.displayname="";
           }
        if(emailaddr ===''){
            errors.email="Email address cannot be empty.";
        }else if(emailaddr.length>0 && !reg.test(emailaddr)){
            errors.email="please provide correct email address.";
        }else {
            errors.email="";
        }
        if (pass ===''){
            errors.pass="password cannot be empty.";
        }else if(pass && pass.length<5){
            errors.pass="Password should have more than 5 characters.";
        }else {
            errors.pass="";
        }
        this.setState({ errors })
        if(errors.name==='' && errors.displayname==='' && errors.email==='' && errors.pass===''){
            const userinfo={
                name:this.state.name,
                displayname:this.state.displayname,
                email:this.state.email,
                password:this.state.password
            }
            this.props.onLogin(userinfo)
        }
    }

    // submitForm = async () => {
    //     let that = this;
    //     axios.post('http://192.168.1.100:8082/registeruser',{
    //         name: this.state.name,
    //         displayname: this.state.displayname,
    //         email: this.state.email,
    //         password: this.state.password
    //     })
    //     .then(function (response) {
    //         if(response && response.data && response.data._id){
    //             that.props.navigation.navigate('Home');
    //         } else {
    //             Toast.show(response.data.message, 1000);
    //         }
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }

    goToLogin = () => {
        this.props.navigation.navigate('Login');
    }
    componentDidUpdate(nextProps){
        if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userReducer.userAuth && this.props.userReducer.userAuthSuccess=== true) {
            this.props.navigation.navigate('Home');
        }
    }

    render() {
            const {errors} =this.state;
            return (
                <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                    <View style={styles.container}>
                        <Image source={Logo} style={styles.logo} />
                        <Animatable.Text
                             animation="zoomIn"
                             duration={3000}
                             source={Logo}
                             style={styles.logoText}
                             resizeMode={"stretch"}
                             iterationCount={"infinite"}
                             >smileon </Animatable.Text>
                    </View>
                    <View style={styles.Container}>
                   <Icon name={'ios-person-outline'} size={20} color={"black"}
                   style={styles.inputIcons} />
                   
                      <TextInput style = {styles.input}
                       underlineColorAndroid = 'rgba(0,0,0,0)'
                       placeholder = "username"
                       placeholderTextColor = "black"
                       autoCapitalize = "none"
                       onChangeText = {this.handleName}/>
                      <Text style={styles.errorstyle}>{errors.name}</Text>

                   <Icon name={'ios-person-outline'} size={20} color={"black"}
                       style={styles.inputIons} />
                   <TextInput style = {styles.input}
                      underlineColorAndroid = 'rgba(0,0,0,0)'
                      placeholder = "Displayname"
                      placeholderTextColor = "black"
                      autoCapitalize = "none"
                      onChangeText = {this.handleDisplayname}/>
                      <Text style={styles.errorstyle}>{errors.displayname}</Text>

                   <Icon name={'ios-mail-outline'} size={20} color={"black"}
                   style={styles.inIcons} />
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
                        <Text style = { styles.submitButtonText }> signup</Text>
                    </TouchableOpacity>
                    <Text style = { styles.subButtonText}>Already a Member?</Text>
                    <View style={styles.Container}>
                    <TouchableOpacity
                       style = {styles.submButton}
                        onPress = {
                           () => this.goToLogin()
                        }>
                        <Text style = { styles.submitButtonsText }> Login </Text>
                    </TouchableOpacity>
                    </View>
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
        onLogin:(userinfo) => dispatch(userRegister(userinfo))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    backgroundContainer: {
        flex: 1,
        width: 375,
        height: 620,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        justifyContent: 'center',
        width: 70,
        height: 70,
        alignItems: 'center',
        left: -15,
        top:50,
    },
    logoText: {
        color: 'purple',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        left: -14,
        top: -80
    },
    input: {
        margin: 55,
        height: 40,
        width: 230,
        backgroundColor: 'rgba(255, 255,255,0.3)',
        borderRadius: 25,
        padding: 10,
        fontSize: 14,
        color: "black",
        borderBottomWidth: 1,
        marginVertical: 1,
        marginHorizontal: 40,
        left: -12,
        paddingHorizontal: 40,
        top: -55
    },
    inputIcons: {
        position: 'absolute',
        top: -3,
        left: 15,
        margin: 15,
        padding: 10
    },
    inputIons: {
        position: 'absolute',
        top: -75,
        left: 15,
        margin: 15,
        padding: 10,
    },
    inIcons: {
        position: 'absolute',
        top: -2,
        left: -55,
        margin: 85,
        padding: 10,
    },
    inputsIcons: {
        position: 'absolute',
        top: -5,
        left: -125,
        margin: 155,
        padding: 10,
    },
    submitButtons: {
        margin: 45,
        height: 40,
        width: 220,
        backgroundColor:  'rgba(255, 255,255,0.3)',
        borderRadius: 25,
        padding: 5,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        marginVertical: 1,
        left: 8,
        bottom: 65,
        paddingHorizontal: 34,
    },
    errorstyle: {
        left: 20,
        color: 'black',
        top: -53,
   },
    submitButton: {
        margin: 15,
        height: 31,
        width: 180,
        backgroundColor: 'black',
        borderRadius: 25,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        marginVertical: 1,
        left: 25,
        top: -60
    },
    submitButtonText:{
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    submitButtonsText:{
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        textDecorationLine: 'underline',
        left: -10,
        bottom: 50
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
        bottom: -30
    },
    subButtonText: {
        color: 'black',
        fontSize: 12,
        textAlign: 'center',
        bottom: 50,
        left: -15,
    },
    text: {
        color: 'purple',
        fontWeight: '500',
        fontSize: 14
    }
})