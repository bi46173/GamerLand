import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, Typography, Grid } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import AppSelectList from "../../app/components/AppSelectList";
import AppTextInput from "../../app/components/AppTextInput";
import { customHistory } from "../../app/layout/CustomBrowserRouter";
import { validationSchema } from "./supportValidation";

export default function CreateTicket() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  async function handleSubmitData(data: FieldValues) {
    try {
      agent.Support.openTicket(data);
      toast.success("ticket created");
      customHistory.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Open Ticket
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="subject" label="Subject" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              control={control}
              name="urgency"
              label="Urgency"
              items={["Low", "Medium", "High"]}
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              control={control}
              name="problem"
              label="Issue"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="success"
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
