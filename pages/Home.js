import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { userList, logout } from '../actions/userAction';
import { connect } from 'react-redux';
import { Caption, Title,Divider, IconButton } from 'react-native-paper';
import bgImage from '../assets/black.jpg';
import bImage from '../assets/avatar2.jpg';
import { Avatar } from 'react-native-elements';


class Home extends Component {
	constructor(props) {
	super(props);
	this.state = {
		users: []
	};
}

componentDidMount() {
	this.props.onUserList()
}

goToChat = (userid, name) => {
	this.props.navigation.navigate('Chat', {userid: userid, name:name});
}

componentDidUpdate(nextProps){
	if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess=== true) {
		this.setState({users:this.props.userReducer.userList});
	}
	// if(this.props.userReducer && this.props.userReducer.userLogoutSuccess===true) {
	// 	this.props.navigation.navigate('Login');
	// }
}

// getUserList = async () => {
// 	let that = this;
// 	axios.get('http://192.168.1.100:8082/userlist')
//     .then(function (response) {
//     if(response && response.data) {
//       that.setState({users:response.data});
//     } else if(response && response.data && response.data.message) {
//       Toast.show(response.data.message, 1000);
//     }
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }

goToLogin = () => {
	this.props.navigation.navigate('Login');
}


render() {
	const {users} = this.state;
	return (
		<ImageBackground source={bgImage} style={styles.backgroundContainer}>

		<View style={styles.container}>
			 {/* <TouchableOpacity
					  onPress = {
						 () =>  this.goToLogin()
					  }>
					  <Text style = { styles.submitButtonsText }> Logout </Text>
				  </TouchableOpacity> */}
		{users && users.length>0 ?
		<View>
			{users.map((item, index) => {
				return (
					//  <View style={{flexDirection: 'row',marginTop: 30, marginLeft:5}}
					<View style={{flexDirection: 'row'}}>
					 <Avatar
					 rounded
					 source={bImage}
					 size={40}
					 />
					<TouchableOpacity onPress={()=>this.goToChat(item._id, item.name)} key={index}>
						<Text style={styles.item}>
							{item.name}
						</Text>
					</TouchableOpacity>
					</View>
				)})}
         </View>:null}
	    
		<TouchableOpacity style = {styles.submitButton} 
		 onPress={()=>this.goToLogin()}>
			 <Text style={{color:'#FD6A02',fontWeight:'bold'}}> LOGOUT 
			 <IconButton
			 icon="logout"
			 color='#FD6A02'
			 size={30}
			 />
			 </Text>	
		</TouchableOpacity>  
		 </View>
		 </ImageBackground>
		)
	}
}
function mapStateToProps(state){
    return {
        userReducer: state.userReducer
    };
}
function mapDispatchToProps(dispatch){
    return {
		onUserList:() => dispatch(userList()),
		logout:() => dispatch(logout())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 25,
	},
	item: {
		padding: 10,
		fontSize: 20,
		height: 60,
		color: '#FD6A02',
	},
	backgroundContainer: {
        flex: 1,
        width: 375,
        height: 620,
        justifyContent: 'center',
        alignItems: 'center',
    },
	submitButton:{
        color: '#FD6A02',
        fontSize: 14,
        textAlign: 'center',
        textDecorationLine: 'underline',
        alignItems: 'center',
		top: 230,
	}

});