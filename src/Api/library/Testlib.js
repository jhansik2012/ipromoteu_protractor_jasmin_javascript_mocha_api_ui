export const log = (msg) => {
   console.log(Date());
   console.log(msg);
}

export const getQstring = (filters) => {
   var qstring = '';

   for (var key in filters) {
      if (filters.hasOwnProperty(key)) {
         var value = filters[key];
         if (qstring) qstring += '&';
         if (key === 'keywords')
            value = encodeURIComponent(value);
         qstring += `${key}=${value}`;
      }
   }
   if (qstring) qstring = '?' + qstring;
   return qstring;
}

export const login = async (username, password) => {

   try {
      log(`Logging in as ${username} : ${password} ... `);
      const user = await getAuth().signIn(username, password);

      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
         console.log('SignIn user new password reset required ');
      }
      else {
         // console.log('SignIn Regular user: ', user);
         // Regular login ... force refresh
         await refreshAuthUser(true);
         console.log('SignIn successful.');
      }

      return user;
   }
   catch (err) {
      console.log('Login Error: ', err);
      return err;
   }

}

export const listJobs = async (filters) => {
   console.log('ListJobs_Filter', filters);
   var resp = await apiRequest('GET', '/jobs' + getQstring(filters));
   return resp;
}

export const getJobDetails = async (jobId) => {
   console.log('getJobDetails.jobId', jobId);
   var resp = await apiRequest('GET', `/jobs/${jobId}`);
   return resp;
}

