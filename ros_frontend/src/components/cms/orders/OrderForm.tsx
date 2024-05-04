import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Customer, Item, Order, OrderItem, Restaurant, UpdateOrderData, UpdateOrderItem } from "@/types";
import { createOrderAction, updateOrderAction, removeOrderAction } from "@/actions/orders";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  order?: Order | Partial<Omit<Order, "orderItems"> & { orderItems: UpdateOrderItem[] }>;
  customers?: Customer[];
  restaurants?: Restaurant[];
  onCloseDialog?: () => void;
};

const OrderForm = ({ order, customers = [], restaurants = [], onCloseDialog }: Props) => {
  const isCreateOrder = order === undefined;
  const router = useRouter();
  const [formOrder, setFormOrder] = useState<
    Order | Partial<Omit<Order, "orderItems"> & { orderItems: UpdateOrderItem[] }> | undefined
  >({ ...order, restaurant: order?.restaurant ?? restaurants[0] });

  const newOrderItems: UpdateOrderItem[] = useMemo(
    () => formOrder?.orderItems?.filter((oi) => "status" in oi && oi.status === "new") ?? [],
    [formOrder?.orderItems]
  );
  const deleteOrderItems: UpdateOrderItem[] = useMemo(
    () => formOrder?.orderItems?.filter((oi) => "status" in oi && oi.status === "delete") ?? [],
    [formOrder?.orderItems]
  );
  const showingOrderItems = useMemo(
    () => formOrder?.orderItems?.filter((oi) => ("status" in oi ? oi.status !== "delete" : true)) ?? [],
    [formOrder]
  );

  const orderData = useMemo(
    () => ({
      customerId: formOrder?.customerId ?? customers?.[0].id ?? 0,
      restaurantId: formOrder?.restaurantId ?? restaurants?.[0].id ?? 0,
    }),
    [customers, formOrder?.customerId, formOrder?.restaurantId, restaurants]
  );
  const itemLists = useMemo(() => formOrder?.restaurant?.items ?? [], [formOrder?.restaurant?.items]);
  const onAddOrderItem = () => {
    if (itemLists.length === 0) {
      toast.error("No items available for the restaurant");
      return;
    }
    setFormOrder((prevState: any) => {
      const oldOrderItems = prevState?.orderItems ?? [];
      const orderItems = [
        ...oldOrderItems,
        {
          id: `${new Date().getTime()}`,
          item: itemLists[0],
          itemId: itemLists[0].id,
          order,
          orderId: order?.id,
          status: "new",
        },
      ];

      return { ...prevState, orderItems };
    });
  };

  const onDeleteOrderItem = (orderItemId: number | string) => {
    const newOrderItem: UpdateOrderItem[] = [...(formOrder?.orderItems ?? [])];
    const oiIndex = newOrderItem.findIndex((oi) => oi.id === orderItemId);
    if (oiIndex > -1) {
      newOrderItem[oiIndex].status = "delete";
    }
    setFormOrder((prevState) => ({ ...prevState, orderItems: newOrderItem }));
  };

  const onCreateOrder = useCallback(async () => {
    const data = {
      ...orderData,
      itemIds: formOrder?.orderItems?.filter((oi) => typeof oi.id !== "number").map((i) => i.itemId) ?? [],
    };
    try {
      const res = await createOrderAction(data);
      if ("error" in res) {
        toast.error(res.message.toString());
        return;
      }
      toast.success("Create order success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot create order");
    }
  }, [orderData, formOrder?.orderItems, onCloseDialog, router]);

  const onEditOrder = useCallback(async () => {
    if (!order?.id) return;

    const data: UpdateOrderData = {
      itemIds: newOrderItems.map((i) => i.itemId),
      removeOrderItemIds: deleteOrderItems.filter((oi): oi is OrderItem => !!oi.id).map((i) => i.id),
    };

    try {
      const res = await updateOrderAction(order.id, data);
      if ("error" in res) {
        toast.error(res.message.toString());
        return;
      }
      toast.success("Edit order success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot edit order");
    }
  }, [order?.id, newOrderItems, deleteOrderItems, onCloseDialog, router]);

  const onRemoveOrder = useCallback(async () => {
    if (!order?.id) return;
    try {
      const res = await removeOrderAction(order.id);
      if (typeof res !== "boolean") {
        toast.error(res?.message.toString());
        return;
      }
      if (!res) {
        toast.error("Cannot remove order");
        return;
      }
      toast.success("Remove order success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot remove order");
    }
  }, [order?.id, onCloseDialog, router]);

  return (
    <div className={"flex flex-col gap-4"}>
      <h1 className={"text-xl font-bold"}>{isCreateOrder ? "Create" : "Edit"} Order</h1>
      <div className={"flex h-[640px] py-4 flex-col md:flex-row border-t-2 gap-2 overflow-hidden"}>
        <div className={"w-full md:w-1/2 mb-4"}>
          <h2 className={"text-sm font-bold uppercase my-3"}>Basic Information</h2>
          <div className={"space-y-6"}>
            <Autocomplete
              value={formOrder?.customer ?? customers[0]}
              onChange={(_, newValue: Customer | null) => {
                if (newValue) {
                  setFormOrder((prevState) => ({ ...prevState, customer: newValue, customerId: newValue.id }));
                }
              }}
              options={customers}
              getOptionKey={(option) => option.id}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} variant="standard" label="Customer" />}
              disabled={!isCreateOrder}
              disableClearable
            />
            <Autocomplete
              value={formOrder?.restaurant ?? restaurants[0]}
              onChange={(_, newValue: Restaurant | null) => {
                if (newValue) {
                  setFormOrder((prevState) => ({
                    ...prevState,
                    restaurant: newValue,
                    restaurantId: newValue.id,
                    orderItems: [],
                  }));
                }
              }}
              options={restaurants}
              getOptionKey={(option) => option.id}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} variant="standard" label="Restaurant" />}
              disabled={!isCreateOrder}
              disableClearable
            />
          </div>
        </div>
        <div className={"relative w-full md:w-1/2 overflow-auto"}>
          <h2 className={"text-sm font-bold uppercase my-3"}>Items</h2>
          <IconButton className={"absolute top-0 right-0"} onClick={onAddOrderItem}>
            <AddIcon color={"success"} />
          </IconButton>
          <div className={"flex flex-col space-y-6"}>
            {showingOrderItems.map((oi, index) => (
              <div key={`${oi.id}_${index}`} className={"flex gap-2 items-center"}>
                <Autocomplete
                  className={"flex-1"}
                  value={oi.item}
                  onChange={(_, newValue: Item) => {
                    setFormOrder((prevState) => {
                      const newOrderItem = [...(prevState?.orderItems ?? [])];
                      const oiIndex = newOrderItem.findIndex((orderItem) => orderItem.id === oi.id);
                      if (oiIndex > -1) {
                        newOrderItem[oiIndex].item = newValue;
                        newOrderItem[oiIndex].itemId = newValue.id;
                        return { ...prevState, orderItems: newOrderItem };
                      }
                    });
                  }}
                  options={itemLists}
                  getOptionKey={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} variant="standard" label="Items" />}
                  disabled={!("status" in oi)}
                  disableClearable
                />
                <IconButton onClick={() => onDeleteOrderItem(oi.id as string | number)}>
                  <CloseIcon color={"error"} />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={"flex justify-end gap-4"}>
        {isCreateOrder && (
          <Button variant={"contained"} onClick={onCreateOrder}>
            Create
          </Button>
        )}
        {!isCreateOrder && (
          <>
            <Button color={"error"} variant={"outlined"} onClick={onRemoveOrder}>
              Remove
            </Button>
            <Button variant={"contained"} onClick={onEditOrder}>
              Edit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
