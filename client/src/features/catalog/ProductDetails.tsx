import {
  Card,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";

export default function ProductDeatils() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h3>Loading...</h3>;

  if (!product) return <h3>Product not found</h3>;

  return (
    <Grid container>
      <Grid item xs={3}>
        <img src={product.pictureUrl} alt={product.name} />
      </Grid>

      <Grid item xs={6}>
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
      </Grid>
    </Grid>
  );
}
