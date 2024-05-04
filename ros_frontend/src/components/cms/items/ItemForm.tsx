import { Autocomplete, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { createItemAction, removeItemAction, updateItemAction } from "@/actions";
import { Item, Restaurant } from "@/types";

type Props = {
  item?: Item;
  restaurants?: Restaurant[];
  onCloseDialog?: () => void;
};

const ItemForm = ({ item, restaurants = [], onCloseDialog }: Props) => {
  const isCreateItem = item === undefined;
  const router = useRouter();
  const [formItem, setFormItem] = useState<Partial<Item> | undefined>(item);
  const itemData = useMemo(
    () => ({
      name: formItem?.name ?? "",
      price: !isNaN(Number(formItem?.price ?? "")) ? Number(formItem?.price ?? "") : 0,
      restaurantId: formItem?.restaurantId ?? restaurants?.[0].id ?? 0,
    }),
    [formItem, restaurants]
  );

  const onInputChange = useCallback((field: string, value: string) => {
    setFormItem((prevState) => ({ ...prevState, [field]: value }));
  }, []);

  const onCreateCustomer = useCallback(async () => {
    try {
      const res = await createItemAction(itemData);
      if ("error" in res) {
        toast.error(res.message.toString());
        return;
      }
      toast.success("Create item success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot create item");
    }
  }, [itemData, onCloseDialog, router]);

  const onEditCustomer = useCallback(async () => {
    if (!item?.id) return;
    try {
      const res = await updateItemAction(item.id, itemData);
      if ("error" in res) {
        toast.error(res.message.toString());
        return;
      }
      toast.success("Edit item success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot edit item");
    }
  }, [item?.id, itemData, onCloseDialog, router]);

  const onRemoveCustomer = useCallback(async () => {
    if (!item?.id) return;
    try {
      const res = await removeItemAction(item.id);
      if (typeof res !== "boolean") {
        toast.error(res?.message.toString());
        return;
      }
      if (!res) {
        toast.error("Cannot remove item");
        return;
      }
      toast.success("Remove item success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot remove item");
    }
  }, [item?.id, onCloseDialog, router]);

  return (
    <div className={"flex flex-col gap-4"}>
      <h1 className={"text-xl font-bold"}>{isCreateItem ? "Create" : "Edit"} Item</h1>
      <div className={"py-4 border-t-2 space-y-6"}>
        <TextField
          label="Name"
          type={"text"}
          autoComplete="off"
          variant={"standard"}
          value={formItem?.name ?? ""}
          onChange={(e) => onInputChange("name", e.target.value)}
          fullWidth
        />
        <TextField
          label="Price ($)"
          type={"number"}
          inputProps={{ step: 0.01 }}
          autoComplete="off"
          variant={"standard"}
          value={formItem?.price ?? 0}
          onChange={(e) => onInputChange("price", e.target.value)}
          fullWidth
        />
        <Autocomplete
          value={formItem?.restaurant ?? restaurants[0]}
          onChange={(_, newValue: Restaurant | null) => {
            if (newValue) {
              setFormItem((prevState) => ({ ...prevState, restaurant: newValue, restaurantId: newValue.id }));
            }
          }}
          options={restaurants}
          getOptionKey={(option) => option.id}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} variant="standard" label="Restaurant" />}
          disableClearable
        />
      </div>
      <div className={"flex justify-end gap-4"}>
        {isCreateItem && (
          <Button variant={"contained"} onClick={onCreateCustomer}>
            Create
          </Button>
        )}
        {!isCreateItem && (
          <>
            <Button color={"error"} variant={"outlined"} onClick={onRemoveCustomer}>
              Remove
            </Button>
            <Button variant={"contained"} onClick={onEditCustomer}>
              Edit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemForm;
