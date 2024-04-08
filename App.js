import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

export default function App() {
  const [countryData, setCountryData] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [guess, setGuess] = useState("");
  const [trueCount, setTrueCount] = useState(0);
  const [falseCount, setfalseCount] = useState(5);

  const fetchRandomCountry = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomCountry = data[randomIndex];
      setCountryData(randomCountry);
      setCountryName(randomCountry.name.common);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    fetchRandomCountry();
  }, []);

  const showAlert = (status, message) => {
    Alert.alert(
      status,
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const checkGuess = () => {

    if (guess.toLowerCase() === countryName.toLowerCase()) {
      console.log("Doğru Tahmin");
      console.log(countryName);
      setTrueCount(trueCount + 1);
      showAlert("Başarılı!", "Tebrikler. Tahmininiz doğruydu");
      fetchRandomCountry();
    } 
    
    else {
      console.log("Yanlış tahmin.");
      console.log(countryName);
      showAlert("Hata!", "Tekrar Deneyin..");
      setfalseCount(falseCount - 1);

      
    }
  
    
    console.log("Tahmin:" + guess);
  };
  if (falseCount <= 0) {
    showAlert("Bitti!", "Oyunu Kaybettiniz.");
  }

  return (
    <View className=" flex-1 items-center justify-center ">
      <View>
        <Text className="mb-5"> Doğru Tahmn Sayısı:{trueCount}</Text>
        <Text className="mb-5 text-center"> Hak:{falseCount}</Text>
      </View>
      {countryData && (
        <View className="border-gray-300 border rounded-lg flex mb-5 relative h-52 w-72">
          <Image
            className="   rounded-lg object-cover object-center w-full h-full"
            source={{ uri: countryData.flags.png }}
          />
        </View>
      )}
      <TextInput
        style={{ width: "60%" }}
        placeholder="Enter your guess..."
        value={guess}
        onChangeText={(text) => setGuess(text)}
        className="text-center bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-xs p-1 rounded-lg"
      ></TextInput>

      <TouchableOpacity
        disabled={falseCount <= 0}
        style={{ opacity: falseCount <= 0 ? 0.5 : 1, width: "60%" }}
        className="rounded-lg space-y-4 items-center mb-5"
        onPress={checkGuess}
      >
        <Text
          style={{ width: "100%" }}
          className="rounded-3xl text-lg text-center p-2  text-white bg-green-500"
        >
          Guess
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={falseCount <= 0}
        style={{ opacity: falseCount <= 0 ? 0.5 : 1, width: "60%" }}
        className="rounded-lg space-y-4 items-center"
        
        onPress={fetchRandomCountry}
      >
        <Text
          style={{ width: "40%" }}
          className="rounded-3xl text-sm text-center p-2  text-white bg-red-600"
        >
          Change
        </Text>
      </TouchableOpacity>
    </View>
  );
}
