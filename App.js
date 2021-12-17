/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import RNRestart from 'react-native-restart';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//Tab navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Ionicons Icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
let TempCount = 0;
let cartCounter = 0;

const App: () => Node = () => {
  let webView;

  const [currentUrl, setCurrentUrl] = useState(
    'https://xcpwaretail-development.mobify-storefront.com',
  );
  const [count, setCount] = useState(0);
  const [cartCount, setCartCount] = useState(TempCount);

  const setWebViewRef = ref => {
    webView = ref;
  };

  const {height, width} = Dimensions.get('window');

  const handleWebViewNavigationStateChange = newNavState => {
    //console.log('inside handleWebViewNavigationStateChange');
    const {url} = newNavState;
    //console.log(url);
    //return newNavState;
  };

  const onMessage = payload => {

    //console.log(payload.nativeEvent);
    let dataValue = payload.nativeEvent.data;

    if (dataValue.includes('haschanged')) {
      let hasChange = dataValue.replace('haschanged', '');
      if(hasChange !== cartCount) {
        cartCounter = hasChange;
        setCartCount(hasChange);
      }
      
    }
  };

  const customLoader = () => {
    return(
    <View
      style={{justifyContent: 'center', alignItems: 'center', height, width}}>
      <ActivityIndicator size="large" color="gray" />
    </View>
    )
  }

  const HomeScreen = ({navigation}) => {
    return (
      <WebView
        ref={setWebViewRef}
        source={{
          uri: 'https://xcpwaretail-development.mobify-storefront.com/en-US',
        }}
        startInLoadingState={true}
        renderLoading={customLoader}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={onMessage}
        //onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    );
  };

  const CartScreen = ({navigation}) => {
    return (
      <WebView
        source={{
          uri:
            'https://xcpwaretail-development.mobify-storefront.com/en-US/cart',
        }}
        ref={setWebViewRef}
        startInLoadingState={true}
        renderLoading={customLoader}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={onMessage}
        //onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    );
  };

  const ProfileScreen = ({navigation}) => {
    return (
      <WebView
        ref={setWebViewRef}
        source={{
          uri:
            'https://xcpwaretail-development.mobify-storefront.com/en-US/login',
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={customLoader}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        //onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    );
  };

  const SearchScreen = ({navigation}) => {
    return (
      <WebView
        ref={setWebViewRef}
        source={{
          uri:
            'https://xcpwaretail-development.mobify-storefront.com/en-US/searchmobile',
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={customLoader}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        //onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    );
  };

  const INJECTED_JAVASCRIPT = `
  let initialUrl = window.location.href;

  let checkUrlChange = () => {
    const currentUrl = window.location.href;
    const currentBasket = window.localStorage.getItem('basket-count');
    let countCart = document.getElementsByClassName("css-1384bg9")[0].innerText;
    /* if(currentUrl !== initialUrl){
      initialUrl = currentUrl;
      let basketCount = window.localStorage.getItem('basket-count');
      window.ReactNativeWebView.postMessage('haschanged'+basketCount);
    } */
    window.ReactNativeWebView.postMessage('haschanged'+currentBasket);
  }
  setInterval(checkUrlChange, 1000);`;



  //create your forceUpdate hook
  const useForceUpdate = () => {
    //console.log('UseForceUpdate');
    return () => setCount(count => count + 1, console.log('counter' + count)); // update the state to force render
  };

  return (
    <>
      {/* Global Navigation */}
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            //Hide tab header
            headerShown: false,

            //Icons for Global Navigation
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={30} color={'#181818'} />;
              } else if (route.name === 'Cart') {
                iconName = focused ? 'cart' : 'cart-outline';
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={30} color={'#181818'} />;
              } else if (route.name === 'Profile') {
                iconName = focused ? 'account-circle' : 'account-outline';
                // You can return any component that you like here!
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={30}
                    color={'#181818'}
                  />
                );
              } else if (route.name === 'Search') {
                iconName = focused ? 'search-circle' : 'search-outline';
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={30} color={'#181818'} />;
              } else {
                iconName = 'logo-react';
                return <Ionicons name={iconName} size={30} color={'#181818'} />;
              }
            },
            tabBarActiveTintColor: '#181818',
            tabBarInactiveTintColor: '#939393',
          })}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              unmountOnBlur: true,
            }}
            listeners={({navigation, route}) => ({
              tabPress: (e) => {
                  navigation.reset({
                    index: 0,
                    routes: [{
                       name: 'Home'
                    }]
                  })

                }
            })}
          />
          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
              tabBarBadge: cartCounter == 0 ? null : cartCounter,
              unmountOnBlur: true,
            }}
            listeners={({navigation, route}) => ({
              tabPress: (e) => {
                navigation.reset({
                  index: 0,
                  routes: [{
                     name: 'Cart'
                  }]
                })
                
              }
            })}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              unmountOnBlur: true,
            }}
            listeners={({navigation, route}) => ({
              tabPress: e => {
                //webView.reload()
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Profile',
                    },
                  ],
                });
              },
            })}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              unmountOnBlur: true,
            }}
            listeners={({navigation, route}) => ({
              tabPress: e => {
                //webView.reload()
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Search',
                    },
                  ],
                });
              },
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
