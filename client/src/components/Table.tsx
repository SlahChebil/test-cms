import { ReactNode } from "react";

type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T]) => ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onEdit: (row: T) => void;
};

export default function Table<T extends { id: number | string }>({
  data,
  columns,
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  onEdit,
}: TableProps<T>) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div >
      <table>
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row) => (
            <TableRow key={row.id} row={row} columns={columns} onEdit={onEdit} />
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}

        >
          Next
        </button>
      </div>
    </div>
  );
}

type HeaderProps<T> = {
  columns: Column<T>[];
};

function TableHeader<T>({ columns }: HeaderProps<T>) {
  return (
    <thead>
      <tr >
        {columns.map((column) => (
          <th key={String(column.key)}>
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

type RowProps<T> = {
  row: T;
  columns: Column<T>[];
  onEdit: (row: T) => void;
};

function TableRow<T extends { id: number | string }>({
  row,
  columns,
  onEdit
}: RowProps<T>) {
  return (
    <tr key={row.id}>
      {columns.map((column) => (
        <TableCell
          key={String(column.key)}
          value={row[column.key]}
          render={column.render}
        />
      ))}
     <td className="border p-2">
        <button onClick={() => onEdit(row)} className="edit-btn">
          Edit
        </button>
      </td>
    </tr>
  );
}

type CellProps<T> = {
  value: T;
  render?: (value: T) => ReactNode;
};

function TableCell<T>({ value, render }: CellProps<T>) {
  return (
    <td>{render ? render(value) : String(value)}</td>
  );
}
