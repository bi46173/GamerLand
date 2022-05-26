import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Typography, Grid, Card, Divider, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import AppTextInput from "../../app/components/AppTextInput";
import { validationSchema } from "./changePasswordValidation";

export default function ChangePassword() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema[0]),
  });
  const {
    control: control1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    formState: { isSubmitting: isSubmitting1 },
  } = useForm({
    resolver: yupResolver(validationSchema[1]),
  });

  const [phoneNumber, setPhoneNumber] = useState(0);

  useEffect(() => {
    agent.Account.getPhoneNumber()
      .then((response) => setPhoneNumber(response))
      .catch((error) => console.log(error));
  }, []);

  async function handleSubmitData(data: FieldValues) {
    try {
      agent.Account.changePassword(data);
      toast.success("Password successfully changed!");
      reset();
    } catch (error) {
      console.log(error);
    }
  }
  async function handlePhoneSubmitData(data: FieldValues) {
    try {
      const { phoneNumber } = data;
      agent.Account.updatePhoneNumber(phoneNumber);
      toast.success("Phone number successfully changed!");
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid container>
      <Grid item xs={5} sx={{ mb: 5, mr: 1 }}>
        <Card sx={{ p: 1 }}>
          <Typography variant="h5">Change Password</Typography>
          <Divider sx={{ mb: 2 }}></Divider>
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AppTextInput
                  control={control}
                  name="oldPassword"
                  type="password"
                  label="Current Password"
                />
              </Grid>
              <Grid item xs={12}>
                <AppTextInput
                  control={control}
                  name="newPassword"
                  type="password"
                  label="New Password"
                />
              </Grid>
              <Grid item xs={12}>
                <AppTextInput
                  control={control}
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </LoadingButton>
            </Box>
          </form>
        </Card>
      </Grid>
      <Grid item xs={5} sx={{ mb: 5 }}>
        <Card sx={{ p: 1 }}>
          <Typography variant="h5">Change Phone Number</Typography>
          <Divider sx={{ mb: 2 }}></Divider>
          <Typography variant="subtitle1">
            {!!phoneNumber ? (
              <>Your phone number is: {phoneNumber}</>
            ) : (
              <>Add a phone number</>
            )}
          </Typography>
          <Divider sx={{ mb: 2 }}></Divider>
          <form onSubmit={handleSubmit1(handlePhoneSubmitData)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AppTextInput
                  control={control1}
                  name="phoneNumber"
                  type="text"
                  label="Phone Number"
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
              <LoadingButton
                loading={isSubmitting1}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </LoadingButton>
            </Box>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
