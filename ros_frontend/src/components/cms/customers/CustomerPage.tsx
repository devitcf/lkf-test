"use client";
import { Button } from "@mui/material";
import { GridRowModel, GridRowsProp } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import StyledTable from "@/components/cms/common/StyledTable";
import { customerTableColumns } from "@/helper/entities";
import { Customer, Restaurant } from "@/types";
import StyledDialog from "@/components/cms/common/StyledDialog";
import CustomerForm from "@/components/cms/customers/CustomerForm";

type GridRowCustomer = Omit<Customer, "restaurants"> & { data: Customer };

type Props = {
  customers: Customer[];
  restaurants: Restaurant[];
};

const CustomerPage = ({ customers, restaurants }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

  const rows: GridRowsProp<GridRowCustomer> = useMemo(
    () =>
      (customers ?? []).map((customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        data: customer,
      })),
    [customers]
  );

  const onClickRow = useCallback((row: GridRowModel<GridRowCustomer>) => {
    setSelectedCustomer(row.data);
    setIsDialogOpen(true);
  }, []);
  const onCreateButtonClick = useCallback(() => {
    setSelectedCustomer(undefined);
    setIsDialogOpen(true);
  }, []);
  const onCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <div className={"p-6 flex flex-col bg-white shadow-md rounded-md h-full w-full gap-2"}>
      <Button className={"w-full md:w-fit"} variant={"contained"} onClick={onCreateButtonClick}>
        Create
      </Button>
      <div className={"flex-1"}>
        <StyledTable columns={customerTableColumns} rows={rows} onClickRow={onClickRow} />
      </div>
      <StyledDialog open={isDialogOpen} onClose={onCloseDialog}>
        <CustomerForm customer={selectedCustomer} restaurants={restaurants} onCloseDialog={onCloseDialog} />
      </StyledDialog>
    </div>
  );
};

export default CustomerPage;
