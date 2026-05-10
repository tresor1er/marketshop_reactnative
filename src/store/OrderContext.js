import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const loadOrders = async () => {
    try {
      const storedOrders = await AsyncStorage.getItem('@orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (e) {
      console.error(e);
    }
  };

  const saveOrders = async (items) => {
    try {
      await AsyncStorage.setItem('@orders', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const addOrder = (order) => {
    setOrders(prev => [{ ...order, id: Date.now() }, ...prev]);
  };

  const clearOrders = async () => {
    setOrders([]);
    await AsyncStorage.removeItem('@orders');
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
