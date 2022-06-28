import React, { useState, useEffect } from "react";
import Client from "shopify-buy";
import InquireForm from "../InquireForm";
import Sparkles from "react-sparkle";


const ShopifyBuy = () => {
  // Fetch a single product by Handle
  const handle = "funtime-unicorn";
  const productId = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc2NzMwODM3NTY3NTY=";
  const [client, setClient] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setClient(
      Client.buildClient({
        domain: "derrick-adams-editions.myshopify.com",
        storefrontAccessToken: "92fde8517c8b7393909cd55e4cc5df26",
      })
    );
  }, []);

  useEffect(() => {
    // console.log(client)
    if (client) {
      console.log(client);
      client.product.fetch(productId).then((product) => {
        // Do something with the product
        console.log("product", product);
        setProduct(product);
      });

      // Create empty checkout
      client.checkout.create().then((checkout) => {
        // Do something with the checkout
        console.log("checkout", checkout);
        setCheckout(checkout);
      });
    }
  }, [client]);

  useEffect(() => {
    if (product && checkout) {
      const lineItemsToAdd = [
        {
          variantId: product.variants[0]?.id,
          quantity: 1,
        },
      ];

      //add product to checkout
      client.checkout
        .addLineItems(checkout.id, lineItemsToAdd)
        .then((checkout) => {
          // Do something with the updated checkout
          console.log(checkout.lineItems); // Array with one additional line item
        });
    }
  }, [product, checkout]);

  const onClick = () => {
    console.log("checkout product");
    if (typeof window) {
      window.location.href = checkout.webUrl;
    }
  };

  if (product && checkout) {
    if (product.availableForSale && checkout.webUrl) {
      return (
        <InquireForm showForm={false}>
          <div style={{ position: "relative" }}>
            <a
              href={checkout.webUrl || "#"}
              onClick={onClick}
              title="Purchase"
              target="blank"
            >
              Purchase
            </a>
            <Sparkles
              color={"#F2F1EF"}
              flicker={false}
              fadeOutSpeed={60}
              count={8}
              minSize={4}
              maxSize={8}
            />
          </div>
        </InquireForm>
      );
    } else {
      return (
        <InquireForm showForm={true}>
          <button type="button" disabled>
            Sold Out
          </button>
        </InquireForm>
      );
    }
  } else {
    return (
      <InquireForm showForm={false}>
        <button type="button" disabled>
          Loading...
        </button>
      </InquireForm>
    );
  }
};

export default ShopifyBuy;
