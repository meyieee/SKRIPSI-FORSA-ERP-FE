import { FC, useContext, useState } from "react"
import { KTSVG, WithChildren } from "../../_metronic"
import { ScrollTopComponent } from "../../_metronic/assets/ts/components"
import { AlertMessengerContext } from "./index"
import { client } from "../functions"
import  ViewModal from "./ViewModal"

type Props = {
	data: any[]
	show: boolean
	handleClose: () => void
  apiEndpoint: string
}

const ExcelPreviewModal: FC<Props & WithChildren> = (props) => {
  const { data, show, handleClose, apiEndpoint, children } = props
  const [isSubmit, setIsSubmit] = useState(false)
  const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext);
  
  function onSuccess(msg: string) {
    const time = new Date().toLocaleTimeString();
    addSuccessMessage({
      title: `Success!`,
      message: `${msg} - time: ${time}`
    });
  };

  function onError(msg: string) {
    const time = new Date().toLocaleTimeString();
    addErrorMessage({
      title: `Error!`,
      message: `${msg}
      ${time}`
    });
  };

  const handleSubmitAPI = async (values: any, onSuccess: Function, onError: Function, setIsSubmit: Function) => {
    await client().post(`/${apiEndpoint}batch`, values)
      .then(res => {
        onSuccess(res.data.message)
      })
      .catch(err => {
        setIsSubmit(false)
        onError(err.response.data.message)
      })
  }

  const onSubmit = () => {
    ScrollTopComponent.goTop()
    handleSubmitAPI(data, onSuccess, onError, setIsSubmit)
    handleClose()
  }

	return (
		<ViewModal title={'Preview File'} show={show} handleClose={handleClose}>
      <section className="table-responsive">
        <table className="table align-middle table-hover table-row-dashed fs-6 gy-0 dataTable no-footer">
          {children}
        </table>
      </section>
      <div className={`d-flex flex-stack pt-15`}>
        <div className='mr-2'></div>
        <div>
          <button
            type='submit'
            disabled={isSubmit !== undefined ? isSubmit : false}
            className='btn btn-lg btn-primary me-3'
            onClick={onSubmit}
          >
            <span className='indicator-label'>
              Submit
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg'
                className='svg-icon-3 ms-2 me-0'
              />
            </span>
          </button>
        </div>
      </div>
		</ViewModal>
	)
}

export default ExcelPreviewModal