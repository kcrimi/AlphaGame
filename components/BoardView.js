'use strict'

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import autobind from 'autobind-decorator';
var {width, height} = require('Dimensions').get('window');
const GRID_SIZE = 4;
const CELL_SIZE = Math.floor(width * .2);
const CELL_PADDING = Math.floor(CELL_SIZE * .05);
const BORDER_RADIUS = CELL_PADDING * 2;
const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
const LETTER_SIZE = Math.floor(TILE_SIZE * .85);

class BoardView extends Component {

	constructor(props) {
		super(props);
		var opacities = new Array(GRID_SIZE * GRID_SIZE);
		for (var i = 0; i < opacities.length; i++){
			opacities[i] = new Animated.Value(1);
		}
		this.state = {opacities: opacities};
	}

	render() {
		return (
			<View style = {styles.container}>
				{this.renderTiles()}
			</View>
		);
	}

	renderTiles() {
		var result = [];
		for (var row = 0; row < GRID_SIZE; row++) {
			for (var col = 0; col < GRID_SIZE; col++) {
				var id = row * GRID_SIZE + col;
				var letter = String.fromCharCode(65 + id);
				var style = {
					left: col * CELL_SIZE + CELL_PADDING,
					top: row * CELL_SIZE + CELL_PADDING,
					opacity: this.state.opacities[id],
				};
				result.push(this.renderTile(id, style, letter));
			}
		}
		return result;
	}

	renderTile(id, style, letter) {
		return (
			<Animated.View key={id} style={ [styles.tile, style] }
				onStartShouldSetResponder={() => this.clickTile(id)}>
				<Text style={ styles.letter }> { letter } </Text>
			</Animated.View>
		);
	}

	clickTile(id) {
		var opacity = this.state.opacities[id];
		opacity.setValue(.5);
		Animated.timing(opacity, {
			toValue: 1,
			duration: 250,
		}).start();
	}
}

const styles = StyleSheet.create({
	container: {
		width: CELL_SIZE * GRID_SIZE,
		height: CELL_SIZE * GRID_SIZE,
		backgroundColor: 'transparent',
	},
	tile: {
		position: 'absolute',
		paddingTop: CELL_PADDING * 2,
		width: TILE_SIZE,
		height: TILE_SIZE,
		borderRadius: BORDER_RADIUS,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#BEE1D2'
	},
	letter: {
		fontFamily: 'Serto Urhoy',
		color: '#333',
		fontSize: LETTER_SIZE,
		backgroundColor: 'transparent',
	},
});

module.exports = BoardView;