import { GridColDef } from "@mui/x-data-grid";

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
