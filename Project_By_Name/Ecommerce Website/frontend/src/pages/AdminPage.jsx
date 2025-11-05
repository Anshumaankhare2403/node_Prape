import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import InventoryIcon from "@mui/icons-material/Inventory";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoProvider, useDemoRouter } from "@toolpad/core/internal";

// components
import DashboardContent from "../components/DashboardContent";
import Orders from "../components/Orders";
import Reports from "../components/Reports";
import ListProduct from "../components/ListProduct";

const NAVIGATION = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "orders", title: "Orders", icon: <ShoppingCartIcon /> },
  { segment: "reports", title: "Reports", icon: <BarChartIcon /> },
  { segment: "list_product", title: "List Product", icon: <InventoryIcon /> },
];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

function AdminPage(props) {
  const { window } = props;
  const navigate = useNavigate();
  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;

  // 🔹 Authentication check
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // from login
    if (!user || user.role !== "admin") {
      navigate("/user"); // redirect to login
    }
  }, [navigate]);

  let PageContent;
  switch (router.pathname) {
    case "/orders":
      PageContent = <Orders />;
      break;
    case "/reports":
      PageContent = <Reports />;
      break;
    case "/list_product":
      PageContent = <ListProduct />;
      break;
    default:
      PageContent = <DashboardContent />;
  }

  return (
    <DemoProvider window={demoWindow}>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
        branding={{
          title: "HELLO ADMIN", // Only show text
          logo: null, // No logo image
        }}
      >
        <DashboardLayout disableCollapsibleSidebar>
          {PageContent}
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}

export default AdminPage;
