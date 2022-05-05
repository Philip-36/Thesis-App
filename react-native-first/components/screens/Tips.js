import * as React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';

const Tips = () => {

  return (
<SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>    
        <Text style={styles.textTitle}>Water Temperature </Text>
        <Text style={styles.textBody}>1. Tilapia prefer temperatures ranging from 18°C to 29°C.</Text>
        <Text style={styles.textBody}>2. Tilapia prefer temperatures of 27–29°C for maximum growth.</Text>
        <Text style={styles.textBody}>3. If water temperature is above or below prefer temperature then the application will provide a warning notification</Text>
        <Text style={styles.textBody}>4. Sudden changes of water temperature might cause fungus/bacteria to tilapias</Text>

        <Text style={styles.textTitle}>Water pH Level </Text>
        <Text style={styles.textBody}>1. Tilapia prefer pH level ranging from 5 to 10.</Text>
        <Text style={styles.textBody}>2. If water pH level is above or below prefer ph Level then the application will a warning provide notification</Text>
        <Text style={styles.textBody}>3. The pH scale ranges from 0 to 14, with 7 being neutral. pHs less than 7 are acidic while pHs greater than 7 are alkaline</Text>
        <Text style={styles.textBody}>4. Use Baking Soda to raise the pH level of the water. Add one teaspoon of baking soda to every 8 gallons of water. Dissolve it in water in a bucket first. It is better for your tilapias if it is diluted in this way first. Once mixed, add it to the pond, allow some time for it to be pumped around the pond and mixed with the existing water</Text>
        <Text style={styles.textBody}>5. Use Vinegar to lower pH Level of the water. Measure a quarter of a cup of vinegar for every 500 gallons of water and mix it in a bucket of water before adding to the pond. The acid neutralizes the alkalinity to create a neutral environment that best suits your tilapias.</Text>

        <Text style={styles.textTitle}>Water Clarity</Text>
        <Text style={styles.textBody}>1. Turbidity sensor is determining the amount of light passing through the water.</Text>
        <Text style={styles.textBody}>2. Turbidity sensor will provide an output whether the water is clear, cloudy, dirty.</Text>
        <Text style={styles.textBody}>4. Clear water will provide the best performance in detecting tilapia with fungus/bacteria.</Text>
        <Text style={styles.textBody}>5. Cloudy water will provide the low performance in detecting tilapia with fungus/bacteria.</Text>
        <Text style={styles.textBody}>6. Dirty water will provide the lowest performance in detecting tilapia with fungus/bacteria.</Text>

        <Text style={styles.textTitle}>Hardware Model Tips</Text>
        <Text style={styles.textBody}>1. Electronic components are not waterproof.</Text>
        <Text style={styles.textBody}>2. Don't use the machine when its raining or dark outside.</Text>
        <Text style={styles.textBody}>3. The cage is build up with stainless steel. Stainless steels corrode when exposed to damaging chemicals, saline, grease, moisture, or heat for prolonged periods of time. </Text>
        <Text style={styles.textBody}>4. When cage get rust or corrode use this method which only uses baking soda and two cups of water. Create a paste which is thick enough to be spread over each of the oxidation spots on your stainless steel, and then rub the paste over the surface in the direction of the metal grain, using a clean cloth. Then you can simply use a damp paper towel to rinse off the surface and wipe away all the build-up.</Text>
        <Text style={styles.textBody}>5. Use sandpaper to remove rust. The heavier the rust, the coarser the sandpaper you use will need to be. Choose sandpaper or sander in the 50-grit range to remove heavy rust.</Text>
    </ScrollView>
</SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 15
    },
    textBody: {
        fontSize: 15
      },scrollView: {
        paddingHorizontal: 20,
      },

});


export default Tips;