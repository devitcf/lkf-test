import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { createRestaurantAction, removeRestaurantAction, updateRestaurantAction } from "@/actions";
import { Restaurant } from "@/types";

type Props = {
  restaurant?: Restaurant;
  onCloseDialog?: () => void;
};

const RestaurantForm = ({ restaurant, onCloseDialog }: Props) => {
  const isCreateRestaurant = restaurant === undefined;
  const router = useRouter();
  const [formRestaurant, setFormRestaurant] = useState<Partial<Restaurant> | undefined>(restaurant);
  const restaurantData = useMemo(
    () => ({
      name: formRestaurant?.name ?? "",
      address: formRestaurant?.address ?? "",
      cuisineType: formRestaurant?.cuisineType ?? "",
    }),
    [formRestaurant]
  );

  const onInputChange = useCallback((field: string, value: string) => {
    setFormRestaurant((prevState) => ({ ...prevState, [field]: value }));
  }, []);

  const onCreateRestaurant = useCallback(async () => {
    try {
      const res = await createRestaurantAction(restaurantData);
      if ("error" in res) {
        toast.error(res.message.toString());
        return;
      }
      toast.success("Create restaurant success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot create restaurant");
    }
  }, [restaurantData, onCloseDialog, router]);

  const onEditRestaurant = useCallback(async () => {
    if (!restaurant?.id) return;
    try {
      const res = await updateRestaurantAction(restaurant.id, restaurantData);
      if ("error" in res) {
        toast.error(res.message.toString());
        return;
      }
      toast.success("Edit restaurant success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot edit restaurant");
    }
  }, [restaurant?.id, restaurantData, onCloseDialog, router]);

  const onRemoveRestaurant = useCallback(async () => {
    if (!restaurant?.id) return;
    try {
      const res = await removeRestaurantAction(restaurant.id);
      if (typeof res !== "boolean") {
        toast.error(res?.message.toString());
        return;
      }
      if (!res) {
        toast.error("Cannot remove restaurant");
        return;
      }
      toast.success("Remove restaurant success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot remove restaurant");
    }
  }, [restaurant?.id, onCloseDialog, router]);

  return (
    <div className={"flex flex-col gap-4"}>
      <h1 className={"text-xl font-bold"}>{isCreateRestaurant ? "Create" : "Edit"} Restaurant</h1>
      <div className={"py-4 border-t-2 space-y-6"}>
        <TextField
          label="Name"
          type={"text"}
          autoComplete="off"
          variant={"standard"}
          value={formRestaurant?.name ?? ""}
          onChange={(e) => onInputChange("name", e.target.value)}
          fullWidth
        />
        <TextField
          label="Address"
          type={"text"}
          autoComplete="off"
          variant={"standard"}
          value={formRestaurant?.address ?? ""}
          onChange={(e) => onInputChange("address", e.target.value)}
          fullWidth
        />
        <TextField
          label="Cuisine Type"
          type={"text"}
          autoComplete="off"
          variant={"standard"}
          value={formRestaurant?.cuisineType ?? ""}
          onChange={(e) => onInputChange("cuisineType", e.target.value)}
          fullWidth
        />
      </div>
      <div className={"flex justify-end gap-4"}>
        {isCreateRestaurant && (
          <Button variant={"contained"} onClick={onCreateRestaurant}>
            Create
          </Button>
        )}
        {!isCreateRestaurant && (
          <>
            <Button color={"error"} variant={"outlined"} onClick={onRemoveRestaurant}>
              Remove
            </Button>
            <Button variant={"contained"} onClick={onEditRestaurant}>
              Edit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantForm;
