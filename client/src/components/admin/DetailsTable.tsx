import { useState } from "react";
import styles from "../../styles/components/table.module.css";

const DetailsTable = (props: {
  columns: Array<string>;
  entries: any;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = props.entries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const renderTableHeader = () => {
    return props.columns.map((column, index) => <th key={index}>{column}</th>);
  };

  const renderTableData = () => {
    return currentEntries.map((entry: any, index: any) => {
      return (
        <tr key={index}>
          {props.columns.map((column, index) => (
            <td key={index}>{entry[column.toLowerCase()]}</td>
          ))}
        </tr>
      );
    });
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastEntry >= props.entries.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DetailsTable;
