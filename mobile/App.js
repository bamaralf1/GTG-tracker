import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
    ShareTechMono_400Regular,
  });

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
});
