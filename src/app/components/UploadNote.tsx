import { Fragment } from "react";

const PhotoUploadNote = () => {
  return (
    <Fragment>
      <br/>
      <span className="form-text text-sm fs-8">
        Allowed: png, jpg, jpeg<br />
        Max size: 1MB<br />
        Max name: 50 characters
      </span>
    </Fragment>
  );
};

const DocumentUploadNote = () => {
  return (
    <Fragment>
      <h3 className="fs-5 fw-bold text-gray-900 mb-1">Click to upload.</h3>
      <p className="fs-7 fw-semibold text-gray-400">
        Upload up to 1 file, max file size is 20MB and maximum file name is 50 characters
      </p>
      <p className="fs-7 fw-semibold text-gray-400">
        Allowed file: doc, docx, pdf, xlsx, csv
      </p>
    </Fragment>
  );
};

export {DocumentUploadNote, PhotoUploadNote};
