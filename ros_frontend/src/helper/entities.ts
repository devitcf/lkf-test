import { GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns/format";

export const customerTableColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
];

export const restaurantTableColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
  },
  {
    field: "cuisineType",
    headerName: "Cuisine Type",
    flex: 1,
  },
];

export const itemTableColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Price",
    renderCell: (params) => `$${params.value}`,
    flex: 1,
  },
  {
    field: "restaurantName",
    headerName: "Restaurant",
    flex: 1,
  },
];

export const orderTableColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "customerName",
    headerName: "Customer",
    flex: 1,
  },
  {
    field: "restaurantName",
    headerName: "Restaurant",
    flex: 1,
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    renderCell: (params) => `$${params.value}`,
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Order Time",
    renderCell: (params) => format(new Date(params.value), "yyyy-MM-dd HH:mm:ss"),
    flex: 1,
  },
];
