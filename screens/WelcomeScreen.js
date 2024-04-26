import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../store/auth-context";
import { useContext, useEffect, useState } from "react";
function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");
   const authCtx= useContext(AuthContext);
   const token=authCtx.token;
  useEffect(() => {
    axios
      .get(
        "https://expense-tracker-50956-default-rtdb.firebaseio.com/message.json?auth="+
     token )
      .then((response) => {
        console.log(response.data);
        setFetchedMessage(response.data)
      });
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Screen</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}
export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
