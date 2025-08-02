import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import FloatingAddButton from "./FloatingAddButton";

const ListProduct = () => {
  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">List</Typography>
        <FloatingAddButton />
      </Box>
    </div>
  );
};

export default ListProduct;
