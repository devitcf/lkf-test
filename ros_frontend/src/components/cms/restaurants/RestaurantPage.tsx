"use client";
import { Button } from "@mui/material";
import { GridRowModel, GridRowsProp } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import StyledTable from "@/components/cms/common/StyledTable";
import { restaurantTableColumns } from "@/helper/entities";
import { Restaurant } from "@/types";
import StyledDialog from "@/components/cms/common/StyledDialog";
import RestaurantForm from "@/components/cms/restaurants/RestaurantForm";

type GridRowRestaurant = Omit<Restaurant, "customers" | "orders" | "items"> & { data: Restaurant };

type Props = {
  restaurants: Restaurant[];
};

const RestaurantPage = ({ restaurants }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();

  const rows: GridRowsProp<GridRowRestaurant> = useMemo(
    () =>
      (restaurants ?? []).map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        cuisineType: restaurant.cuisineType,
        data: restaurant,
      })),
    [restaurants]
  );

  const onClickRow = useCallback((row: GridRowModel<GridRowRestaurant>) => {
    setSelectedRestaurant(row.data);
    setIsDialogOpen(true);
  }, []);
  const onCreateButtonClick = useCallback(() => {
    setSelectedRestaurant(undefined);
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
        <StyledTable columns={restaurantTableColumns} rows={rows} onClickRow={onClickRow} />
      </div>
      <StyledDialog open={isDialogOpen} onClose={onCloseDialog}>
        <RestaurantForm restaurant={selectedRestaurant} onCloseDialog={onCloseDialog} />
      </StyledDialog>
    </div>
  );
};

export default RestaurantPage;
