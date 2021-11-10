import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  body: {
    margin: 0,
    padding: 0,
    background: "#E8F8F5",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cartContainer: {
    width: "70%",
    height: "auto%",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0px 25px 20px #A2D9CE",
    paddingBottom: "50px",
  },
  header: {
    margin: "auto",
    width: "90%",
    height: "15%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: "25px",
    color: "black",
  },
  action: {
    fontSize: "14px",
    color: "red",
    cursor: "pointer",
    borderBottom: "1px solid #E44C4C",
  },
  cartItems: {
    margin: "20px",
    width: "90%",
    height: "30%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // about: {
  //     height: '100%',
  //     alignItems: 'left'
  // },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "purple",
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "blue",
  },
  btn: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#d9d9d9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
    color: "#202020",
    cursor: "pointer",
  },
  counter: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
  },
  prices: {
    padding: "30px",
  },
  count: {
    padding: "10px",
  },
});

export default useStyles;
