import React, { useState, useEffect } from 'react';
import { Alert, Modal, Pressable, Platform, Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';






export default function App() {

  



  const [location, setLocation] = useState({ coords: {} });

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg('wont work');
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        return;
      }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      

    })();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);




  var alt = location.coords.altitude;
  var long = location.coords.longitude;
  var lat = location.coords.latitude;
  alt = parseInt(alt, 10);




  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1F7E17', '#2FDA73']}
        style={styles.background}
      />

      <View style={styles.mainDiv}>
        <Text style={styles.altitude}>ALTITUDE</Text>
        <Text style={styles.output}>{alt} m</Text>
      </View>

      <View style={styles.longlatDiv}>
        <View style={styles.longlat}>
          <Text style={styles.title}>Longitude</Text>
          <Text style={styles.outputLocation}>{long}</Text>
        </View>

        <View style={styles.longlat}>
          <Text style={styles.title}>Latitude</Text>
          <Text style={styles.outputLocation}>{lat}</Text>
        </View>  
      </View>

      <View
        style={{
          borderBottomColor: 'white',
          borderBottomWidth: 1,
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>LAAAAAAAAAAA</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.align, styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
      <Image
        source={require('./assets/images/info.png')}
        fadeDuration={0}
        style={{ width: 15, height:15, marginBottom:8 }}
      />
        <Text style={styles.textStyle}>FUN FACTS</Text>
      </Pressable>


    </View>
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    minHeight: 100,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  mainDiv: {
    flex: 0.2,
    position: 'relative',
  },
  refresh: {
    position: 'relative',
    marginLeft: 20,
    marginTop: 120,
    marginBottom: 10,
    fontFamily: 'sans-serif',
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  altitude: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'sans-serif-thin',
    fontSize: 12,
    margin: 0,
    letterSpacing: 7,
  },
  output: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontSize: 48,
    marginTop: 5,
  },
  longlat: {
    flexDirection: 'column',
    textAlign: 'center',
    margin: 20,
    lineHeight: 30,
  },
  longlatDiv: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom:50,
  },
  title: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    letterSpacing: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  outputLocation: {
    fontFamily: 'sans-serif',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: 'transparent',
    marginTop:30,
  },
  buttonClose: {
    backgroundColor: '#4B922E',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  align: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
