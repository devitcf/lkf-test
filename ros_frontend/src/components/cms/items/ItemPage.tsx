"use client";
import { Button } from "@mui/material";
import { GridRowModel, GridRowsProp } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import StyledTable from "@/components/cms/common/StyledTable";
import { itemTableColumns } from "@/helper/entities";
import { Item, Restaurant } from "@/types";
import StyledDialog from "@/components/cms/common/StyledDialog";
import ItemForm from "@/components/cms/items/ItemForm";

type GridRowItem = Omit<Item, "restaurant" | "restaurantId"> & { restaurantName: string; data: Item };

type Props = {
  items: Item[];
  restaurants: Restaurant[];
};

const ItemPage = ({ items, restaurants }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item>();

  const rows: GridRowsProp<GridRowItem> = useMemo(
    () =>
      (items ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        restaurantName: item.restaurant.name,
        data: item,
      })),
    [items]
  );

  const onClickRow = useCallback((row: GridRowModel<GridRowItem>) => {
    setSelectedItem(row.data);
    setIsDialogOpen(true);
  }, []);
  const onCreateButtonClick = useCallback(() => {
    setSelectedItem(undefined);
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
        <StyledTable columns={itemTableColumns} rows={rows} onClickRow={onClickRow} />
      </div>
      <StyledDialog open={isDialogOpen} onClose={onCloseDialog}>
        <ItemForm item={selectedItem} restaurants={restaurants} onCloseDialog={onCloseDialog} />
      </StyledDialog>
    </div>
  );
};

export default ItemPage;
