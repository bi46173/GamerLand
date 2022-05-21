import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";
import ProductRatings from "./ProductRatings";
import RateProduct from "./RateProduct";

export default function ProductDeatils() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id!)
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const [quantity, setQuantity] = useState(0);
  const [ratings, setRatings] = useState<any[]>([]);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product) dispatch(fetchProductAsync(parseInt(id!)));

    agent.Ratings.listRatings(parseInt(id!))
      .then((response) => setRatings(response))
      .catch((error) => console.log(error));
  }, [id, item, dispatch, product]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  const getAverageRating = () => {
    let sum = 0;
    let average = 0;
    for (let i = 0; i < ratings.length; i++) {
      sum += ratings[i].rating;
    }
    average = sum / ratings.length;
    return average.toString().slice(0, 4);
  };

  if (productStatus.includes("pending"))
    return <LoadingComponent message="Loading product..."></LoadingComponent>;

  if (!product) return <NotFound />;

  return (
    <Grid container>
      <Grid item xs={2} sx={{ mr: 2 }}>
        <Card sx={{ p: 1 }}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{
              maxWidth: "100%",
            }}
          />
        </Card>
      </Grid>
      <Grid item xs={5} sx={{ mb: 5 }}>
        <Card sx={{ p: 1 }}>
          <Typography variant="h5">{product.name}</Typography>
          <Divider sx={{ mb: 2 }}></Divider>
          <Typography variant="h6" color="secondary">
            ${(product.price / 1).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>➤</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>➤</TableCell>
                  <TableCell>{product.information1}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>➤</TableCell>
                  <TableCell>{product.information2}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>➤</TableCell>
                  <TableCell>{product.information3}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>➤</TableCell>
                  <TableCell>{product.information4}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>➤</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity in stock</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                variant="outlined"
                type="number"
                label="Quantity in Cart"
                fullWidth
                value={quantity}
              />
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                disabled={
                  item?.quantity === quantity || (!item && quantity === 0)
                }
                loading={status.includes("pending")}
                onClick={handleUpdateCart}
                sx={{ height: "55px" }}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
              >
                {item ? "Update quantity" : "Add to Cart"}
              </LoadingButton>
            </Grid>
            <Grid item xs={2}>
              <RateProduct />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={4} sx={{ ml: 2 }}>
        {ratings.length > 0 ? (
          <Card sx={{ p: 1, mb: 1 }}>
            This product has an average rating of:{getAverageRating()}
          </Card>
        ) : (
          <Card sx={{ p: 1, mb: 1 }}>
            Be the first one to rate the product!
          </Card>
        )}

        {ratings.map((item) => {
          return <ProductRatings key={item.id} rating={item} />;
        })}
      </Grid>
    </Grid>
  );
}
