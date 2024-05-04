import { Autocomplete, Button, Chip, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { createCustomerAction, removeCustomerAction, updateCustomerAction } from "@/actions";
import { Customer, Restaurant } from "@/types";

type Props = {
  customer?: Customer;
  restaurants?: Restaurant[];
  onCloseDialog?: () => void;
};

const CustomerForm = ({ customer, restaurants = [], onCloseDialog }: Props) => {
  const isCreateCustomer = customer === undefined;
  const router = useRouter();
  const [formCustomer, setFormCustomer] = useState<Partial<Customer> | undefined>(customer);
  const customerData = useMemo(
    () => ({
      name: formCustomer?.name ?? "",
      email: formCustomer?.email ?? "",
      restaurantIds: formCustomer?.restaurants?.map((r) => r.id) ?? [],
    }),
    [formCustomer]
  );

  const onInputChange = useCallback((field: string, value: string) => {
    setFormCustomer((prevState) => ({ ...prevState, [field]: value }));
  }, []);

  const onCreateCustomer = useCallback(async () => {
    try {
      const res = await createCustomerAction(customerData);
      if ("error" in res) {
        toast.error(res.message.toString());
        return;
      }
      toast.success("Create customer success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot create customer");
    }
  }, [customerData, onCloseDialog, router]);

  const onEditCustomer = useCallback(async () => {
    if (!customer?.id) return;
    try {
      const res = await updateCustomerAction(customer.id, customerData);
      if ("error" in res) {
        toast.error(res.message.toString());
        return;
      }
      toast.success("Edit customer success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot edit customer");
    }
  }, [customer?.id, customerData, onCloseDialog, router]);

  const onRemoveCustomer = useCallback(async () => {
    if (!customer?.id) return;
    try {
      const res = await removeCustomerAction(customer.id);
      if (typeof res !== "boolean") {
        toast.error(res?.message.toString());
        return;
      }
      if (!res) {
        toast.error("Cannot remove customer");
        return;
      }
      toast.success("Remove customer success");
      onCloseDialog?.();
      router.refresh();
    } catch (e) {
      toast.error("Cannot remove customer");
    }
  }, [customer?.id, onCloseDialog, router]);

  return (
    <div className={"flex flex-col gap-4"}>
      <h1 className={"text-xl font-bold"}>{isCreateCustomer ? "Create" : "Edit"} Customer</h1>
      <div className={"py-4 border-t-2 space-y-6"}>
        <TextField
          label="Name"
          type={"text"}
          autoComplete="off"
          variant={"standard"}
          value={formCustomer?.name ?? ""}
          onChange={(e) => onInputChange("name", e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          type={"email"}
          autoComplete="off"
          variant={"standard"}
          value={formCustomer?.email ?? ""}
          onChange={(e) => onInputChange("email", e.target.value)}
          fullWidth
        />
        <Autocomplete
          value={formCustomer?.restaurants ?? []}
          onChange={(_, newValue: Restaurant[]) => {
            setFormCustomer((prevState) => ({ ...prevState, restaurants: newValue ?? [] }));
          }}
          options={restaurants}
          getOptionKey={(option) => option.id}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} variant="standard" label="Faviourite Restaurants" />}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option.id} label={option.name} />)
          }
          multiple
        />
      </div>
      <div className={"flex justify-end gap-4"}>
        {isCreateCustomer && (
          <Button variant={"contained"} onClick={onCreateCustomer}>
            Create
          </Button>
        )}
        {!isCreateCustomer && (
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

export default CustomerForm;
