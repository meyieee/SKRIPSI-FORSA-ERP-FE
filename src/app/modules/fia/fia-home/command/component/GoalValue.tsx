import { FC } from 'react'

const GoalAndValue: FC = () => {
  return (
    <div className='bg-body p-6 border rounded-3'>
      <div className='py-2 fw-bold fs-5 theme-light-bg-light theme-dark-bg-dark p-4 rounded-3 mb-3'>GOAL &amp; VALUE</div>
      
      <div className='mb-2'>
        <div className='theme-light-bg-white theme-dark-bg-gray-800 p-2 rounded-3 mb-2'>
          <h6 className='fw-bold theme-light-text-dark theme-dark-text-gray-100 mb-2'>CORE VALUE</h6>
          <ul className='mb-0 theme-light-text-dark theme-dark-text-gray-100'>
            <li>Cost Efficiency</li>
            <li>Optimize Workforce Control</li>
            <li>Streamline Timely Report</li>
            <li>Driven Decision Making &amp; Process Management</li>
            <li>User Friendly, Sophisticated Interface, Custom, and Systematic</li>
          </ul>
        </div>
      </div>
      
      <div className='mb-2'>
        <div className='theme-light-bg-white theme-dark-bg-gray-800 p-2 rounded-3 mb-2'>
          <h6 className='fw-bold theme-light-text-dark theme-dark-text-gray-100 mb-2'>COST &amp; RESOURCE EFFICIENCY</h6>
          <p className='mb-0 theme-light-text-dark theme-dark-text-gray-100'>
            With an Integrated Corporate Application System under web application, the cloud server provides immediate
            information to achieve a business objective, which is to lower costs.
          </p>
        </div>
      </div>
      
      <div>
        <div className='theme-light-bg-white theme-dark-bg-gray-800 p-4 rounded-3'>
          <h6 className='fw-bold theme-light-text-dark theme-dark-text-gray-100 mb-2'>ECONOMIC REALITY CONTROL</h6>
          <p className='mb-0 theme-light-text-dark theme-dark-text-gray-100'>
            Effective-Driven Decision Making, and Process Management under current economic reality conditions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default GoalAndValue;
