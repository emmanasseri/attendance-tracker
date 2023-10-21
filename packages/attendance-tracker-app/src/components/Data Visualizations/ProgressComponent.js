import React from "react";
import { View, Text, StyleSheet } from "react-native";
import globalStyles, { brightColors } from "../../styles/globalStyles";

const ProgressComponent = ({ currentAmount, amountRequired, companyName }) => {
  const progressPercentage = (currentAmount / amountRequired) * 100;

  const getRandomThemeColor = () =>
    brightColors[Math.floor(Math.random() * brightColors.length)];

  const fillColor = getRandomThemeColor(); // get a random theme color

  return (
    <View
      style={{
        ...globalStyles.dataVisualizationStyle,
        backgroundColor: "black",
      }}
    >
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${progressPercentage}%`, backgroundColor: fillColor }, // set the background color here
          ]}
        ></View>
      </View>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 16,
          padding: 16,
        }}
      >
        {Math.floor(progressPercentage)}% progress to your next {companyName}{" "}
        reward.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  progressBarBackground: {
    width: "90%",
    height: 20,
    backgroundColor: "white", // Changed this line to set the background to white
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
  },
});

export default ProgressComponent;
