import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { customHistory } from "../../app/layout/CustomBrowserRouter";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function RateProduct() {
  // const {
  //   user: { user },
  // }: { user: any } = useAppSelector((state) => state.account);
  const { user } = useAppSelector((state) => state.account);
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { control, register, handleSubmit } = useForm();

  async function handleSubmitData(data: FieldValues) {
    try {
      data.productId = parseInt(id!);
      data.user = user?.user;
      agent.Ratings.createRating(data);
      setOpen(false);
      customHistory.go(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ height: "55px" }}
        color="primary"
        size="large"
        variant="contained"
        fullWidth
      >
        Rate
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rate Product
          </Typography>
          <Typography
            component={"span"}
            variant={"body2"}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <>
              {user ? (
                <form onSubmit={handleSubmit(handleSubmitData)}>
                  <RadioGroup row aria-labelledby="rating" name="rating">
                    <FormControlLabel
                      {...register("rating")}
                      value="1"
                      control={<Radio />}
                      label="1"
                    />
                    <FormControlLabel
                      {...register("rating")}
                      value="2"
                      control={<Radio />}
                      label="2"
                    />
                    <FormControlLabel
                      {...register("rating")}
                      value="3"
                      control={<Radio />}
                      label="3"
                    />
                    <FormControlLabel
                      {...register("rating")}
                      value="4"
                      control={<Radio />}
                      label="4"
                    />
                    <FormControlLabel
                      {...register("rating")}
                      value="5"
                      control={<Radio />}
                      label="5"
                    />
                  </RadioGroup>
                  <AppTextInput
                    control={control}
                    multiline
                    rows={2}
                    name="comment"
                    label="Comment"
                  />
                  <Button type="submit">submit</Button>
                  <Button onClick={() => setOpen(false)}>Close</Button>
                </form>
              ) : (
                <>
                  <Typography>Please login first</Typography>
                  <Button onClick={() => setOpen(false)}>Close</Button>
                </>
              )}
            </>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
