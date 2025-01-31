import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const BirdSighting = () => {
  // State to store user's current location
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  // state to store map region, initialised to cover a large area

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 90,
    longitudeDelta: 90,
  });
  // States of bird sighting details
  const [birdName, setBirdName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sightings, setSightings] = useState<any[]>([]);
  const [selectedSighting, setSelectedSighting] = useState<any>("");
  const [modalVisible, setModalVisible] = useState(false);

  //  Predefined colour palette for markers on the maps
  const markerColors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "yellow",
    "pink",
    "brown",
    "cyan",
    "gray",
  ];

  // Fetching current location on component mount
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied"
        );
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 90,
        longitudeDelta: 90,
      });
    };
    getLocation();
  }, []);
  // Convert address to geographic coordinates
  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    if (geocodedLocation.length > 0) {
      const { latitude, longitude } = geocodedLocation[0];
      setLatitude(latitude.toString());
      setLongitude(longitude.toString());
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 90,
        longitudeDelta: 90,
      });
    } else {
      Alert.alert("Geocoding Error", "Unable to find the location");
    }
  };

  // Function to save bird sighting details
  const saveSighting = () => {
    // Validates inputs before saving sighting
    if (!birdName || !latitude || !longitude || !description) {
      Alert.alert(
        "Invalid Input",
        "Please enter bird species, description, and valid address"
      );
      return;
    }

    // saving the sighting with coordinates
    const coords = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
    setSightings((prevSightings) => [
      ...prevSightings,
      {
        name: birdName,
        description,
        coords,
      },
    ]);

    // Reset form inputs after saving
    Alert.alert(" Birds Sighting saved!");
    setBirdName("");
    setLatitude("");
    setLongitude("");
    setDescription("");
  };
  // Function to zoom in by reducing latitude/ longitude delta
  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };
  // Function to zoom out by reducing latitude/ longitude delta
  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  // Show bird sighting details when a marker is pressed

  const handleMarkerPress = (sighting: any) => {
    setSelectedSighting(sighting);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.geoTaggingTitle}>Geo Tagging</Text>
        <Text style={styles.title}>Enter Bird Species:</Text>
        <TextInput
          value={birdName}
          onChangeText={setBirdName}
          placeholder="Enter Bird Species"
          style={styles.input}
        />

        <Text style={styles.title}>Enter Location Address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Address"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={geocode}>
          <Text style={styles.buttonText}>GeoCode Address</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Enter Description </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={saveSighting}>
          <Text style={styles.buttonText}>Save Sighting</Text>
        </TouchableOpacity>

        {location && (
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={setRegion}
          >
            {sightings.map((sighting, index) => (
              <Marker
                key={index}
                coordinate={sighting.coords}
                title={sighting.name}
                description={sighting.description}
                pinColor={markerColors[index % markerColors.length]}
                onPress={() => handleMarkerPress(sighting)}
              />
            ))}
          </MapView>
        )}
        <View style={styles.zoomButtonsContainer}>
          <TouchableOpacity
            style={styles.zoomButton}
            onPress={() =>
              setRegion({
                ...region,
                latitudeDelta: region.latitudeDelta / 2,
                longitudeDelta: region.longitudeDelta / 2,
              })
            }
          >
            {/*Zoom in and out buttons*/}
            <Text style={styles.zoomButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.zoomButton}
            onPress={() =>
              setRegion({
                ...region,
                latitudeDelta: region.latitudeDelta * 2,
                longitudeDelta: region.longitudeDelta * 2,
              })
            }
          >
            <Text style={styles.zoomButtonText}>-</Text>
          </TouchableOpacity>
        </View>
        {/*Modal to display selected sighting details*/}
        {selectedSighting && (
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{selectedSighting.name}</Text>
                <Text style={styles.modalDescription}>
                  {selectedSighting.description}
                </Text>
                <Text style={styles.modalDescription}>
                  Latitude:{selectedSighting.coords.latitude}
                </Text>
                <Text style={styles.modalDescription}>
                  Longitude:{selectedSighting.coords.longitude}
                </Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  geoTaggingTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    width: "80%",
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bFF",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  zoomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  zoomButton: {
    backgroundColor: "#007bFF",
    padding: 10,
    borderRadius: 8,
    width: 60,
    alignItems: "center",
    marginHorizontal: 10,
  },
  zoomButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default BirdSighting;
