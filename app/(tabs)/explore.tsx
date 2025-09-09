import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ExploreScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle}>
        Discover new content, tips, and resources for your journey!
      </Text>
      {/* Add your explore content here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default ExploreScreen;