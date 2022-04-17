import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Card,
  Button,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
        titleTypographyProps={{
          sx: { fontweight: "bold", color: "primary.main" },
        }}
      />
      {/* <CardMedia
        component="img"
        sx={{
          height: 140,
          maxWidth: 80,
          backgroundsize: "contain",
        }}
        image={product.pictureUrl}
        alt={product.name}
      /> */}
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
        <Typography gutterBottom variant="h5" color="secondary">
          ${(product.price / 1).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.information1} - {product.information2}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status.includes("pendingAddItem" + product.id)}
          onClick={() =>
            dispatch(addBasketItemAsync({ productId: product.id }))
          }
          size="small"
        >
          Add to card
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
