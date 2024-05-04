"use client";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { memo } from "react";

type Props = {
  columns: GridColDef[];
  rows: GridRowsProp;
  dataGridProps?: { [prop: string]: any };
  onClickRow?: (item: any) => void;
};

const StyledTable = memo(({ columns, rows, dataGridProps = {}, onClickRow }: Props) => {
  return (
    <DataGrid
      className={"border-none"}
      columns={columns}
      density="comfortable"
      rows={rows}
      onRowClick={(params) => onClickRow?.(params.row)}
      disableRowSelectionOnClick
      {...dataGridProps}
    />
  );
});

StyledTable.displayName = "StyledTable";

export default StyledTable;
