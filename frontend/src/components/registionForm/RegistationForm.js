import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
  CardContent,
  Card,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  gender: yup.string().required("Gender is required"),
  marital_status: yup.string().required("Marital status is required"),
  dob: yup.date().required("Date of birth is required"),
  country: yup.string().required("Country is required"),
  State: yup.string().required("State is required"),
  District: yup.string().required("District is required"),
  pincode: yup
    .number()
    .typeError("Pincode must be a number")
    .required("Pincode is required"),
  address: yup.string().required("Address is required"),
  mobno: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required(),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function RegistrationForm() {
  const [userData, setUserData] = useState(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:4001/api/auth/register",
        data
      );

      setUserData(res.data.userData);
    } catch (err) {
      console.log("Error from api fails in catch =>", err.response.data);

      Swal.fire({
        title: "Basic Information Error!",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          <b>Basic-Info</b>
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            {[
              { name: "name", label: "Name" },
              { name: "username", label: "Username" },
              { name: "dob", label: "Date of Birth", type: "date" },
              { name: "pincode", label: "Pincode", type: "number" },
              { name: "address", label: "Address" },
              { name: "mobno", label: "Mobile Number" },
              { name: "email", label: "Email", type: "email" },
            ].map(({ name, label, type }) => (
              <Grid item xs={12} key={name}>
                <Controller
                  name={name}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={label}
                      type={type || "text"}
                      fullWidth
                      error={Boolean(errors[name])}
                      helperText={errors[name]?.message}
                      InputLabelProps={type === "date" ? { shrink: true } : {}}
                    />
                  )}
                />
              </Grid>
            ))}

            {[
              {
                name: "gender",
                label: "Gender",
                options: ["male", "female"],
              },
              {
                name: "marital_status",
                label: "Marital Status",
                options: ["single", "married"],
              },
              {
                name: "country",
                label: "Country",
                options: ["India", "Nepal"],
              },
              {
                name: "State",
                label: "State",
                options: ["Maharashtra", "Gujarat"],
              },
              {
                name: "District",
                label: "District",
                options: ["Thane", "Mumbai"],
              },
            ].map(({ name, label, options }) => (
              <Grid item xs={12} key={name}>
                <Controller
                  name={name}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label={label}
                      fullWidth
                      error={Boolean(errors[name])}
                      helperText={errors[name]?.message}
                    >
                      {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {userData && (
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Submitted User Data
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(userData).map(
              ([key, value]) =>
                key !== "__v" &&
                key !== "_id" && (
                  <Grid item xs={12} sm={6} key={key}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                          {key.replace(/_/g, " ").toUpperCase()}
                        </Typography>
                        <Typography variant="body1">
                          {key === "dob"
                            ? new Date(value).toLocaleDateString()
                            : value.toString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
            )}
          </Grid>
        </Paper>
      )}
    </Box>
  );
}
