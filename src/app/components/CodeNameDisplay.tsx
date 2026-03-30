const CodeNameDisplay = ({ code, name }: { code: string | undefined; name: string |undefined }) => (
  <>
    <span className="badge badge-light-primary text-uppercase fs-8 fw-bold me-2">{code}</span>
    <span className="text-dark fw-semibold"> {name}</span>
  </>
);

export default CodeNameDisplay