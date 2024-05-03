"use client";
import { Drawer } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import StyledTable from "@/components/cms/StyledTable";
import { Customer } from "@/types";

type DrawerState = {
  open: boolean;
  type?: "create" | "edit";
  customer?: Customer;
};

type Props = {
  customers: Customer[];
};

const CustomerPage = ({ customers }: Props) => {
  const [drawer, setDrawer] = useState<DrawerState>({ open: false, type: "create" });

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        sortable: true,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        sortable: true,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        sortable: true,
      },
    ],
    []
  );
  const rows: GridRowsProp = useMemo(
    () =>
      customers?.map((customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
      })) ?? [],
    [customers]
  );

  const onCloseDrawer = useCallback(() => setDrawer({ open: false }), []);

  return (
    <div className={"p-6 bg-white shadow-md w-full h-full"}>
      <StyledTable columns={columns} rows={rows} onClickRow={() => setDrawer({ open: true })} isCheckboxSelection />
      <Drawer aria-label="Customer form" anchor="right" open={drawer.open} onClose={onCloseDrawer}>
        <div className={"w-full h-full bg-black"}></div>
        {/*{drawer.type === "create" && <CreateUserForm onAddNewUser={onAddNewUser} onCloseDrawer={onCloseDrawer} />}*/}
        {/*{drawer.type === "edit" && drawer.user && (*/}
        {/*  <EditUserForm onEditUser={onEditUser} onCloseDrawer={onCloseDrawer} item={drawer.user} />*/}
        {/*)}*/}
      </Drawer>
    </div>
  );
};

export default CustomerPage;
