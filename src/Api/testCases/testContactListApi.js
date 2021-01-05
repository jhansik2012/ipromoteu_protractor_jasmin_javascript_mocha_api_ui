const { assert } = require("chai");

describe('Validate List of ContactList Api validations .......', () => {

  it('Retrieve the list of contactList using keyword with Affiliate user ', async () => {

    await testLib.login(username, password);

    let resp = await testLib.listContactsList({
      action: get_contact_lists_action,
      keyWords: keyWord_test
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    var result = testLib.jsonparse(data.result[0]),
      contactLists = testLib.jsonparse(result.contactList),
      contactListsLength = contactLists.length;

    var listName = '',
      description = '',
      keywordflag = true,
      creatorFlag = true 

    if (contactListsLength > 0) {

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactList');
    console.log("\n Validated the 'contactList' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('id');
    console.log("\n Validated the 'id' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('listName');
    console.log("\n Validated the 'listName' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('description');
    console.log("\n Validated the 'description' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('contacts');
    console.log("\n Validated the 'contacts' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('creator');
    console.log("\n Validated the 'creator' is displayed.");
   
   for(var i=0; i<contactListsLength;i++)
   {
      listName = await (contactLists[i].listName);
      description = await (contactLists[i].description);

      listName = String(listName).toLowerCase();
      description = String(description).toLowerCase();
      keyWord_test = String(keyWord_test).toLowerCase();

    // if(String(contactLists[i].creator)!==(username)) {  //since we don't know weaather username and creator name should be same or not
    //   creatorFlag=false;
    //   var subData = testLib.jsonparse(contactLists[i])
    //   assert.fail("\n 'creator' name is: "+subData.creator+" different from Affiliate user: "+username);
    //  }
      if ((listName.indexOf(keyWord_test) > -1 || description.indexOf(keyWord_test) > -1)) 
        {
          keywordflag = true ;
        }
      else{
        var subData = testLib.jsonparse(contactLists[i])
        assert.fail("\n keyword: "+keyWord_test+" is not contained in listName: "+subData.listName+" or in description: "+subData.description);
        }
     } //out of for loop
     if(keywordflag) 
      console.log("\n Validated the keyword is contained in all listName or description fields.");
     // if(creatorFlag) 
     //  console.log("\n Validated the all 'creator' name is: "+username);
    
   } //out of if()
    else {
        console.log("\n Recieved empty ContactList since there are no matches for the keyword: "+keyWord_test);
    }

    tc_title = 'Retrieve the list of contactList using keyword with Affiliate user';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      KeyWord: keyWord_test,
      NumberOfContactLists: contactListsLength
    };
  }).timeout(200000);

  it('Retrieve the list of contactList without using keyword with Affiliate user', async () => {

    await testLib.login(username, password);

    let resp = await testLib.listContactsList({
      action: get_contact_lists_action
    });

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    var result = testLib.jsonparse(data.result[0]),
      contactLists = testLib.jsonparse(result.contactList),
      contactListsLength = contactLists.length,
      creatorFlag=true;

   if (contactListsLength > 0) {

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactList');
    console.log("\n Validated the 'contactList' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('id');
    console.log("\n Validated the 'id' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('listName');
    console.log("\n Validated the 'listName' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('description');
    console.log("\n Validated the 'description' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('contacts');
    console.log("\n Validated the 'contacts' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('creator');
    console.log("\n Validated the 'creator' is displayed.");

   // for(var i=0; i<contactListsLength;i++)
   //   {
   //  if(String(contactLists[i].creator)!==(username)) {
   //    creatorFlag=false;
   //    var subData = testLib.jsonparse(contactLists[i])
   //    assert.fail("\n 'creator' name is: "+subData.creator+" different from Affiliate user: "+username);
   //    }
   //  } //out of for loop
   //   if(creatorFlag) 
   //    console.log("\n Validated all 'creator' name is: "+username);
   }
   else {
        console.log("\n Recieved an empty ContactList");
    }

    tc_title = 'Retrieve the list of contactList without using keyword with Affiliate user';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      NumberOfContactLists: contactListsLength

    };
  }).timeout(200000);

  it('Retrieve the list of contactList with using an invalid keyword with Affiliate user', async () => {

    await testLib.login(username, password);

    let resp = await testLib.listContactsList({
      action: get_contact_lists_action,
      keyWords: invalid_data
    });

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

     var result = testLib.jsonparse(data.result[0]),
      contactLists = testLib.jsonparse(result.contactList),
      contactListsLength = contactLists.length,
      keywordflag=false;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactList');
    console.log("\n Validated the 'contactList' is displayed.");
     
   if (contactListsLength < 1) {

      for(var i=0; i<contactListsLength;i++)
     {
      listName = await (contactLists[i].listName);
      description = await (contactLists[i].description);

      listName = String(listName).toLowerCase();
      description = String(description).toLowerCase();
      invalid_data = String(invalid_data).toLowerCase();

      if ((listName.indexOf(invalid_data) > -1 || description.indexOf(invalid_data) > -1)) 
        {
          keywordflag = true ;
        }
      else{
        var subData = testLib.jsonparse(contactLists[i])
        assert.fail("\n keyword: "+invalid_data+" is not contained in listName: "+subData.listName+" or in description: "+subData.description);
         }
       } //out of for loop
     if(keywordflag) 
      console.log("\n Validated the KeyWord used is contained in all listName or description fields.");
    }
  else {
      console.log("\n Validated the KeyWord used Doesn't have any matches ");
     }
    tc_title = 'Retrieve list of contactList without using an invalid keyword with Affiliate user';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      keyword: invalid_data,
      NumberOfContactLists: contactListsLength
    };
  }).timeout(200000);

  it('Retrieve the list of contactList with using an empty keyword with Affiliate user', async () => {

    await testLib.login(username, password);

    let resp = await testLib.listContactsList({
      action: get_contact_lists_action,
      keyWords: ""
    });

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    var result = testLib.jsonparse(data.result[0]),
      contactLists = testLib.jsonparse(result.contactList),
      contactListsLength = contactLists.length;

   if (contactListsLength > 0) {

    expect(successCode_200).to.equal(respInJson.statusCode);

    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactList');
    console.log("\n Validated the 'contactList' is displayed.");
   
    expect(contactLists[0]).to.have.haveOwnProperty('listName');
    console.log("\n Validated the 'listName' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('description');
    console.log("\n Validated the 'description' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('contacts');
    console.log("\n Validated the 'contacts' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('creator');
    console.log("\n Validated the 'creator' is displayed.");
    
   }
   else {
        console.log("\n Recieved an empty ContactList");
    }

    tc_title = 'Retrieve the list of contactList with using an empty keyword with Affiliate user';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      NumberOfContactLists: contactListsLength
    };
  }).timeout(200000);


   it('Retrieve the list of contactList using keyword with salesRep user ', async () => {

    await testLib.login(cj_salesrepId, password);

    let resp = await testLib.listContactsList({
      action: get_contact_lists_action,
      keyWords: keyWord_test
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    var result = testLib.jsonparse(data.result[0]),
      contactLists = testLib.jsonparse(result.contactList),
      contactListsLength = contactLists.length;

    var listName = '',
      description = '',
      keywordflag = true,
      creatorFlag = true 

    if (contactListsLength > 0) {

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactList');
    console.log("\n Validated the 'contactList' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('id');
    console.log("\n Validated the 'id' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('listName');
    console.log("\n Validated the 'listName' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('description');
    console.log("\n Validated the 'description' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('contacts');
    console.log("\n Validated the 'contacts' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('creator');
    console.log("\n Validated the 'creator' is displayed.");
   
   for(var i=0; i<contactListsLength;i++)
   {
      listName = await (contactLists[i].listName);
      description = await (contactLists[i].description);

      listName = String(listName).toLowerCase();
      description = String(description).toLowerCase();
      keyWord_test = String(keyWord_test).toLowerCase();

    // if(String(contactLists[i].creator)!==(cj_salesrepId)) {  //since we don't know weaather username and creator name should be same or not
    //   creatorFlag=false;
    //   var subData = testLib.jsonparse(contactLists[i])
    //   assert.fail("\n 'creator' name is: "+subData.creator+" different from Affiliate user: "+cj_salesrepId);
    //  }
      if ((listName.indexOf(keyWord_test) > -1 || description.indexOf(keyWord_test) > -1)) 
        {
          keywordflag = true ;
        }
      else{
        var subData = testLib.jsonparse(contactLists[i])
        assert.fail("\n keyword: "+keyWord_test+" is not contained in listName: "+subData.listName+" or in description: "+subData.description);
        }
     } //out of for loop
     if(keywordflag) 
      console.log("\n Validated the keyword is contained in all listName or description fields.");
     // if(creatorFlag) 
     //  console.log("\n Validated the all 'creator' name is: "+cj_salesrepId);
    
   } //out of if()
    else {
        console.log("\n Recieved empty ContactList since there are no matches for the keyword: "+keyWord_test);
    }

    tc_title = 'Retrieve the list of contactList using keyword with salesRep user';
    values = {
      salesRep_UserName: cj_salesrepId,
      statusCode: successCode_200,
      KeyWord: keyWord_test,
      NumberOfContactLists: contactListsLength
    };
  }).timeout(200000);

  it('Retrieve the list of contactList without using keyword with salesRep user', async () => {

    await testLib.login(cj_salesrepId, password);

    let resp = await testLib.listContactsList({
      action: get_contact_lists_action
    });

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    var result = testLib.jsonparse(data.result[0]),
      contactLists = testLib.jsonparse(result.contactList),
      contactListsLength = contactLists.length,
      creatorFlag=true;

   if (contactListsLength > 0) {

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactList');
    console.log("\n Validated the 'contactList' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('id');
    console.log("\n Validated the 'id' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('listName');
    console.log("\n Validated the 'listName' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('description');
    console.log("\n Validated the 'description' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('contacts');
    console.log("\n Validated the 'contacts' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('creator');
    console.log("\n Validated the 'creator' is displayed.");

   // for(var i=0; i<contactListsLength;i++)
   //   {
   //  if(String(contactLists[i].creator)!==(cj_salesrepId)) {
   //    creatorFlag=false;
   //    var subData = testLib.jsonparse(contactLists[i])
   //    assert.fail("\n 'creator' name is: "+subData.creator+" different from Affiliate user: "+cj_salesrepId);
   //    }
   //  } //out of for loop
   //   if(creatorFlag) 
   //    console.log("\n Validated all 'creator' name is: "+cj_salesrepId);
   }
   else {
        console.log("\n Recieved an empty ContactList");
    }

    tc_title = 'Retrieve the list of contactList without using keyword with salesRep user';
    values = {
      salesRep_UserName: cj_salesrepId,
      statusCode: successCode_200,
      NumberOfContactLists: contactListsLength

    };
  }).timeout(200000);

  it('Retrieve the list of contactList with using an invalid keyword with salesRep user', async () => {

    await testLib.login(cj_salesrepId, password);

    let resp = await testLib.listContactsList({
      action: get_contact_lists_action,
      keyWords: invalid_data
    });

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

     var result = testLib.jsonparse(data.result[0]),
      contactLists = testLib.jsonparse(result.contactList),
      contactListsLength = contactLists.length,
      keywordflag=false;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactList');
    console.log("\n Validated the 'contactList' is displayed.");
     
   if (contactListsLength < 1) {

      for(var i=0; i<contactListsLength;i++)
     {
      listName = await (contactLists[i].listName);
      description = await (contactLists[i].description);

      listName = String(listName).toLowerCase();
      description = String(description).toLowerCase();
      invalid_data = String(invalid_data).toLowerCase();

      if ((listName.indexOf(invalid_data) > -1 || description.indexOf(invalid_data) > -1)) 
        {
          keywordflag = true ;
        }
      else{
        var subData = testLib.jsonparse(contactLists[i])
        assert.fail("\n keyword: "+invalid_data+" is not contained in listName: "+subData.listName+" or in description: "+subData.description);
         }
       } //out of for loop
     if(keywordflag) 
      console.log("\n Validated the KeyWord used is contained in all listName or description fields.");
    }
  else {
      console.log("\n Validated the KeyWord used Doesn't have any matches ");
     }
    tc_title = 'Retrieve list of contactList without using an invalid keyword with salesRep user';
    values = {
      salesRep_UserName: cj_salesrepId,
      statusCode: successCode_200,
      keyword: invalid_data,
      NumberOfContactLists: contactListsLength
    };
  }).timeout(200000);

  it('Retrieve the list of contactList with using an empty keyword with salesRep user', async () => {

    await testLib.login(cj_salesrepId, password);

    let resp = await testLib.listContactsList({
      action: get_contact_lists_action,
      keyWords: ""
    });

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    var result = testLib.jsonparse(data.result[0]),
      contactLists = testLib.jsonparse(result.contactList),
      contactListsLength = contactLists.length;

   if (contactListsLength > 0) {

    expect(successCode_200).to.equal(respInJson.statusCode);

    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactList');
    console.log("\n Validated the 'contactList' is displayed.");
   
    expect(contactLists[0]).to.have.haveOwnProperty('listName');
    console.log("\n Validated the 'listName' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('description');
    console.log("\n Validated the 'description' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('contacts');
    console.log("\n Validated the 'contacts' is displayed.");

    expect(contactLists[0]).to.have.haveOwnProperty('creator');
    console.log("\n Validated the 'creator' is displayed.");
    
   }
   else {
        console.log("\n Recieved an empty ContactList");
    }

    tc_title = 'Retrieve the list of contactList with using an empty keyword with salesRep user';
    values = {
      salesRep_UserName: cj_salesrepId,
      statusCode: successCode_200,
      NumberOfContactLists: contactListsLength
    };
  }).timeout(200000);

//*********************************Add/Update contact list***********************************// 
   

    it(' Verify Success message for "Add/Update contact list" - Add contact to new contact list', async () => {

     await testLib.login(username, password);
    
    var date= new Date(),
    randomNumber= await date.getMilliseconds() + date.getSeconds(),
    newListname= await "MyList"+randomNumber,
    customerCode= "BFZ-5827",
    contactId="10162"

    var add_update_contact_list_params={
     action: add_update_contactList_action,
     contactList: {
        listName: newListname,
                  },
     selectedContacts: [{
       contactId: contactId,
       customerCode: customerCode 
        }],
     deletingContacts: []
    }

    let resp = await testLib.postcontactsList(add_update_contact_list_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
   
    console.log("Above API Adds the contact to the given/new Contact list")

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

      resp = await testLib.listContactsList({
      action: get_contact_lists_action,
      keyWords: newListname
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);
    var contactList= testLib.jsonparse(result[0].contactList),
    contactListId=Number(contactList[0].id);

    var result = testLib.jsonparse(data.result[0]) 
    console.log("Using Above API Added contact is verified from the list")

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

      resp = await testLib.listContactsList({
      action: get_contact_lists_action,
      keyWords: newListname
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result = testLib.jsonparse(data.result)
    contactList = testLib.jsonparse(result[0].contactList)
    var listLength=contactList.length,
    contacts=testLib.jsonparse(contactList[0].contacts),
    contactsLength=contacts.length

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");
   
    let i=0,
    flag=false
    for(i; i<listLength ;i++)
    {
     if(contactList[i].id==contactListId){
       let j=0;
       for(j; j<contactsLength; j++){
         if(contacts[j].customerCode == customerCode && contacts[j].id == contactId){
          flag=true
          console.log("\n Verified created contact ");
          break;
         }  
        }
       if(!flag){     
       assert.fail('"Contact is not created')
       }
      }
      if(flag) break;
    }
    tc_title = ' Verify Success message for "Add/Update contact list" - Remove contact from new contact lis';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      NumberOfContacts: contactsLength
    };

   }).timeout(200000);

  it(' Verify Success message for "Add/Update contact list" - Remove contact From contact list', async () => {

    await testLib.login(username, password);
    
    var date= new Date(),
    randomNumber= await date.getMilliseconds() + date.getSeconds(),
    newListname= await "MyList"+randomNumber,
    customerCode= "BFZ-5827",
    contactId="10162"

    var add_update_contact_list_params={
     action: add_update_contactList_action,
     contactList: {
        listName: newListname,
                  },
     selectedContacts: [{
       contactId: contactId,
       customerCode: customerCode 
        }],
     deletingContacts: []
    }

    let resp = await testLib.postcontactsList(add_update_contact_list_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
   
    console.log("Above API Adds the contact to the given/new Contact list")

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

      resp = await testLib.listContactsList({
      action: get_contact_lists_action,
      keyWords: newListname
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);
    var contactList= testLib.jsonparse(result[0].contactList),
    contactListId=Number(contactList[0].id);

    var result = testLib.jsonparse(data.result[0]) 
    console.log("Using Above API Added contact is verified from the list")

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var add_update_contact_list_params={
     action: add_update_contactList_action,
     contactList: {
        id :contactListId,
        listName: newListname
                  },
     selectedContacts: [],
     deletingContacts: [{
       contactId: contactId,
       customerCode: customerCode
        }]
    }

    resp = await testLib.postcontactsList(add_update_contact_list_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    
    console.log("Above API Removes the contact from Contact list")

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

      resp = await testLib.listContactsList({
      action: get_contact_lists_action,
      keyWords: newListname
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result = testLib.jsonparse(data.result)
    contactList = testLib.jsonparse(result[0].contactList)
    var listLength=contactList.length,
    contacts=testLib.jsonparse(contactList[0].contacts),
    contactsLength=contacts.length

    console.log("Using Above API Removed contact is verified from the list")

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");
    let i=0,
    flag=true
    for(i; i<listLength ;i++)
    {
     if(contactList[i].id==contactListId){
       let j=0;
       for(j; j<contactsLength; j++){
         if(contacts[j].customerCode != customerCode || contacts[j].id != contactId){}
          else{
            flag=false
            assert.fail("Contact: "+customerCode +" is Not deleted")
            }  //else
        } //for
       if(flag)     
        console.log("\n Validated weather contact is delted or not");
      } //main if
    } //main for

    tc_title = ' Verify Success message for "Add/Update contact list" - Remove contact from new contact list';
    values = {
      Affiliate_user: username,
      statusCode: respInJson.statusCode
    };
  }).timeout(200000);

   it(' Verify Error message for "Add/Update contact list" - Add contact to new contact list without contact id', async () => {

    
    await testLib.login(username, password);
    
    var date= new Date(),
    randomNumber= await date.getMilliseconds() + date.getSeconds(),
    newListname= await "MyList"+randomNumber,
    customerCode= "BFZ-5827",
    contactId="10162"

    var add_update_contact_list_params={
     action: add_update_contactList_action,
     contactList: {
        listName: newListname,
                  },
     selectedContacts: [{
       customerCode: customerCode 
        }],
     deletingContacts: []
    }

    let resp = await testLib.postcontactsList(add_update_contact_list_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
   
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is  displayed.");

    expect(missing_contactId_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_customerId_1_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

  
    tc_title = ' Verify Error message for "Add/Update contact list" - Add contact to new contact list without contact id';
    values = {
      Affiliate_user: username,
      statusCode: respInJson.statusCode
    };
  }).timeout(200000);


 })
