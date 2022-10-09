import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Header from "~/components/MainLayout/components/Header";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/" underline="hover">
        My Store
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const MainLayout: React.FC<{ children: React.ReactNode }> = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://g3llsjnhed.execute-api.us-east-1.amazonaws.com/dev/products"
      )
      .then((response) => {
        setProducts(response.data);
      });
  }, []);
  return (
    <>
      <Header />
      <main>
        <Container sx={{ pb: 8 }} maxWidth="md">
          {products.map(
            (product: {
              productId: string;
              productName: string;
              price: number;
            }) => {
              return (
                <Card sx={{ minWidth: 275 }} key={product.productId}>
                  <CardContent>
                    <Typography variant="h6">{product.productName}</Typography>
                    <p className="post-body">Price: {product.price} $</p>
                  </CardContent>
                </Card>
              );
            }
          )}
        </Container>
      </main>
      <Box
        component={"footer"}
        sx={{ bgcolor: (theme) => theme.palette.background.paper, padding: 6 }}
      >
        <Typography
          variant="subtitle1"
          align="center"
          color="plum"
          component="p"
        >
          CloudX AWS Practitioner for JS 2022 course
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Thank you for your purchase!
        </Typography>
        <Copyright />
      </Box>
    </>
  );
};

export default MainLayout;
