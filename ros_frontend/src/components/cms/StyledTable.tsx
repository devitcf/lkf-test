"use client";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { memo, useEffect, useState } from "react";

const DEFAULT_PER_PAGE_RANGE = [10, 25, 50];

type PaginationType = {
  currentPage: number;
  totalRecords: number;
  perPage: number;
};

type StyledTableProps = {
  columns: GridColDef[];
  rows: GridRowsProp;
  dataGridProps?: { [prop: string]: any };
  selectedRowIds?: number[];
  setSelectedRowIds?: (rowIndexes: number[]) => void;
  isCheckboxSelection?: boolean;
  onClickRow?: (item: any) => void;
  onChangePage?: (page: number) => void;
  onChangePerPage?: (perPage: number) => void;
  pagination?: PaginationType;
};

const StyledTable = memo(
  ({
    columns,
    rows,
    dataGridProps = {},
    selectedRowIds = [],
    setSelectedRowIds = () => undefined,
    isCheckboxSelection = false,
    onClickRow,
    onChangePage,
    onChangePerPage,
    pagination,
  }: StyledTableProps) => {
    const [paginationModel, setPaginationModel] = useState({
      page: pagination?.currentPage ? pagination.currentPage - 1 : 0,
      pageSize: pagination?.perPage ?? DEFAULT_PER_PAGE_RANGE[0],
    });
    const [rowCountState, setRowCountState] = useState(pagination?.totalRecords ?? 0);

    useEffect(() => {
      onChangePage?.(paginationModel.page + 1);
    }, [onChangePage, paginationModel.page]);
    useEffect(() => {
      onChangePerPage?.(paginationModel.pageSize);
    }, [onChangePerPage, paginationModel.pageSize]);

    useEffect(() => {
      setRowCountState((prevState) => (pagination?.totalRecords !== undefined ? pagination.totalRecords : prevState));
    }, [pagination?.totalRecords, setRowCountState]);

    const serverSidePaginationProps = pagination
      ? {
          rowCount: rowCountState,
          paginationModel: paginationModel,
          onPaginationModelChange: setPaginationModel,
          pageSizeOptions: DEFAULT_PER_PAGE_RANGE,
        }
      : {};

    return (
      <DataGrid
        aria-label="StyledTable"
        classes={{
          root: `text-[#344054] border-0`,
          row: `hover:bg-shadow-blue`,
          cell: `flex outline-none`,
          columnHeader: `flex outline-none`,
          columnHeaderDraggableContainer: `flex outline-none`,
          columnHeaderTitleContainer: `flex outline-none`,
        }}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
        columns={columns}
        density="comfortable"
        filterMode="server"
        logger={{
          ...console,
          debug: () => {},
          info: () => {},
        }}
        rows={rows}
        rowHeight={42}
        onRowClick={(params) => {
          onClickRow && onClickRow(params.row);
        }}
        checkboxSelection={isCheckboxSelection}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedRowIds(newRowSelectionModel as number[]);
        }}
        rowSelectionModel={selectedRowIds}
        disableColumnMenu
        disableRowSelectionOnClick
        paginationMode={pagination ? "server" : "client"}
        {...serverSidePaginationProps}
        {...dataGridProps}
      />
    );
  }
);

StyledTable.displayName = "StyledTable";

export default StyledTable;
