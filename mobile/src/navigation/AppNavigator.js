import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fontSize, spacing } from '../theme/colors';

import HomeScreen from '../screens/HomeScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import ReadinessScreen from '../screens/ReadinessScreen';
import TimerScreen from '../screens/TimerScreen';
import HistoryScreen from '../screens/HistoryScreen';
import RankScreen from '../screens/RankScreen';
import SkillTreeScreen from '../screens/SkillTreeScreen';
import WarmupScreen from '../screens/WarmupScreen';
import QuickLogScreen from '../screens/QuickLogScreen';
import PlannerScreen from '../screens/PlannerScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabIcons = {
  Home: '🏠', Exercises: '🏋', Readiness: '🪖',
  Timer: '⏱', History: '📊',
};

function TabIcon({ name, focused }) {
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.tabEmoji, focused && styles.tabEmojiActive]}>
        {tabIcons[name] || '•'}
      </Text>
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarLabel: ({ focused }) => (
          <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
            {route.name.toUpperCase()}
          </Text>
        ),
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textMuted,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Exercises" component={ExercisesScreen} />
      <Tab.Screen name="Readiness" component={ReadinessScreen} />
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Rank" component={RankScreen} />
        <Stack.Screen name="SkillTree" component={SkillTreeScreen} />
        <Stack.Screen name="Warmup" component={WarmupScreen} />
        <Stack.Screen name="QuickLog" component={QuickLogScreen} />
        <Stack.Screen name="Planner" component={PlannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1a1a1a',
    borderTopColor: '#222',
    borderTopWidth: 1,
    height: 65,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabIcon: { alignItems: 'center', justifyContent: 'center' },
  tabEmoji: { fontSize: 22, opacity: 0.5 },
  tabEmojiActive: { opacity: 1 },
  tabLabel: { fontSize: 10, color: '#666', letterSpacing: 2, fontFamily: 'monospace' },
  tabLabelActive: { color: '#d4a843' },
});
