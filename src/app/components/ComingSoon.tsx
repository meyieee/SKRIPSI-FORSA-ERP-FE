import {FC} from "react";
import {toAbsoluteUrl} from '../../_metronic'

const ComingSoon: FC = () => {
    return (
        <div className="d-flex flex-column flex-center text-center p-10">
            <div className="card card-flush w-lg-650px py-5">
                <div className="card-body py-15 py-lg-20">
                    {/* <!--begin::Logo--> */}
                    <div className="mb-13">
                        <a href="#" className="">
                            <img alt="Logo" src={toAbsoluteUrl('/media/logos/abase.svg')} className="h-40px theme-light-show" />
                            <img alt="Logo" src={toAbsoluteUrl('/media/logos/abase-white.svg')} className="h-40px theme-dark-show" />
                        </a>
                    </div>
                    {/* <!--end::Logo--> */}
                    {/* <!--begin::Title--> */}
                    <h1 className="fw-bolder text-gray-900 mb-7">Under Construction</h1>
                    {/* <!--end::Title--> */}
                    {/* <!--begin::Text--> */}
                    <div className="fw-semibold fs-6 text-gray-500 mb-7">We are currently working on this webpage.
                    <br />Please stand by as we'll launch in the near future!</div>
                    {/* <!--end::Text--> */}
                    {/* <!--begin::Illustration--> */}
                    <div className="mb-n5">
                        <img src={toAbsoluteUrl('/media/auth/chart-graph_w.png')} className="mw-100 mh-300px theme-light-show" alt="" />
                        <img src={toAbsoluteUrl('/media/auth/chart-graph_d.png')} className="mw-100 mh-300px theme-dark-show" alt="" />
                    </div>
                    {/* <!--end::Illustration--> */}
                </div>
            </div>
        </div>
    )
}

export default ComingSoon
