import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Home from './page/Home';
import Shop from './page/Shop';
import Event from './page/Event';
import Orders from './page/Orders';
import Favorites from './page/Favorites';
import Inbox from './page/Inbox';
import Settings from './page/Settings';
import Login from './page/Login';
import LoginInput from './page/LoginInput';
import SplashScreen from './page/SplashScreen';
import ProductDetail from './page/ProductDetail';
import Bag from './page/Bag';
import Checkout from './page/Checkout';
import Search from './page/Search';
import ViewAllProducts from './page/ViewAll';
import InboxDetail from './page/InboxDetail';
import OrderDetails from './page/OrderDetails';
import { useFonts } from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UsernameContext';
import CustomDrawerContent from './CustomDrawerContent';
import { Feather } from '@expo/vector-icons';
import { OrdersProvider } from './context/OrderContext';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#F0F0F0',
        },
        headerRight: () => (
          <View className="flex-row mr-4">
            <TouchableOpacity
              className="mr-5"
              onPress={() => navigation.navigate('Search')}
            >
              <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Bag')}
            >
              <Feather name="shopping-bag" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ),
        drawerStyle: {
          width: '80%',
        },
      })}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Shop" component={Shop} />
      <Drawer.Screen name="Event" component={Event} options={{ title: 'Events' }} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Favorites" component={Favorites} />
      <Drawer.Screen name="Inbox" component={Inbox} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="LoginInput" component={LoginInput} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'MontserratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'MontserratRegular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'MontserratSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'MontserratThin': require('./assets/fonts/Montserrat-Thin.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Atau tampilkan loading screen
  }

  return (
    <UserProvider>
      <FavoritesProvider>
        <CartProvider>
          <OrdersProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Auth" component={AuthNavigator} />
                <Stack.Screen name="MainApp" component={DrawerNavigator} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
                <Stack.Screen name="Bag" component={Bag} />
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="ViewAllProducts" component={ViewAllProducts} />
                <Stack.Screen name="InboxDetail" component={InboxDetail} />
                <Stack.Screen name="OrderDetails" component={OrderDetails} />
              </Stack.Navigator>
            </NavigationContainer>
          </OrdersProvider>
        </CartProvider>
      </FavoritesProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});