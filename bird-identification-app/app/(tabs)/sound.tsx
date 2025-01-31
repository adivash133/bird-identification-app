import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Audio } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Define the structure for storing audio file metadata
type AudioFile = {
  id: string;
  name: string;
  uri: string;
};

const Sound = () => {
  // State hooks to manage recording, saved files, modal visibility
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [tempURI, setTempURI] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newRecordingName, setNewRecordingName] = useState("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [isCheatSheetVisible, setCheatSheetVisible] = useState(false);

  // Request permission for audio recording

  const getAudioPermissions = async () => {
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission Required", "Audio recording requires permission");
      return false;
    }
    return true;
  };
  // Start a new audio recording if permission is granted

  const startRecording = async () => {
    try {
      const hasPermission = await getAudioPermissions();
      if (!hasPermission) return;
      const { recording } = await Audio.Recording.createAsync();
      setRecording(recording);
    } catch (error) {
      console.error("Error while starting recording", error);
      Alert.alert(
        "Recording Error, Failed to start recording. Please try again"
      );
    }
  };
  // Stop the current recording and prompt users to save it
  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        recording.setOnRecordingStatusUpdate(null);
        if (uri) {
          setNewRecordingName(""); // Reset the name input
          setModalVisible(true); // Open modal to save recording
          setRecording(null);
          setTempURI(uri); // Store URI temporarily for saving
        }
      }
    } catch (error) {
      console.error("Error while stopping recording", error);
      Alert.alert(
        "Recording Error, Failed to stop recording. Please try again"
      );
    }
  };

  // Save the recorded audio file with user-specified name
  const saveRecording = () => {
    if (!newRecordingName.trim()) {
      Alert.alert("Invalid Name", "Please enter a name for the recording.");
    } else if (audioFiles.some((file) => file.name === newRecordingName)) {
      Alert.alert(
        "Duplicate Name",
        "This recording name is already taken. Please enter a different name."
      );
    } else if (tempURI) {
      setIsSaving(true);
      setTimeout(() => {
        // Add the new recording to the list of audio files
        setAudioFiles((prevFiles) => [
          ...prevFiles,
          {
            id: Date.now().toString(),
            name: newRecordingName,
            uri: tempURI,
          },
        ]);
        setTempURI(null);
        setModalVisible(false);
        setIsSaving(false);
      }, 1000);
    }
  };
  // Close modal without saving the recording
  const closeModal = () => {
    setModalVisible(false);
    setNewRecordingName("");
  };

  // Play the selected audio file
  const playAudio = async (uri: string) => {
    try {
      if (currentSound) {
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync({ uri });
      setCurrentSound(sound);

      if (playbackPosition > 0) {
        await sound.setPositionAsync(playbackPosition); // Resume playback from the last position
      }

      await sound.playAsync(); // Start playing audio
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          if (status.didJustFinish) {
            sound.unloadAsync();
            setCurrentSound(null);
            setPlaybackPosition(0); // Reset playback position after completion
          } else {
            setPlaybackPosition(status.positionMillis); // Update playback position
          }
        }
      });
    } catch (error) {
      console.error("Error while playing audio", error);
    }
  };

  // Pause the currently playing audio
  const pauseAudio = async () => {
    if (currentSound) {
      await currentSound.pauseAsync();
    }
  };
  // Delete a selected audio file from the list
  const deleteAudio = (id: string) => {
    const audioFile = audioFiles.find((file) => file.id === id);

    if (audioFile) {
      const sound = new Audio.Sound();
      sound
        .loadAsync({ uri: audioFile.uri })
        .then(() => {
          sound.stopAsync();
          sound.unloadAsync();
        })
        .catch((error) => console.error("Error uploading audio", error));
      setAudioFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
      if (currentSound) {
        currentSound.stopAsync();
        currentSound.unloadAsync();
        setCurrentSound(null);
      }
    }
  };
  // Toggle visibility of the "Cheat Sheet" modal
  const toggleCheatSheet = () => {
    setCheatSheetVisible(!isCheatSheetVisible);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sound Identification</Text>
      <Text style={styles.instructions}> Record your bird recording here</Text>

      <View style={styles.recordingContainer}>
        <Text style={styles.recordingStatus}>
          {recording ? "Recording..." : "No recording in progress"}
        </Text>
      </View>

      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Start or Stop Recording"
        style={styles.button}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {recording ? "Stop Recording" : "Start Recording"}
        </Text>
      </TouchableOpacity>

      {/*Button to toggle the "Cheat Sheet modal" */}
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="View Cheat Sheet"
        style={[styles.button, { backgroundColor: "#28a745" }]}
        onPress={toggleCheatSheet}
      >
        <Text style={styles.buttonText}>Cheat Sheet</Text>
      </TouchableOpacity>

      {/*"Cheat Sheet modal" with bird common birds and their identification info*/}
      <Modal visible={isCheatSheetVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Bird Identification Cheat Sheet</Text>
          <ScrollView contentContainerStyle={styles.cheatSheetContainer}>
            <View style={styles.cheatSheetCard}>
              <Text style={styles.cheatSheetTitle}>American Robin</Text>
              <Text style={styles.cheatSheetDescription}>
                Found in gardens, makes a cheerful, melodious song.
              </Text>
            </View>

            <View style={styles.cheatSheetCard}>
              <Text style={styles.cheatSheetTitle}>Common Blackbird</Text>
              <Text style={styles.cheatSheetDescription}>
                Often heard in woodlands, with a loud, clear whistle.
              </Text>
            </View>
            <View style={styles.cheatSheetCard}>
              <Text style={styles.cheatSheetTitle}>European Starling</Text>
              <Text style={styles.cheatSheetDescription}>
                Characterised by varied, sharp chattering sound, commonly heard
                in urban areas.
              </Text>
            </View>
            <View style={styles.cheatSheetCard}>
              <Text style={styles.cheatSheetTitle}>Blue Tit</Text>
              <Text style={styles.cheatSheetDescription}>
                High pitched, commonly "tee-tee-tee" sound, found in woodlands
                and gardens.
              </Text>
            </View>

            <View style={styles.cheatSheetCard}>
              <Text style={styles.cheatSheetTitle}>House Sparrow</Text>
              <Text style={styles.cheatSheetDescription}>
                A recognisable chirp, often heard in urban environments, rapid
                and sharp notes.
              </Text>
            </View>
            {/*Future Expansion - more birds identification will be displayed */}
          </ScrollView>

          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={toggleCheatSheet}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Modal for saving recording with name */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Save Recording</Text>
          <TextInput
            style={styles.input}
            accessible={true}
            accessibilityLabel="Enter recording name"
            placeholder="Enter recording name"
            value={newRecordingName}
            onChangeText={setNewRecordingName}
          />
          <TouchableOpacity style={styles.button} onPress={saveRecording}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={closeModal}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Display the list of saved audio files */}

      {audioFiles.length > 0 ? (
        <View style={styles.recordingList}>
          {audioFiles.map((file) => (
            <View key={file.id} style={styles.audioItem}>
              <Text style={styles.audioName}>{file.name}</Text>
              <View style={styles.actionButtons}>
                {/*Play, Pause, and Delete action buttons for each file  */}
                <TouchableOpacity
                  style={[styles.actionButton, styles.playPauseButton]}
                  onPress={() => playAudio(file.uri)}
                  accessible={true}
                  accessibilityLabel="Play Audio"
                >
                  <FontAwesome5 name="play" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.pauseButton]}
                  onPress={() => pauseAudio()}
                  accessible={true}
                  accessibilityLabel="Pause Audio"
                >
                  <FontAwesome5 name="pause" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => deleteAudio(file.id)}
                  accessible={true}
                  accessibilityLabel="Delete Audio"
                >
                  <FontAwesome5 name="trash" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.instructions}>
          No recordings yet. Start recording to add one
        </Text>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  recordingContainer: {
    width: 200,
    height: 200,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  recordingStatus: {
    fontSize: 16,
    color: "#aaa",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },

  cheatSheetContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  cheatSheetCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cheatSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cheatSheetDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },

  closeButton: {
    backgroundColor: "#dc3545",
  },
  recordingList: {
    width: "100%",
    marginTop: 20,
  },
  audioItem: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  audioName: {
    fontSize: 16,
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  playPauseButton: {
    backgroundColor: "#28a745",
  },
  pauseButton: {
    backgroundColor: "#dc3545",
  },
  deleteButton: {
    backgroundColor: "#FFA500",
  },
});

export default Sound;
