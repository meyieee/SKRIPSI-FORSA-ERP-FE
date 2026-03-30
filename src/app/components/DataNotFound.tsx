type Props = {
  colSpan: number
  errorMsg?: string
}

const DataNotFound = ({colSpan, errorMsg}: Props) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="d-flex text-center w-100 align-content-center justify-content-center">
          {errorMsg ? errorMsg : 'No matching records found'}
        </div>
      </td>
    </tr>
  );
};

export default DataNotFound