import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView as KAV,
  Platform,
  StyleSheet,
} from "react-native";

const KeyboardAvoidingView = ({ children, offset = 0 }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    // Add listeners for keyboard events when the component mounts
    Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide);

    // Remove listeners when the component unmounts
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  // Function to handle keyboard showing event
  const handleKeyboardDidShow = (event) => {
    // Get the height of the keyboard from the event
    const keyboardHeight = event.endCoordinates.height;

    // Set the state to adjust the page height
    setKeyboardOffset(keyboardHeight * offset);
    // console.log("keyboard show", keyboardOffset);
  };

  // Function to handle keyboard hiding event
  const handleKeyboardDidHide = () => {
    // Reset the state to its original value
    setKeyboardOffset(0);

    console.log("keyboard hidden", keyboardOffset);
  };

  return (
    <KAV
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={keyboardOffset}
    >
      {children}
    </KAV>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  innerContainer: {
    padding: 16,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default KeyboardAvoidingView;
