import React, {Component} from 'react';
import { GiftedChat, Bubble, Send, Avatar } from 'react-native-gifted-chat';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { chatInsert, chatList } from '../actions/chatAction';
import bgImage from '../assets/black.jpg'
import SocketIOClient from 'socket.io-client';
import bImage from '../assets/avatar.jpg'
import { SERVERURL } from '../../config';

// type Props = {
//     name?: string,
// };

class Chat extends Component {

	constructor(props) {
	super(props);
	this.state = {
        userid: this.props.navigation.state.params.userid,
        messages: []
    }
    this.onSend = this.onSend.bind(this);
}

componentDidMount() {
     this.socket = SocketIOClient('http://192.168.1.100:8082')
     const data = {
         receiver_id: this.props.navigation.state.params.userid,
        sender_id: this.props.userReducer.userAuth._id
        // receiver_id: this.state.userid,
        // sender_id: this.props.userReducer.userAuth._id
    };
    this.socket.emit('getMessage',data);
    this.socket.on('receiveMessage', (chatlist) => {
        if(chatlist && chatlist.length>0){
            this.setState({messages: chatlist});
        }
    });
    //  let that = this;
    // setInterval(async () => {
    //     this.props.onGetMessage(data)
    // },10000);
}

componentDidUpdate(nextProps){
	if(this.props.chatReducer && this.props.chatReducer.chatList && this.props.chatReducer.chatList!==nextProps.chatReducer.chatList && this.props.chatReducer.chatListSuccess=== true) {
		this.setState({
            messages: this.props.chatReducer.chatList
        });
	}
}

onSend(messages = []) {
    this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
    }))
}
submitChatMessage(messages = []) {
    const date = new Date();
    const timestamp = date.getTime();
    this.onSend(messages)
    let details = {
        user:{
            _id: this.props.userReducer.userAuth._id,
        },
        receiver_id: this.state.userid,
        sender_id: this.props.userReducer.userAuth._id,
        createdAt: date,
        text: messages && messages[0] && messages[0].text
    }
    this.props.onChatMessage(details);
}

renderSend(props){
    return(
       < Send {...props} textStyle={{color: 'black',fontWeight:'bold'}} label={'Send'} />
    );
}
 renderAvatar = (props) => {
     <Avatar
    {...props}
    containerStyle={{left: {borderWidth:3,borderColor:'red'}, right: {} }}
    imageStyle={{left: {borderWidth:3,borderColor:'blue'}, right: {}, source: 'bImage' }}
    />
}
   

renderBubble = (props) => {
    return (<Bubble { ...props}
    textStyle={{
        right: {
            color: '#000000',
        },
        left: {
            color: '#000000',
        },
    }}
    timeTextStyle={{
        right: {
            color: '#000000',
        },
        left: {
            color: '#000000',
        },
    }}
    wrapperStyle={{
        left: {
            backgroundColor: 'white',
        },
        right: {
            backgroundColor: '#FD6A02',
        }
    }} />
    );
}

   render() {
      return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
           <View style={{ flex: 1,marginTop: 90 }}>
              <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.submitChatMessage(messages)}
                 renderBubble={this.renderBubble}
                 user={{
                     _id: this.props.userReducer.userAuth._id,
                     avatar: 'https://placeimg.com/150/150/any',
                 }}
                 placeholder= 'Start typing...'
                 alwaysShowSend
                 scrollToBottom
                 renderSend={this.renderSend}
                 renderAvatar={this.renderAvatar}
                 showUserAvatar 
                 showAvatarForEveryMessage
              />
            </View>
            </ImageBackground>
        )
    }
}
function mapStateToProps(state){
    return {
        chatReducer: state.chatReducer,
        userReducer: state.userReducer
    };
}
function mapDispatchToProps(dispatch){
    return {
        onChatMessage: (chatMessage) => dispatch(chatInsert(chatMessage)),
        onGetMessage: (data) => dispatch(chatList(data)),
        // getChatList: (data) => dispatch(chatprevList(data)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: 375,
        height: 620,
    },
})
