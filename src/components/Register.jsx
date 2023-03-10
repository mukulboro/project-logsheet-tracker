import { React, useState, useEffect } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { firebaseApp, db, getMatchingData } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [isCodeValid, setIsCodeValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let formData = {
      email: data.get("email"),
      password: data.get("password"),
      fullName: data.get("name"),
      inviteCode: data.get("code"),
    };

    const q = query(
      collection(db, "inviteCodes"),
      where("code", "==", formData.inviteCode)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let res = doc.data();
      setIsCodeValid(res.isValid);
    });


    if (isCodeValid) {
      const authentication = getAuth();
      createUserWithEmailAndPassword(
        authentication,
        formData.email,
        formData.password
      )
        .then(response => toast.success("User Created", {theme: "dark"}))
        .catch(error => toast.error(error.message, {theme: "dark"}));
    } else {
      toast.error("Invalid Invitation Code", {theme: "dark"});
    }
  };


  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "primary.main",
        padding: "10%",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "primary.light",
          padding: "5%",
          paddingTop: "1%",
        }}
      >
        <Typography variant="h3" align="center" sx={{ marginBottom: "5%" }}>
          Register
        </Typography>
        <Box>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="firstName"
                    label="Full Name"
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="inviteCode"
                    name="code"
                    label="Invitation Code"
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    color="secondary"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    color="secondary"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Card>
      <ToastContainer />
    </Box>
  );
};

export default Register;
