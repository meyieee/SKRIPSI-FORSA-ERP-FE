/*
    the caches name are same with name endpoint API
*/

// CONTROL FILE
// MASTER
const cache_coms = 'profiles' // nama yang disesuaikan berada pada com table container
const cache_com = 'profile' // nama yang disesuaikan berada pada com table container
const cache_hoandbranchprofiles = 'hoandbranchprofiles'
const cache_departments = 'departments'
const cache_businessunit = 'businessunit'
const cache_division = 'division'
const cache_location = 'location'
const cache_costcenter = 'costcenter'
const cache_currency = 'currency'
const cache_priority = 'priority'
const cache_accounts = 'accounts'
const cache_locwork = 'locwork'
const cache_locops = 'locops'
const cache_colour = 'colour'
const cache_officers = 'officers'
const cache_officertype = 'officertype'
const cache_contacts = 'contacts'
const cache_pictures = 'pictures'
const cache_documents = 'documents'
const cache_contracts = 'contracts'
const cache_users = 'users'
const cache_check_existing_admin = 'check-existing-admin'

// FINANCE
const cache_taxpercentage = 'taxpercentage'

// OPERATIONS
const cache_assetmodel = 'assetmodel'
const cache_assetcategory = 'assetcategory'
const cache_assetclass = 'assetclass'
const cache_assettype = 'assettype'
const cache_assetregisterlength = 'assetregisterlength'
const cache_assetregister = 'assetregister'
const cache_assetregisterbyid = 'assetregisterbyid'
const cache_readingtype = 'readingtype'
const cache_fueltype = 'fueltype'
const cache_readingstockcode = 'readingstockcode'
const cache_jobtype = 'jobtype'
const cache_jobstatus = 'jobstatus'
const cache_jobcode = 'jobcode'
const cache_resourcetype = 'resourcetype'
const cache_jobmajors = 'jobmajors'
const cache_jobminors = 'jobminors'
const cache_joboverhead = 'joboverhead'
const cache_jobauxiliary = 'jobauxiliary'
const cache_pmandinspectionlength = 'pmandinspectionlength'
const cache_actualworkjoborderparts = 'actualworkjoborderparts'
const cache_workjoborderparts = 'workjoborderparts'
const cache_workjoborderbacklogs = 'workjoborderbacklogs'
const cache_workjobordertasks = 'workjobordertasks'
const cache_workjobordersbyjobtype = 'workjobordersbyjobtype'
const cache_workjobordersbymonth = 'workjobordersbymonth'
const cache_workjoborderman = 'workjoborderman'
const cache_workjoborderaux = 'workjoborderaux'
const cache_workjoborderoh = 'workjoborderoh'
const cache_workjoborderdocs = 'workjoborderdocs'
const cache_workjobordercustomer = 'workjobordercustomer'
const cache_workjoborderinspection = 'workjoborderinspection'
const cache_inspectionqna = 'inspectionqna'
const cache_inspectionq = 'inspectionq'
const cache_inspectiona = 'inspectiona'
const cache_shifttype = 'shifttype'
const cache_shift = 'shift'
const cache_breakdownstatus = 'breakdownstatus'
const cache_breakdowncategory = 'breakdowncategory'
const cache_responsible = 'responsible'
const cache_timemap = 'timemap'

// HUMAN RESOURCE
const cache_employeetype = 'employeetype'
const cache_employeeclass = 'employeeclass'
const cache_employmenttype = 'employmenttype'
const cache_employmentstatus = 'employmentstatus'
const cache_maritalbenefit = 'maritalbenefit'
const cache_leavetype = 'leavetype'
const cache_workday = 'workday'
const cache_workgroup = 'workgroup'
const cache_workfunction = 'workfunction'
const cache_level = 'level'
const cache_grade = 'grade'
const cache_posttitle = 'posttitle'
const cache_education = 'education'
const cache_fieldstudy = 'fieldstudy'
const cache_yearexp = 'yearexp'
const cache_age = 'age'
const cache_english = 'english'

// SUPPLY CHAIN MANAGEMENT
const cache_stockcode = 'stockcode'
const cache_supplierstockcode = 'supplierstockcode'
const cache_stockcodereg = 'stockcodereg'
const cache_stockcodecategory = 'stockcodecategory'
const cache_stockcodeclass = 'stockcodeclass'
const cache_stockcodegroup = 'stockcodegroup'
const cache_storage = 'storage'
const cache_storagebystoragecode = 'storagebystoragecode'
const cache_uom = 'uom'
const cache_bin = 'bin'
const cache_customerprice = 'customerprice'
const cache_manufacture = 'manufacture'
const cache_stockclass = 'stockclass'
const cache_materialissues = 'materialissues'
const cache_pomaster = 'pomaster'
const cache_stocksonhand = 'stocksonhand'
const cache_materialreceives = 'materialreceives'
const cache_receiveData = 'receiveData'
const cache_pomasters = 'pomasters'
const cache_pomasters_status = 'pomasters/status'
const cache_pomastersbymonth = 'pomastersbymonth'
const cache_itemspomaster = 'itemspomaster'
const cache_purchaserequisitions = 'purchaserequisitions'
const cache_approvedpurchaserequisitions = 'approvedpurchaserequisitions'
const cache_replenishments = 'replenishments'
const cache_standingorders = 'standingorders'
const cache_beginningstock = 'beginningstock'