export const createJob = async (params) => {
   console.log('creating job ... ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const updateJob = async (params) => {
   console.log('Updating job ... ');
   return await apiRequest('POST', '/xoms-api', params);
}
export const addAlternateAddress = async (params) => {
   console.log('Add alternate address ... ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const getShipments= async (filters)=>{
   console.log('Get Shipment...');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}
export const postShipments= async (params)=>{
   console.log('Add, Update and Delete Shipments...');
   return await apiRequest('POST','/xoms-api',params)
   
}
export const getPaginatedVendorList = async (filters) => {
   console.log('PaginatedVendorList_Filter..');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const getLineItem = async (filters) => {
   console.log('getLineItem..');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const vendors = async (filters) => {
   console.log('Get Vendor, and List Vendor Invoices..');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const customers = async (filters) => {
   console.log('List billing, shipping, and get billing and shipping Customers validation..');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const listContactsList = async (filters) => {
   console.log('List of ContactList validation..');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const listPresentationList = async (filters) => {
   console.log('List of PresntationtList validation..');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const getPresentationDetails = async (filters) => {
   console.log('Get Presntationt details validation..');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}
export const getPresentationStyleSettings = async (filters) => {
   console.log('Get Presntationt Style Settings..');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const getListPresentationFavouriteProducts = async (filters) => {
   console.log('List Presentation Favourite Products validation..');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}


export const contacts = async (filters) => {
   console.log('List billing, shipping, and affiliate contacts validation..');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const postcontacts = async (params) => {
   console.log('Add contacts validation..');
   return await apiRequest('POST','/xoms-api',params)
   return resp;
}
export const postcontactsList = async (params) => {
   console.log('Contact List validation..');
   return await apiRequest('POST','/xoms-api',params)
   return resp;
}
export const quoteFees = async (params) => {
   console.log('Add, Update Quote fees validation..');
   return await apiRequest('POST','/xoms-api',params)
   return resp;
}
export const quoteProduct = async (params) => {
   console.log('Add, Update and Accept Quote product');
   return await apiRequest('POST','/xoms-api',params)
   return resp;
}

export const decorations = async (params) => {
   console.log('create and update decoration sets, and add decoration details ... ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const getDecorationSets = async (filters) => {
   console.log('Get decoration sets..');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const postPO = async (params) => {
   console.log('create PO, Void PO, Revise PO. ... ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const getPO = async (filters) => {
   console.log('Get PO, Is Po Available For PSPO. ... ');
   return await apiRequest('GET', '/xoms-api' + getQstring(filters));
}

export const lineitems = async (params) => {
   console.log('Get, Add, Update, Delete line Items. ... ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const getAffiliateSalesRepAndOperatorListing = async (filters) => {
   console.log('get affiliate, salesRep and operator listing.', filters);
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const getJobDocuments = async (filters) => {
   console.log('List job documents ');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const presentations = async (params) => {
   console.log('presentations..... ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const postNote = async (params) => {
   console.log('Notes..... ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const postReminder = async (params) => {
   console.log('Reminder..... ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const getNote = async (filters) => {
   console.log('Get Notes ');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}
export const getXSource = async (filters) => {
   console.log('Get XSource ');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}
export const getSageProducts = async (filters) => {
   console.log('Get Sage Products ');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const testSageconnections = async (params) => {
   console.log('Test Sage Connection ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const getReminder = async (filters) => {
   console.log('Get Reminders ');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const guestGetPresentations = async (filters) => {
   console.log('Presentation API');
   var resp = await apiRequest('GET', '/guest-api' + getQstring(filters));
   return resp;
}

export const guestPresentations = async (params) => {
   console.log('presentations..... ');
   return await apiRequest('POST', '/guest-api', params);
}

export const getCustomerCode = async (params) => {
   console.log('Get Customer code ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const ShippingAndBillingCustomer = async (params) => {
   console.log('Create, Update Shipping/Billing Customer ... ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const getBundledPo = async (filters) => {
   console.log('Get available items, Get Alternate Address, Get Default Setting, ' + 
   'Get Fullfillment List and Get Bundled PO Suggestion Carrier List  for Bundled PO APIs');
   var resp = await apiRequest('GET', '/xoms-api' + getQstring(filters));
   return resp;
}

export const postBundledPo = async (params) => {
   console.log('Create, Add Bundled PO Address, Update Default Setting of Bunlded PO, ' +
   ' Update Bundled PO Default Address and Update Bundled PO Address Bundled PO APIs ');
   var resp = await apiRequest('POST', '/xoms-api', params);
   return resp;
}

export const postDispute = async (params) => {
   console.log('create Dispute, Edit Dispute. ... ');
   return await apiRequest('POST', '/xoms-api', params);
}

export const getDispute = async (filters) => {
   console.log('Get Dispute, List Dispute. ... ');
   return await apiRequest('GET', '/xoms-api' + getQstring(filters));
}

var dbResult;
/**
 * Convert JSON string to Object.
 * Parse ony if it is valid JSON string else return same string.
 */
export const jsonparse = (s) => {

   // If already object or null or undefined, return as it is.
   if (typeof s !== 'string') return s;
   if (!s) return s;

   try {
      let obj = JSON.parse(s);
      return obj;
   } catch (e) {
      return s;
   }
}


/**
 * JSON stringify better formatted for human consumption.
 */
export const jsonstringify = (s) => {
   // indent spaces: 2
   if (typeof s === 'string') return s;
   return JSON.stringify(s, null, 2);
}

/**
 * Convert API result to look better to display.
 * Typical client side API response received looks like below:
 *    {
 *      statusCode: 200,    // All responses must have this.
 *      data:   "...string data...May be json.",  // Optional.
 *      error:  "...some error message..."  
 *                               // Client side error messages.
 *    }
 *
 * Typical data is a JSON string of data object which looks like below:
 *
 *  {
 *    result: "...success...result..string_or_object...",  // optional.
 *    error: "...api specific error data...",
 *    somekey: "some-value"  // API specific more data as needed.
 *  }
 *
 *  When you do JSON.stringify(repsonse), the response.data is a 
 *  nested JSON string which looks ugly to print. 
 *  So convert response.data from string to object only for printing.
 *
 *  Also, the response.data.result also may be a json string.
 *  Convert this to object if possible for better printing as well.
 */
export const formatResponse = (res) => {
   if (res) {
      res = jsonparse(res);
      if (res.data) {
         res.data = jsonparse(res.data);
         if (res.data.result)
            res.data.result = jsonparse(res.data.result);
      }
   }
   return jsonstringify(res);
}

/*
 * Usage:  await sleep(5000); // Wait for 5 seconds.
 */
export const sleep = (millisecs) => {
   return new Promise(resolve => setTimeout(resolve, millisecs));
}

/**
 * Get current date
 */
export const currentDate = () => {
   var today = new Date();
   var dd = String(today.getDate());
   var mm = String(today.getMonth() + 1); //January is 0!
   var yyyy = today.getFullYear();
   var today = mm + '/' + dd + '/' + yyyy;
   return today
}

/**
 * Get future or previous date
 */
export const futurePreviousDate = (NumberOfdays) => {
   var today = new Date();
   today.setDate(today.getDate() + NumberOfdays);
   var dd = String(today.getDate());
   var mm = String(today.getMonth() + 1);
   var yyyy = today.getFullYear();
   var targetDate = mm + '/' + dd + '/' + yyyy;
   return targetDate
}

/**
 * Get current time
 */
export const currentTime = () => {
   var today = new Date();
   var time = today.getHours() + ":"
      + today.getMinutes() + ":" + today.getSeconds();
   return time
}

/**
 * Get current date yyyy_mm_dd
 */
export const currentDate_yyyy_mm_dd = () => {
   var today = new Date();
   var dd = String(today.getDate());
   var mm = String(today.getMonth() + 1); //January is 0!
   var yyyy = today.getFullYear();
   today = yyyy + '-' + mm + '-' + dd;
   return today
}

/**
 * Get current date mm/dd/yyyy
 */
export const currentDate_mm_dd_yyyy = () => {
   var today = new Date();
   var dd = String(today.getDate());
   var mm = String(today.getMonth() + 1); //January is 0!
   var yyyy = today.getFullYear();

   
   var mmChars = mm.split('');
  var ddChars = dd.split('');

  // var today = yyyy + '-' + mm + '-' + dd;
   var today = (mmChars[1]?mm:"0"+mmChars[0]) + '/' + (ddChars[1]?dd:"0"+ddChars[0]) + '/' + yyyy;

   return today
}

/**
 * Get future or previous date with format yyyy_mm_dd
 */
export const futurePreviousDate_yyyy_mm_dd = (NumberOfdays) => {
   var today = new Date();
   today.setDate(today.getDate() + NumberOfdays);
   var dd = String(today.getDate());
   var mm = String(today.getMonth() + 1);
   var yyyy = today.getFullYear();

   var mmChars = mm.split('');
  var ddChars = dd.split('');

  // var targetDate = yyyy + '-' + mm + '-' + dd;
   var targetDate = yyyy + '-' +(mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
   return targetDate
}