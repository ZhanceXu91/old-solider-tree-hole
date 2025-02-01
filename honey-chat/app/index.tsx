import React, { useState } from "react";
import { Text, View, FlatList, Button, StyleSheet, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Typography, Colors, Spacings} from 'react-native-ui-lib';


Colors.loadColors({
  pink: '#FF69B4',
  gold: '#FFD700',
});

Typography.loadTypographies({
  h1: {fontSize: 58, fontWeight: '300', lineHeight: 80},
  h2: {fontSize: 46, fontWeight: '300', lineHeight: 64},
});

const isSmallScreen = false; // Define the variable based on your screen size logic

Spacings.loadSpacings({
  page: isSmallScreen ? 16 : 20
});

const items = [
  { id: "1", name: "Item 1", price: "$10" },
  { id: "2", name: "Item 2", price: "$20" },
  { id: "3", name: "Item 3", price: "$30" },
];

const renderItem = ({ item }: { item: { id: string; name: string; price: string } }) => (
  <View style={styles.item}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.price}>{item.price}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    width: '100%',
  },
  banner: {
    width: '100%',
    height: 100,
    backgroundColor: '#f8d7da',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 20,
    color: '#721c24',
  },
});

function OrdersScreen() {
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = items.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredItems(newData);
    } else {
      setFilteredItems(items);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={handleSearch}
      />
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Special Offer!</Text>
      </View>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button title="Place Order" onPress={() => alert("Order placed!")} />  
    </View>
  );
}

function MomentsScreen() {
  return (
    <View style={styles.container}>
      <Text>Moments Screen</Text>
    </View>
  );
}

function PersonalScreen() {
  return (
    <View style={styles.container}>
      <Text>Personal Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Orders') {
              iconName = 'ios-list';
            } else if (route.name === 'Moments') {
              iconName = 'ios-time';
            } else if (route.name === 'Personal') {
              iconName = 'ios-person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Moments" component={MomentsScreen} />
        <Tab.Screen name="Personal" component={PersonalScreen} />
      </Tab.Navigator>
  );
}