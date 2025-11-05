import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

import FloatingAddButton from "./FloatingAddButton";

const ListProduct = () => {
  const [products, setProducts] = useState([]); // Product list
  const [loading, setLoading] = useState(true); // Loader
  const [editOpen, setEditOpen] = useState(false); // Edit dialog
  const [editProduct, setEditProduct] = useState(null); // Product being edited

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`,
        },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Open edit dialog
  const handleEdit = (product) => {
    setEditProduct(product);
    setEditOpen(true);
  };

  // Save updated product
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/products/${editProduct._id}`,
        editProduct,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`,
          },
        }
      );
      setProducts(
        products.map((p) => (p._id === editProduct._id ? editProduct : p))
      );
      setEditOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Mark product as done (example: just console log or set flag)
  const handleDone = (product) => {
    console.log(`Product marked as done: ${product.name}`);
    // You could update backend if needed
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : products.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Price</b>
              </TableCell>
              <TableCell>
                <b>Stock</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Mark as Done">
                    <IconButton
                      color="success"
                      onClick={() => handleDone(product)}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(product)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>No products found.</Typography>
      )}

      {/* Floating Add Button */}
      <FloatingAddButton />

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={editProduct?.name || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={editProduct?.price || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Stock Quantity"
            type="number"
            fullWidth
            value={editProduct?.quantity || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, quantity: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editProduct?.description || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListProduct;
