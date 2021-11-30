/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


//Tab navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Ionicons Icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

function HomeScreen({ navigation }) {
  return (
    <WebView
      source={{ uri: 'https://xcpwaretail-development.mobify-storefront.com' }}
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator />}
    />
  );
}

function CartScreen({ navigation }) {
  return (
    <WebView
      source={{ uri: 'https://xcpwaretail-development.mobify-storefront.com/en-US/cart' }}
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator />}
    />
  );
}

function ProfileScreen({ navigation }) {
  return (
    <WebView
      source={{ uri: 'https://xcpwaretail-development.mobify-storefront.com/en-US/login' }}
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator />}
    />
  );
}

function SearchScreen({ navigation }) {
  return (
    <WebView
      source={{ uri: 'https://xcpwaretail-development.mobify-storefront.com/en-US/searchmobile' }}
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator />}
    />
  );
}

const Tab = createBottomTabNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      {/* Global Navigation */}
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={(
            { route }) => ({

              //Hide tab header 
              headerShown: false,

              //Icons for Global Navigation
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused
                    ? 'home'
                    : 'home-outline';
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={30} color={'#181818'} />;

                } else if (route.name === 'Cart') {
                  iconName = focused ? 'cart' : 'cart-outline';
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={30} color={'#181818'} />;

                }
                else if (route.name === 'My Account') {
                  iconName = focused ? 'account-circle' : 'account-outline';
                  // You can return any component that you like here!
                  return <MaterialCommunityIcons name={iconName} size={30} color={'#181818'} />;

                }
                else if (route.name === 'Search') {
                  iconName = focused ? 'search-circle' : 'search-outline';
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={30} color={'#181818'} />;

                }
                else {
                  iconName = 'logo-react'
                  return <Ionicons name={iconName} size={30} color={'#181818'} />;
                }


              },
              tabBarActiveTintColor: '#181818',
              tabBarInactiveTintColor: '#939393',
            })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
          />

          <Tab.Screen
            name="Cart"
            component={CartScreen}
          />
          <Tab.Screen
            name="My Account"
            component={ProfileScreen}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
