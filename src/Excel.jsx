import { useState, useEffect } from "react";
import { ExcelRenderer } from "react-excel-renderer";

const ExcelDataRenderer = ({ file }) => {
  const [data, setData] = useState({ cols: null, rows: null });

  useEffect(() => {
    fetch(file)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          ExcelRenderer(blob, (err, resp) => {
            if (err) {
              return;
            } else {
              setData({
                cols: resp.cols,
                rows: resp.rows.map((row) => row.slice()),
              });
            }
          });
        };
        reader.readAsArrayBuffer(blob);
      })
      .catch((error) => false);
  }, [file]);

  // const fileHandler = (event) => {
  //   let fileObj = event.target.files[0];

  //   ExcelRenderer(fileObj, (err, resp) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       setData({
  //         cols: resp.cols,
  //         rows: resp.rows.map((row) => row.slice()),
  //       });
  //     }
  //   });
  // };

  return (
    <div className="w-full">
      {/* <input type="file" onChange={fileHandler} style={{ padding: "10px" }} /> */}
      {data.cols && data.rows && (
        <table className="w-full">
          <thead className="border opacity-0">
            <tr className="border">
              {data.cols.map((col, index) => (
                <th
                  key={index}
                  className={`border ${index === 1 && "w-1/2"} ${
                    index === 0 && "w-1/3"
                  }`}
                  hidden={index === 4}
                >
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
                    <p>{cell}</p>
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
