import {
  Avatar,
  Card,
  Button,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import StarRateIcon from "@mui/icons-material/StarRate";
import ReviewedProductType from "../../app/models/ReviewedProduct";

interface Props {
  product: ReviewedProductType;
}
export default function ReviewedProduct({ product }: Props) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
        titleTypographyProps={{
          sx: { fontweight: "bold", color: "primary.main" },
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 125,
            width: 100,
            maxHeight: { xs: 180, md: 150 },
            maxWidth: { xs: 250, md: 200 },
          }}
          alt={product.name}
          src={product.pictureUrl}
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" sx={{ color: "#1976d2" }}>
          ${(product.price / 1).toFixed(2)}
        </Typography>

        {product.reviewsNumber !== 0 ? (
          <>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <StarRateIcon color="warning" fontSize="small" />
              </Grid>
              <Grid item>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ color: "#ed6c02" }}
                >
                  An average of ({product.reviewsAverage.toString().slice(0, 4)}
                  ) on {product.reviewsNumber} reviews
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography gutterBottom variant="caption" sx={{ color: "#ed6c02" }}>
            No reviews yet...
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
