import { StyleSheet, Dimensions, StatusBar } from "react-native";
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "space-between",
  },
  btnOTP: {
    height: 50,
    width: width - 40,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  mobin: {
    alignItems: "center",
  },
  instructions: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  textInputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  roundedTextInput: {
    height: 40,
    width: 40,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  termsCondition: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center"
  },
  orLine: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    width: width / 2.6,
    alignSelf: "center",
  },
  orText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  skip: {
    alignSelf: "flex-end",
    backgroundColor: "#FFF",
    justifyContent: "center",
    paddingHorizontal: 8,
    height: 24,
    width: 60,
    borderRadius: 15,
  },
  skipText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  social: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallButton: {
    backgroundColor: "white",
    height: 50,
    flexDirection: "row",
    width: width / 2 - 26,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5,
  },
  scrollcontainer: {
    width: width,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginHorizontal: 8
  },
  lightText: {
    textAlign: 'justify',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 16
  },
  profilepic: {
    height: width / 3.8,
    width: width / 3.8,
    borderRadius: width / 7.6,
    borderWidth: 0.2,
    margin: 4,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileimg: {
    height: width / 4,
    width: width / 4,
    borderRadius: width / 8,
  },
  imagePicker: {
    position: 'relative',
    right: 0,
    top: -40,
    backgroundColor: '#fff',
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: '#CCC',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    width: width - 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    height: 40,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 40,
    paddingHorizontal: 6,
    alignItems: 'baseline',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 4,
  },
  label: {
    marginTop: 6,
    marginBottom: 2,
    fontWeight: 'bold',
    fontSize: 16,
  },
  formContainer: {
    padding: 10,
  },
  materialMapView: {
    height: width / 1.4,
    backgroundColor: "#ffffff"
  },
  mapBackPosition: {
    position: 'absolute',
    left: 10,
    top: 40,
  },
  pinMsg: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  pinMsgView: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgba(100,100,100,0.5)',
    paddingHorizontal: 20,
    width: 296,
    padding: 10,
  },
  pinInputAreaStyle: {
    marginBottom: 24,
    backgroundColor: 'rgba(100,100,100,0.5)',
    paddingHorizontal: 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 10,
  },
  forgot_button: {
    color: '#FFF',
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  pinInputViewEmptyStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FBECEC',
  }
});
