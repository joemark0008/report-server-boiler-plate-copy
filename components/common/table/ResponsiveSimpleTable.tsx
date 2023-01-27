import React from "react";
import { Table, Loader } from "@mantine/core";
import { TableProps } from "../../../utility/interfaces";
import _ from "lodash";

const ResponsiveTable = ({
  columns = [],
  dataSource = [],
  loading = false,
  minWidth = 800,
}: TableProps) => {
  return (
    <Table sx={{ minWidth: minWidth }} verticalSpacing="sm">
      <thead>
        <tr>
          {(columns || []).map((value: any) => {
            const { title, key, align = "left" } = value;
            return (
              <th key={key} align={align}>
                {title}
              </th>
            );
          })}
        </tr>
      </thead>
      {_.isEmpty(dataSource) && !loading ? (
        <tbody>
          <tr key="no-data">
            <td colSpan={_.size(columns)} align="center">
              <p style={{fontStyle: "italic"}}>No Data</p>
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {loading ? (
            <tr key="loading">
              <td colSpan={_.size(columns)} align="center">
                <Loader />
              </td>
            </tr>
          ) : (
            dataSource.map((record: any, index: number) => {
              return (
                <tr key={index}>
                  {(columns || []).map((column) => {
                    let { key, dataIndex, render } = column;
                    if (render) {
                      return <td key={key}>{render(record)}</td>;
                    } else {
                      return <td key={key}>{record[dataIndex] || "--"}</td>;
                    }
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      )}
    </Table>
  );
};

export default ResponsiveTable;
