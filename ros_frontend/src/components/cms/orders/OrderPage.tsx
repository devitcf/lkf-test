"use client";
import { Button } from "@mui/material";
import { GridRowModel, GridRowsProp } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import StyledDialog from "@/components/cms/common/StyledDialog";
import StyledTable from "@/components/cms/common/StyledTable";
import OrderForm from "@/components/cms/orders/OrderForm";
import { orderTableColumns } from "@/helper/entities";
import { Customer, Order, Restaurant } from "@/types";

type GridRowOrder = Pick<Order, "id" | "totalPrice" | "createdAt"> & {
  customerName: string;
  restaurantName: string;
  data: Order;
};

type Props = {
  orders: Order[];
  customers?: Customer[];
  restaurants?: Restaurant[];
};

const OrderPage = ({ orders, customers = [], restaurants = [] }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  const rows: GridRowsProp<GridRowOrder> = useMemo(
    () =>
      (orders ?? []).map((order) => ({
        id: order.id,
        customerName: order.customer.name,
        restaurantName: order.restaurant.name,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        data: order,
      })),
    [orders]
  );

  const onClickRow = useCallback((row: GridRowModel<GridRowOrder>) => {
    setSelectedOrder(row.data);
    setIsDialogOpen(true);
  }, []);
  const onCreateButtonClick = useCallback(() => {
    setSelectedOrder(undefined);
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
        <StyledTable columns={orderTableColumns} rows={rows} onClickRow={onClickRow} />
      </div>
      <StyledDialog open={isDialogOpen} onClose={onCloseDialog} maxWidth={"md"}>
        <OrderForm
          order={selectedOrder}
          customers={customers}
          restaurants={restaurants}
          onCloseDialog={onCloseDialog}
        />
      </StyledDialog>
    </div>
  );
};

export default OrderPage;
