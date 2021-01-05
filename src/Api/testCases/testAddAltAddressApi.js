// describe('Add Alternate Address Api validations .......', () => {

//   it.skip('Add alternate address', async () => {

// var params = {
//   action: "create-alternate-address",
//   name: testConfig.name,
//   addressLine1: testConfig.addressLine1,
//   addressLine2: testConfig.addressLine2,
//   addressLine3: testConfig.addressLine3,
//   countryCode: testConfig.countryCode,
//   city: testConfig.city,
//   state: testConfig.state,
//   zip: testConfig.zip
// };

//     testLib.log(`Logging in as ${username} : ${password} ... `);
//     await testLib.login(username, password);

//     let resp = await testLib.addAlternateAddress(params);
//    respInJson = testLib.jsonparse(resp);
//     data = testLib.jsonparse(respInJson.data);

//     expect(successCode_200).to.equal(respInJson.statusCode);
//     console.log("\n Validated the status code :  " + successCode_200);

//     expect(respInJson).to.not.have.haveOwnProperty('error');
//     console.log("\n Validated the 'error' is not displayed.");

//     expect(data).to.have.haveOwnProperty('altAddressId');
//     console.log("\n Validated 'altAddressId' is displayed.");

//     var altAddrId = data.altAddressId,
//       flag;
//     for (var key in altAddrId) {
//       if (hasOwnProperty.call(altAddrId, key)) {
//         flag = false;
//         console.log("\n Validated 'altAddressId' is empty.");
//         break;
//       }
//       else {
//         flag = true;
//       }
//     }
//     expect(true).to.equal((flag));
//     console.log("\n Validated 'altAddressId' is added.");

//     tc_title = 'Add alternate address.';
//      values = {
//       Affiliate_user: username,
//       statusCode: successCode_200,
//       altAddressId: data.altAddressId
//     };
//   }).timeout(200000);
// });