import React from 'react'
import { CSVLink } from "react-csv";

const headers = [
  { label: "ID Receipt", key: "idReceipt" },
  { label: "Customer's Name", key: "nameCustomer" },
  { label: "Address", key: "address" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Description", key: "description" },
  { label: "Total", key: "total" },
  { label: "Created Date", key: "createdDate" }
];
export const ExportExcel = ({data})=>{
    return (
        <CSVLink className="btn btn-success" data={data} headers={headers}>Export Excel</CSVLink>
    )
}