// FORSA
const cache_preventivemaintenanceassetinspect = 'preventivemaintenanceassetinspect';
const cache_jobrequestbymonth = 'jobrequestbymonth';
const cache_activeworkjoborder = 'activeworkjoborder';
const cache_jobrequestlength = 'jobrequestlength';
const cache_employeeregister_dept = '/employeeregister/dept';
const cache_employeeregister_id = '/employeeregister/id';
const cache_employeeregister = 'employeeregister';
const cache_provinces = 'provinces';
const cache_documentspomaster = 'documentspomaster';
const cache_allactivecoms = 'allactivecoms';
const cache_workjoborderlength = 'workjoborderlength';
const cache_materialrequests = 'materialrequests';
const cache_materialreservations = 'materialreservations';
const cache_materialIssueData = 'materialIssueData';

// FIA HOME - ONLINE SERVICE
const cache_jobrequest = 'job-request';
const cache_jobrequest_new = 'job-request/new';
const cache_jobrequest_list = 'job-request/list';
const cache_jobrequest_byid = 'job-request/byid';
const cache_fleetrequest = 'fleet-request';
const cache_fleetrequest_new = 'fleet-request/new';
const cache_fleetrequest_list = 'fleet-request/list';
const cache_fleetrequest_byid = 'fleet-request/byid';
const cache_trainingrequest = 'training-request';
const cache_trainingrequest_new = 'training-request/new';
const cache_trainingrequest_list = 'training-request/list';
const cache_trainingrequest_byid = 'training-request/byid';
const cache_accommodationrequest = 'accommodation-request';
const cache_accommodationrequest_new = 'accommodation-request/new';
const cache_accommodationrequest_list = 'accommodation-request/list';
const cache_accommodationrequest_byid = 'accommodation-request/byid';
const cache_assetrequest = 'asset-request';
const cache_assetrequest_new = 'asset-request/new';
const cache_assetrequest_list = 'asset-request/list';
const cache_assetrequest_byid = 'asset-request/byid';
const cache_cashrequest = 'cash-request';
const cache_cashrequest_new = 'cash-request/new';
const cache_cashrequest_list = 'cash-request/list';
const cache_cashrequest_byid = 'cash-request/byid';
const cache_inspectiondefect = 'inspection-defect';
const cache_inspectiondefect_new = 'inspection-defect/new';
const cache_inspectiondefect_list = 'inspection-defect/list';
const cache_inspectiondefect_byid = 'inspection-defect/byid';
const cache_transportrequest = 'transport-request';
const cache_transportrequest_new = 'transport-request/new';
const cache_transportrequest_list = 'transport-request/list';
const cache_transportrequest_byid = 'transport-request/byid';
const cache_travelrequest = 'travel-request';
const cache_travelrequest_new = 'travel-request/new';
const cache_travelrequest_list = 'travel-request/list';
const cache_travelrequest_byid = 'travel-request/byid';
const cache_workforcerequest = 'workforce-request';
const cache_workforcerequest_new = 'workforce-request/new';
const cache_workforcerequest_list = 'workforce-request/list';
const cache_workforcerequest_byid = 'workforce-request/byid';
const cache_visitorrequest = 'visitor-request';
const cache_visitorrequest_new = 'visitor-request/new';
const cache_visitorrequest_list = 'visitor-request/list';
const cache_visitorrequest_byid = 'visitor-request/byid';
const cache_purchaserequisition = 'purchase-requisition';
const cache_purchaserequisition_new = 'purchase-requisition/new';
const cache_purchaserequisition_list = 'purchase-requisition/list';
const cache_purchaserequisition_byid = 'purchase-requisition/byid';

//FINANCE
const cache_invmasterbymonth = 'invmasterbymonth'
const cache_invoutstanding = 'invoutstanding'

// FIA OPERATION PERFORMANCE
const cache_fiaoperationperformanceoperation = 'fia-operation-performance/operation'
const cache_fiaoperationperformancemaintenance = 'fia-operation-performance/maintenance'
const cache_fiaoperationperformanceproduction = 'fia-operation-performance/production'
const cache_fiaoperationperformancekpi = 'fia-operation-performance/kpi'

// FIA RESOURCE
const cache_fiaresourceonlinefeeds_roster = 'fia-resource/roster'
const cache_fiaresourceonlinefeeds_requests = 'fia-resource/requests'

