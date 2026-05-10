import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider, ThemeContext } from './src/store/ThemeContext';
import { CartProvider } from './src/store/CartContext';
import { OrderProvider } from './src/store/OrderContext';

import CatalogScreen from './src/screens/CatalogScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CatalogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Catalogue' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Détail Produit' }} />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Panier' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Commande' }} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="CatalogueTab" component={CatalogStack} options={{ tabBarLabel: 'Catalogue' }} />
      <Tab.Screen name="CartTab" component={CartStack} options={{ tabBarLabel: 'Panier' }} />
      <Tab.Screen name="HistoryTab" component={HistoryScreen} options={{ tabBarLabel: 'Historique', headerShown: true, title: 'Historique des commandes' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profil', headerShown: true, title: 'Profil' }} />
    </Tab.Navigator>
  );
}

function MainApp() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <MainTabs />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <OrderProvider>
          <MainApp />
        </OrderProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
