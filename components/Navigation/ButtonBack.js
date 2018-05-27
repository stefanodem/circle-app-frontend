import React, { Component } from 'react'
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

class ButtonBack extends Component {

    render() {

        const { onPress } = this.props;

        return (
            <TouchableOpacity
                style={{ left: 10 }}
                onPress={ () => onPress() } >

                <Icon
                    name="chevron-left"
                    style={[ styles.icon ]} />

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    icon: { fontSize: 30 }
})

export default ButtonBack;
