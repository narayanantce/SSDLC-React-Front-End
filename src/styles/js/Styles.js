import { StyleSheet } from "aphrodite";

const Styles = StyleSheet.create({
  Panel: {
    width: "450px",
    margin: "50px auto",
    "@media only screen and (max-width : 768px)": {
      width: "95%",
      marginBottom: "25px"
    },
    boxShadow: "0 0 15px 5px #cccccc",
    padding: "15px 25px",
    fontFamily: "Raleway, sans-serif",
    color: "#672B8B",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column"
  },

  Panel2: {
    width: "900px",
    margin: "50px auto",
    "@media only screen and (max-width : 768px)": {
      width: "95%",
      marginBottom: "25px"
    },
    padding: "15px 25px",
    fontFamily: "Raleway, sans-serif",
    color: "#672B8B",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column"
  },

  white: {
    backgroundColor: "white"
  },

  formError: {
    color: "red",
    fontWeight: "bold"
  },

  input: {
    padding: "5px",
    marginBottom: "10px",
    width: "100%",
    border: "0px",
    borderBottom: "2px solid lightgrey",
    backgroundColor: "inherit",
    textAlign: "left",
    ":focus": {
      borderBottom: "2px solid #01BfB3",
      outline: "none"
    },
    color: "#000000"
  },

  button: {
    height: "30px",
    width: "60%",
    position: "relative",
    backgroundColor: "#01BFB3",
    color: "#ffffff !important",
    border: "0px",
    borderRadius: "5px",
    fontFamily: "Raleway,sans-serif",
    outline: "none",
    ":hover": {
      outline: "none",
      backgroundColor: "#01b2a6",
      textDecoration: "none"
    }
  },

  form: {
    padding: "15px",
    margin: "15px auto"
  },

  forgotPassword: {
    color: "#672B8B !important",
    display: "inline-block",
    position: "relative",
    float: "left",
    left: "10px",
    top: "-20px"
  },

  buttonMarginRight: {
    marginLeft: "680px"
  }
});

export { Styles };
