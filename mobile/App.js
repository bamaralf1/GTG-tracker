import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono';
import { useState, useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';

let globalError = null;
if (typeof ErrorUtils !== 'undefined') {
  const orig = ErrorUtils._globalHandler;
  ErrorUtils.setGlobalHandler((e, isFatal) => {
    globalError = e?.message || String(e);
    if (orig) orig(e, isFatal);
  });
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    BebasNeue_400Regular,
    ShareTechMono_400Regular,
  });
  const [renderError, setRenderError] = useState(null);

  useEffect(() => {
    if (globalError) setRenderError(globalError);
    const timer = setInterval(() => {
      if (globalError) setRenderError(globalError);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  if (renderError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠</Text>
        <Text style={styles.errorTitle}>ERRO</Text>
        <Text style={styles.errorMsg}>{renderError}</Text>
      </View>
    );
  }

  if (fontError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠</Text>
        <Text style={styles.errorTitle}>ERRO DE FONTE</Text>
        <Text style={styles.errorMsg}>{String(fontError)}</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingIcon}>💪</Text>
        <ActivityIndicator size="large" color="#d4a843" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1, backgroundColor: '#0a0a0a',
    alignItems: 'center', justifyContent: 'center',
    gap: 16,
  },
  loadingIcon: { fontSize: 48 },
  errorContainer: {
    flex: 1, backgroundColor: '#0a0a0a',
    alignItems: 'center', justifyContent: 'center',
    padding: 32,
  },
  errorIcon: { fontSize: 48, marginBottom: 16 },
  errorTitle: { fontSize: 20, color: '#cc0000', fontWeight: 'bold', marginBottom: 12, fontFamily: 'monospace', letterSpacing: 3 },
  errorMsg: { fontSize: 14, color: '#ff6666', textAlign: 'center', fontFamily: 'monospace', lineHeight: 20 },
});
