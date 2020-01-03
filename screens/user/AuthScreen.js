import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "./../../components/UI/Input";
import Card from "./../../components/UI/Card";
import Colors from "../../constants/Colors";

const AuthScreen = props => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.container}>
          <ScrollView>
            <Input
              label="E-mail"
              id="email"
              keyboardType="email-address"
              email
              required
              autoCapitalize="none"
              errorMessage="Enter a valid email address"
              onValueChange={() => {}}
              initialValue=""
            />
            <Input
              label="Password"
              id="password"
              keyboardType="default"
              secureTextEntry
              minLength={5}
              email
              required
              autoCapitalize="none"
              errorMessage="Enter a valid password"
              onValueChange={() => {}}
              initialValue=""
            />
            <Button title="Login" color={Colors.primary} onPress={() => {}} />
            <Button
              title="Switch to Sign Up"
              color={Colors.accent}
              onPress={() => {}}
            />
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AuthScreen;
