const config = {

  /** ---------------------------- DEV Environment---------------------- */

  region: "us-east-1",
  apiHost: "alt19r8f4i.execute-api.us-east-1.amazonaws.com",  //for dev
  apiHosts: {
    core: "alt19r8f4i.execute-api.us-east-1.amazonaws.com",     //for dev
    payment: "zwl23tsn04.execute-api.us-east-1.amazonaws.com"   //for dev
  },
  stage: "dev"               //for DEV : "dev"
}

/** ---------------------------- QA Environment---------------------- */

// region: "us-east-1",
//    apiHost: "78qc901x4k.execute-api.us-east-1.amazonaws.com",  //for qa
//   apiHosts: {
//        core: "78qc901x4k.execute-api.us-east-1.amazonaws.com",     //for qa
//         payment: "8mu8ldxmjd.execute-api.us-east-1.amazonaws.com"   //for qa
//   },
//     stage: "test"               //for QA : "test"
// }



module.exports = config;  