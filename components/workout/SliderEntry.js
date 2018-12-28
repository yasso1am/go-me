import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AppStyles from '../../AppStyles'


class SliderEntry extends React.Component {



    render () {
      const {item, index, navigation} = this.props
        return (
          <View style={{flex: 1}}>
            
            <View style={styles.pictureContainer}>
              <Image style={{width: '100%', height: '100%'}} resizeMode='stretch' source={{uri: item.hero_image}} />
            </View>
            
            <TouchableOpacity activeOpacity={0.75} style={styles.descriptionContainer} onPress={ () => navigation.navigate('GoalSelect', {goal: item})}>
                <Text style={{fontWeight: 'bold', color: '#555555', opacity: 0.5}}> Level {item.difficulty} </Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={{fontWeight: 'bold', fontSize: 30}}> {item.name} </Text>
                <Text adjustsFontSizeToFit style={styles.descriptionText}> {item.description } </Text>
                <Text style={{fontWeight: 'bold', color: '#555555', opacity: 0.5}}> {item.workouts_count} workouts tracked </Text>
            </TouchableOpacity>

            <View style={styles.detailsContainer}>
              <View style={styles.detailColumn}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}> Distance </Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.numberText}> {item.distance} {item.type === "Rowing" ? "meters" : "miles" } </Text>
              </View>
            </View>
            
          </View>

        );
    }
}

const styles = StyleSheet.create({
  pictureContainer: {
    flex: 3
  },
  descriptionContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: AppStyles.primaryColor
  }, 
  detailColumn:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  descriptionText: {
    color: '#707070',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 20,
  },
  numberText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 8,
    color: 'white',
    textAlign: 'center'
  }
})

export default SliderEntry