import { useState } from "react";
import { useMediaQuery, Snackbar, Alert } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";

// 🔹 Common styles for all TextFields
const getTextFieldStyles = (isDarkMode) => ({
  backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
  borderRadius: "5px",
  input: { color: isDarkMode ? "#fff" : "#000" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: isDarkMode ? "#90caf9" : "#084bc8ff" },
    "&:hover fieldset": { borderColor: isDarkMode ? "#64b5f6" : "#063b9b" },
    "&.Mui-focused fieldset": {
      borderColor: isDarkMode ? "#64b5f6" : "#063b9b",
    },
  },
  "& .MuiInputLabel-root": {
    color: isDarkMode ? "#90caf9" : "#084bc8ff",
  },
});

export default function FloatingAddButton() {
  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Dialog state
  const [open, setOpen] = useState(false);
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Snackbar Alert state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success"); // success | error

  // Image states
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Open/Close Dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  // Snackbar Close
  const handleAlertClose = (_, reason) => {
    if (reason === "clickaway") return;
    setAlertOpen(false);
  };

  // Reset form
  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setImageUrl("");
    setPreview(null);
    setImageFile(null);
  };

  // Handle Drag & Drop
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const imagePreview = URL.createObjectURL(file);
      setPreview(imagePreview);
      setImageUrl("");
      setImageFile(file);
    }
  };

  // Submit form
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;

      if (!token) {
        setAlertSeverity("error");
        setAlertMessage("No token found. Please log in again.");
        setAlertOpen(true);
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("imageUrl", imageUrl);
      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const res = await axios.post(
        "http://localhost:3000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.success) {
        setAlertSeverity("success");
        setAlertMessage("✅ Product added successfully!");
        setAlertOpen(true);
        handleClose();
      } else {
        setAlertSeverity("error");
        setAlertMessage(res.data?.message || "❌ Failed to add product");
        setAlertOpen(true);
      }
    } catch (err) {
      setAlertSeverity("error");
      setAlertMessage(err.response?.data?.message || "❌ Something went wrong");
      setAlertOpen(true);
    }
  };

  return (
    <>
      {/* Floating Add Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#084bc8ff",
          "&:hover": { backgroundColor: "#063b9b" },
        }}
      >
        <AddIcon />
      </Fab>

      {/* Popup Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: isDarkMode ? "#121212" : "#f1f4ff",
              color: isDarkMode ? "#fff" : "#000",
              padding: 2,
              width: 500,
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: isDarkMode ? "#90caf9" : "#084bc8ff",
          }}
        >
          Add New Dry Fruit Product
        </DialogTitle>

        <DialogContent>
          <form id="add-product-form" onSubmit={handleProductSubmit}>
            <TextField
              margin="dense"
              label="Product Name"
              fullWidth
              variant="outlined"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={getTextFieldStyles(isDarkMode)}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              variant="outlined"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={getTextFieldStyles(isDarkMode)}
            />
            <TextField
              margin="dense"
              label="Price (₹)"
              type="number"
              fullWidth
              variant="outlined"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              sx={getTextFieldStyles(isDarkMode)}
            />
            <TextField
              margin="dense"
              label="Stock Quantity"
              type="number"
              fullWidth
              variant="outlined"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={getTextFieldStyles(isDarkMode)}
            />

            {/* Image URL Field */}
            <TextField
              margin="dense"
              label="Image URL"
              fullWidth
              variant="outlined"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setPreview(e.target.value || null);
                setImageFile(null);
              }}
              placeholder="Paste image URL here or drag & drop below"
              sx={getTextFieldStyles(isDarkMode)}
            />

            {/* Drag & Drop Area */}
            <Box
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              sx={{
                border: "2px dashed",
                borderColor: isDarkMode ? "#90caf9" : "#084bc8ff",
                borderRadius: "8px",
                p: 2,
                textAlign: "center",
                mt: 2,
                cursor: "pointer",
                backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    borderRadius: "5px",
                  }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Drag & Drop an image here
                </Typography>
              )}
            </Box>
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: isDarkMode ? "#90caf9" : "#084bc8ff",
              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-product-form"
            variant="contained"
            sx={{
              backgroundColor: isDarkMode ? "#90caf9" : "#084bc8ff",
              color: isDarkMode ? "#000" : "#fff",
              "&:hover": {
                backgroundColor: isDarkMode ? "#64b5f6" : "#063b9b",
              },
            }}
          >
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