export {
    cache_coms, 
    cache_com, 
    cache_hoandbranchprofiles, 
    cache_departments, 
    cache_businessunit, 
    cache_division, 
    cache_location, 
    cache_costcenter, 
    cache_currency, 
    cache_priority,
    cache_accounts, 
    cache_locwork, 
    cache_locops, 
    cache_colour, 
    cache_officers, 
    cache_officertype, 
    cache_contacts, 
    cache_pictures, 
    cache_documents, 
    cache_contracts,
    cache_storage, 
    cache_uom, 
    cache_jobrequestbymonth,
    cache_assetmodel, 
    cache_assetcategory, 
    cache_assetclass, 
    cache_assettype, 
    cache_readingtype, 
    cache_fueltype, 
    cache_readingstockcode,
    cache_jobtype, 
    cache_jobstatus, 
    cache_jobcode, 
    cache_resourcetype, 
    cache_jobmajors, 
    cache_jobminors, 
    cache_joboverhead, 
    cache_jobauxiliary, 
    cache_pmandinspectionlength,
    cache_activeworkjoborder, 
    cache_jobrequestlength, 
    cache_preventivemaintenanceassetinspect,
    cache_employeeregister_dept, 
    cache_stockcode, 
    cache_stockcodereg, 
    cache_beginningstock,
    cache_provinces,
    cache_documentspomaster, 
    cache_employmentstatus, 
    cache_taxpercentage,
    cache_allactivecoms, 
    cache_employeeclass, 
    cache_inspectionqna, 
    cache_inspectionq, 
    cache_inspectiona,
    cache_shifttype, 
    cache_shift, 
    cache_breakdownstatus, 
    cache_breakdowncategory, 
    cache_responsible, 
    cache_timemap,
    cache_employeetype, 
    cache_employmenttype, 
    cache_posttitle, 
    cache_workfunction,
    cache_workday, 
    cache_workgroup, 
    cache_education, 
    cache_fieldstudy, 
    cache_yearexp, 
    cache_age, 
    cache_english,
    cache_level, 
    cache_grade, 
    cache_maritalbenefit, 
    cache_leavetype, 
    cache_workjoborderlength, 
    cache_materialrequests, 
    cache_materialreservations,
    cache_supplierstockcode, 
    cache_stockcodecategory, 
    cache_stockcodeclass, 
    cache_stockcodegroup, 
    cache_bin,
    cache_customerprice, 
    cache_manufacture, 
    cache_stockclass, 
    cache_materialissues, 
    cache_materialIssueData,
    cache_actualworkjoborderparts, 
    cache_workjoborderparts, 
    cache_workjoborderbacklogs, 
    cache_assetregisterlength,
    cache_workjobordertasks, 
    cache_workjobordersbyjobtype, 
    cache_workjobordersbymonth,
    cache_workjoborderman, 
    cache_workjoborderaux, 
    cache_workjoborderoh, 
    cache_workjoborderdocs, 
    cache_workjobordercustomer, 
    cache_workjoborderinspection,
    cache_storagebystoragecode, 
    cache_pomaster, 
    cache_invmasterbymonth, 
    cache_invoutstanding, 
    cache_stocksonhand,
    cache_materialreceives, 
    cache_receiveData, 
    cache_pomasters, 
    cache_pomastersbymonth, 
    cache_itemspomaster, 
    cache_purchaserequisitions,
    cache_approvedpurchaserequisitions, 
    cache_replenishments, 
    cache_standingorders, 
    cache_users, 
    cache_pomasters_status, 
    cache_employeeregister, 
    cache_employeeregister_id,
    cache_assetregister, 
    cache_assetregisterbyid, 
    cache_check_existing_admin,
    cache_jobrequest, 
    cache_jobrequest_new, 
    cache_jobrequest_list, 
    cache_jobrequest_byid,
    cache_fleetrequest, 
    cache_fleetrequest_new, 
    cache_fleetrequest_list, 
    cache_fleetrequest_byid,
    cache_trainingrequest, 
    cache_trainingrequest_new, 
    cache_trainingrequest_list, 
    cache_trainingrequest_byid,
    cache_accommodationrequest, 
    cache_accommodationrequest_new, 
    cache_accommodationrequest_list, 
    cache_accommodationrequest_byid,
    cache_assetrequest, 
    cache_assetrequest_new, 
    cache_assetrequest_list, 
    cache_assetrequest_byid,
    cache_cashrequest, 
    cache_cashrequest_new, 
    cache_cashrequest_list, 
    cache_cashrequest_byid,
    cache_inspectiondefect, 
    cache_inspectiondefect_new, 
    cache_inspectiondefect_list, 
    cache_inspectiondefect_byid,
    cache_transportrequest, 
    cache_transportrequest_new, 
    cache_transportrequest_list, 
    cache_transportrequest_byid,
    cache_travelrequest, 
    cache_travelrequest_new, 
    cache_travelrequest_list, 
    cache_travelrequest_byid,
    cache_workforcerequest, 
    cache_workforcerequest_new, 
    cache_workforcerequest_list, 
    cache_workforcerequest_byid,
    cache_visitorrequest, 
    cache_visitorrequest_new, 
    cache_visitorrequest_list, 
    cache_visitorrequest_byid,
    cache_purchaserequisition, 
    cache_purchaserequisition_new, 
    cache_purchaserequisition_list, 
    cache_purchaserequisition_byid,
    cache_fiaoperationperformanceoperation,
    cache_fiaoperationperformancemaintenance,
    cache_fiaoperationperformanceproduction,
    cache_fiaoperationperformancekpi,
    cache_fiaresourceonlinefeeds_roster,
    cache_fiaresourceonlinefeeds_requests,
}
