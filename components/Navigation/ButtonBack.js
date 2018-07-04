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
                style={{ left: 5 }}
                onPress={ () => onPress() } >

                <Icon
                    name="chevron-left"
                    style={[ styles.icon ]} />

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    icon: { fontSize: 45 }
})

export default ButtonBack;
