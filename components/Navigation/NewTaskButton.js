import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class NewPostButton extends Component {

    render() {

        const { onPress, color, navigate, to } = this.props;

        return (
            <TouchableOpacity
                style={{ right: 20 }}
                onPress={ () => navigate(to) } >

                <Icon
                    name="ios-add-circle-outline"
                    style={[ styles.icon ]}
                    color={color} />

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    icon: { fontSize: 25 },
})

export default NewPostButton;
