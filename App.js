import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';



const App = () =>  {
  const [result, setResult] = useState("");
  const [prev, setPrev] = useState(0);
  const [history, setHistory] = useState([]);
  const [operation, setOperation] = useState("");
  const [reset, setReset] = useState(false);
  const [ref, setRef] = useState();
  


  function handleComma(){

    if(result === "")
      setResult('0,');
    else if(!result.includes(","))
      setResult(result + ',');

  }

  function handleEaqual(){
    setReset(true);
    
    let current;
    let res;
    console.log(history);

    console.log("prev : " + prev);
    
    console.log("operation : " + operation);

    console.log("result : " + result);
    if(result !== 0){
      current = parseFloat(result.replace(",", "."));
    }
    console.log("current : " + current);
    if(operation === "+"){
      res = prev + current;
    }

    if(operation === "-"){
      res = prev - current;
    }

    if(operation === "x"){
      res = prev * current;
    }

    if(operation === "/"){
      res = prev / current;
    }

    setResult(String(res).replace(".", ","));
    setPrev(prev + current);
    setHistory([`${prev} ${operation} ${current} = ${res}`, ...history]);
    setOperation("");
  }

  function handleOperation(operator){
    setOperation(operator);
    setReset(true);
    if(operation !== "")
      handleEaqual();
    else{
      setPrev(parseFloat(result.replace(",", ".")));
      setResult("");
    }
  }

  function handleCE(){
    setOperation("");
    setPrev(0);
    setResult("");
    setReset(false);
    setHistory([]);
  }

  function handleDigit(digit){
    if(reset){
      setReset(false);
      setResult(digit);
    }
    else
      setResult(result + digit);
  }


  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerText}>Calculator</Text>
      </View>

      <View style={styles.results}>
        <ScrollView contentContainerStyle={styles.scroll}
                    ref={scroll => setRef(scroll)}
                    onContentSizeChange={()=>ref.scrollToEnd({animated: false})}>
          {
            history.map((value) =>(
              <Text style={{fontSize:22, color: "white"}}>{value}</Text>
            ))
            
          }
        </ScrollView>

        <Text style={styles.resultText}>{result === "" ? "0" : result}</Text>
      </View>

      <View style={styles.buttonSide}>

        <TouchableOpacity onPress={() => handleOperation("+")} style={{...styles.button, ...styles.operationButton}}>
          <Text style={{...styles.buttonText, color:"black"}}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleOperation("-")} style={{...styles.button, ...styles.operationButton}}>
          <Text style={{...styles.buttonText, color:"black"}}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleOperation("x")} style={{...styles.button, ...styles.operationButton}}>
          <Text style={{...styles.buttonText, color:"black"}}>x</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleOperation("/")} style={{...styles.button, ...styles.operationButton}}>
          <Text style={{...styles.buttonText, color:"black"}}>/</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=> handleDigit("7")} style={{...styles.button, ...styles.numberButton}}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> handleDigit("8")} style={{...styles.button, ...styles.numberButton}}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> handleDigit("9")} style={{...styles.button, ...styles.numberButton}}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> {result.length >= 0 ? setResult(result.slice(0,-1)) : null}} style={{...styles.button}}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=> handleDigit("4")} style={{...styles.button, ...styles.numberButton}}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> handleDigit("5")} style={{...styles.button, ...styles.numberButton}}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> handleDigit("6")} style={{...styles.button, ...styles.numberButton}}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCE} style={{...styles.button}}>
          <Text style={styles.buttonText}>CE</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=> handleDigit("1")} style={{...styles.button, ...styles.numberButton}}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> handleDigit("2")} style={{...styles.button, ...styles.numberButton}}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> handleDigit("3")} style={{...styles.button, ...styles.numberButton}}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleComma} style={{...styles.button}}>
          <Text style={styles.buttonText}>,</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> {result !== "" ? setResult(result + '0') : null}} style={{...styles.button, ...styles.numberButton, width:"44%"}}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEaqual} style={{...styles.button, width:"44%"}}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  
  main: {
    flex: 1,
    backgroundColor: "#202020",
  },
  
  header: {
    flex: 1,
    marginTop: -StatusBar.currentHeight,
    backgroundColor: "#333333",
    justifyContent: "flex-end",
    paddingLeft:12,
  },

  headerText:{
    color: "white",
    fontSize: 28,
    fontWeight: "bold"
  },

  results: {
    flex: 4,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 12,
  },

  scroll:{
    flexGrow:1,
    flexDirection: "column-reverse",
    alignItems: "flex-end",
  },

  resultText:{
    color: "white",
    fontSize: 48,
    fontWeight: "600"
  },

  buttonSide: {
    flex: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  row: {
    flex: 1,
    flexDirection:"row",
    justifyContent:"space-evenly",
  },

  button:{
    height: windowHeight/12,
    width: "20%",
    borderRadius:windowHeight/30,
    marginLeft:"4%",
    marginTop: windowHeight/60,
    justifyContent: "center",
    alignItems:"center",
    backgroundColor:"#f09a36",
  },

  operationButton:{
    backgroundColor:"#a6a6a6",
  },

  numberButton:{
    backgroundColor:"#333333",
  },

  buttonText: {
    fontSize:24,
    fontWeight:"bold",
    color: "white",
  }

});

export default App;