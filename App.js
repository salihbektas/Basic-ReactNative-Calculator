import React, { useRef, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform
} from "react-native"

const App = () => {
  const [result, setResult] = useState("")
  const [prev, setPrev] = useState(0)
  const [history, setHistory] = useState([])
  const [operation, setOperation] = useState("")
  const [reset, setReset] = useState(true)
  const ref = useRef()

  function handleComma() {
    if (result === "") setResult("0,")
    else if (!result.includes(",")) setResult(result + ",")
  }

  function handleEaqual() {
    if (operation === "") return

    let current
    let res

    if (result === "") {
      return
    }

    current = parseFloat(result.replace(",", "."))

    if (operation === "+") {
      res = prev + current
    }

    if (operation === "-") {
      res = prev - current
    }

    if (operation === "x") {
      res = prev * current
    }

    if (operation === "/") {
      res = prev / current
    }

    setResult(String(res).replace(".", ","))
    setPrev(res)
    let tempHistory = history
    tempHistory[0] = `${prev} ${operation} ${current} = ${res}`
    setHistory(tempHistory)
    setOperation("")
    setReset(true)

    return res
  }

  function handleOperation(operator) {
    if (result === "") return

    let tempHistory = [...history]

    if (operation !== "") {
      let val = handleEaqual()
      setHistory((currentHistory) => [`${val} ${operator} `, ...currentHistory])
      setReset(false)
    } else if (!reset) {
      tempHistory[0] += ` ${operator} `
      setHistory(tempHistory)
      setPrev(parseFloat(result.replace(",", ".")))
    } else {
      setHistory((currentHistory) => [
        `${result} ${operator} `,
        ...currentHistory
      ])
      setReset(false)
    }
    setResult("")
    setOperation(operator)
  }

  function handleAC() {
    setOperation("")
    setPrev(0)
    setResult("")
    setReset(true)
    setHistory([])
  }

  function handleDigit(digit) {
    let tempHistory = [...history]

    if (reset) {
      setReset(false)
      tempHistory = [String(digit), ...tempHistory]
      setResult(digit)
    } else {
      tempHistory[0] += digit
      setResult(result + digit)
    }
    setHistory(tempHistory)
  }

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerText}>Calculator</Text>
      </View>

      <View style={styles.results}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          ref={ref}
          onContentSizeChange={() =>
            ref.current.scrollToEnd({ animated: false })
          }
        >
          {history.map((value, index) => (
            <Text style={{ fontSize: 22, color: "white" }} key={index}>
              {value}
            </Text>
          ))}
        </ScrollView>

        <Text style={styles.resultText}>{result === "" ? "0" : result}</Text>
      </View>

      <View style={styles.buttonSide}>
        <TouchableOpacity
          onPress={() => handleOperation("+")}
          style={{ ...styles.button, ...styles.operationButton }}
        >
          <Text style={{ ...styles.buttonText, color: "black" }}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleOperation("-")}
          style={{ ...styles.button, ...styles.operationButton }}
        >
          <Text style={{ ...styles.buttonText, color: "black" }}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleOperation("x")}
          style={{ ...styles.button, ...styles.operationButton }}
        >
          <Text style={{ ...styles.buttonText, color: "black" }}>x</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleOperation("/")}
          style={{ ...styles.button, ...styles.operationButton }}
        >
          <Text style={{ ...styles.buttonText, color: "black" }}>/</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDigit("7")}
          style={{ ...styles.button, ...styles.numberButton }}
        >
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDigit("8")}
          style={{ ...styles.button, ...styles.numberButton }}
        >
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDigit("9")}
          style={{ ...styles.button, ...styles.numberButton }}
        >
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            result.length >= 0 ? setResult(result.slice(0, -1)) : null
          }}
          style={{ ...styles.button }}
        >
          <Text style={styles.buttonText}>DEL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDigit("4")}
          style={{ ...styles.button, ...styles.numberButton }}
        >
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDigit("5")}
          style={{ ...styles.button, ...styles.numberButton }}
        >
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDigit("6")}
          style={{ ...styles.button, ...styles.numberButton }}
        >
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAC} style={{ ...styles.button }}>
          <Text style={styles.buttonText}>AC</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDigit("1")}
          style={{ ...styles.button, ...styles.numberButton }}
        >
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDigit("2")}
          style={{ ...styles.button, ...styles.numberButton }}
        >
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDigit("3")}
          style={{ ...styles.button, ...styles.numberButton }}
        >
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleComma} style={{ ...styles.button }}>
          <Text style={styles.buttonText}>,</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            result !== "" ? setResult(result + "0") : null
          }}
          style={{ ...styles.button, ...styles.numberButton, width: "44%" }}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleEaqual}
          style={{ ...styles.button, width: "44%" }}
        >
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const windowHeight = Dimensions.get("window").height

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#202020"
  },

  header: {
    flex: 1,
    marginTop: Platform.OS === "android" ? -StatusBar.currentHeight : 0,
    backgroundColor: "#333333",
    justifyContent: "flex-end",
    paddingLeft: 12
  },

  headerText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold"
  },

  results: {
    flex: 4,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 12
  },

  scroll: {
    flexGrow: 1,
    flexDirection: "column-reverse",
    alignItems: "flex-end"
  },

  resultText: {
    color: "white",
    fontSize: 48,
    fontWeight: "600"
  },

  buttonSide: {
    flex: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: windowHeight / 30
  },

  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },

  button: {
    height: windowHeight / 12,
    width: "20%",
    borderRadius: windowHeight / 30,
    marginLeft: "4%",
    marginTop: windowHeight / 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f09a36"
  },

  operationButton: {
    backgroundColor: "#a6a6a6"
  },

  numberButton: {
    backgroundColor: "#333333"
  },

  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  }
})

export default App
