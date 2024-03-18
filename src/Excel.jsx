import React, { useState } from "react";
import { ExcelRenderer } from "react-excel-renderer";

const ExcelDataRenderer = () => {
  const [data, setData] = useState({ cols: null, rows: null });

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setData({
          cols: resp.cols,
          rows: resp.rows.map((row) => row.slice()),
        });
      }
    });
  };

  const handleInputChange = (rowIndex, cellIndex, event) => {
    const newData = { ...data };
    newData.rows[rowIndex][cellIndex] = event.target.value;
    setData(newData);
  };

  return (
    <div>
      <input type="file" onChange={fileHandler} style={{ padding: "10px" }} />
      {data.cols && data.rows && (
        <table className="ExcelTable2007">
          <thead className="border">
            <tr className="border">
              {data.cols.map((col, index) => (
                <th key={index} className="border">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border p-1">
                    <input
                      readOnly={cellIndex === 0}
                      defaultValue={cell ?? ""}
                      onChange={(event) =>
                        handleInputChange(rowIndex, cellIndex, event)
                      }
                      className="outline-none border-none"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelDataRenderer;
