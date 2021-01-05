describe('List Job documents Apis validations .......', () => {

    it('Validate the success message of get job documents of given job id which is having POs.', async () => {

        await testLib.login(username, password);

        let list_job_documents = await testLib.getJobDocuments({
            action: list_job_doc_action,
            jobId: existedJob
        });

        respInJson = testLib.jsonparse(list_job_documents);
        data = testLib.jsonparse(respInJson.data);
        var documentsLength = (data.result).length,
            i;

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        if (documentsLength > 0) {

            expect(data.result[0]).to.have.haveOwnProperty('doc_id');
            console.log("\n Validated the 'doc_id' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('jobId');
            console.log("\n Validated the 'jobId' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('doc_type_code');
            console.log("\n Validated the 'doc_type_code' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('doc_type');
            console.log("\n Validated the 'doc_type' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('description');
            console.log("\n Validated the 'description' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('amount');
            console.log("\n Validated the 'amount' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('number');
            console.log("\n Validated the 'number' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('operator_code');
            console.log("\n Validated the 'operator_code' field is displayed.");

            /* As this field need to ignore. This will be removing in future....  */
            // expect(data.result[0]).to.have.haveOwnProperty('autodraft_status');
            // console.log("\n Validated the 'autodraft_status' field is displayed.");


            for (i = 0; i < documentsLength; i++) {
                expect(existedJob).to.equal(data.result[i].jobId);
                console.log("\n Validated the 'jobId' : " + existedJob);

                expect(documentTypeCodes[1]).to.equal(data.result[i].doc_type_code);
                console.log("\n Validated the 'doc_type_code' : " + documentTypeCodes[1]);

                expect(documentTypes[2]).to.equal(data.result[i].doc_type);
                console.log("\n Validated the 'doc_type_code' : " + documentTypes[2]);

                expect(data.result[i].amount).to.not.equal(null);
                console.log("\n Validated the 'amount' : " + data.result[i].amount);
                var number = data.result[i].number,
                    flag = false
                if (number != null) {
                    flag = true
                }
                expect(flag).to.equal(true);
                console.log("\n Validated the 'number' : " + number);
            }

            expect(documentsLength).to.equal(data.thisCount);
            console.log("\n Validated the number of documents, and thisCount value is same : " + documentsLength);
        }
        tc_title = 'Validated the success message of get job documents of given job id which is having POs.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            jobId: existedJob,
            numberOfDocuments: documentsLength
        };

    }).timeout(200000);

    it('Validate the success message of get job documents of given job id which is having Invoice.', async () => {

        await testLib.login(username, password);

        let resp = await testLib.listJobs({
            status: expJobStatusFilters[3]
        })
        respInJson = testLib.jsonparse(resp);
        data = testLib.jsonparse(respInJson.data);
        existedJob = data.result.jobs[0].jobId;


        let list_job_documents = await testLib.getJobDocuments({
            action: list_job_doc_action,
            jobId: existedJob
        });

        respInJson = testLib.jsonparse(list_job_documents);
        data = testLib.jsonparse(respInJson.data);
        var documentsLength = (data.result).length,
            i;

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        if (documentsLength > 0) {

            expect(data.result[0]).to.have.haveOwnProperty('doc_id');
            console.log("\n Validated the 'doc_id' is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('jobId');
            console.log("\n Validated the 'jobId' is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('doc_type_code');
            console.log("\n Validated the 'doc_type_code' is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('doc_type');
            console.log("\n Validated the 'doc_type' is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('description');
            console.log("\n Validated the 'description' is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('amount');
            console.log("\n Validated the 'amount' is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('number');
            console.log("\n Validated the 'number' is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('operator_code');
            console.log("\n Validated the 'operator_code' is displayed.");

            /* This field need to ignore. This will be removing in future....  */
            // expect(data.result[0]).to.have.haveOwnProperty('autodraft_status');
            // console.log("\n Validated the 'autodraft_status' is displayed.");

            for (i = 0; i < documentsLength; i++) {
                expect(existedJob).to.equal(data.result[i].jobId);
                console.log("\n Validated the 'jobId' is " + existedJob);
                var documentTypeCode = '',
                    documentType = '',
                    act_documentTypeCode = data.result[i].doc_type_code,
                    number,
                    j = 1,
                    expectedNum = "00" + j;
                if (j >= 10) {
                    expectedNum = "0" + j;
                }

                switch (act_documentTypeCode) {

                    case 'INV':
                        documentTypeCode = documentTypeCodes[0];
                        documentType = documentTypes[0];
                        number = '';
                        break;

                    case 'PCO':
                        documentTypeCode = documentTypeCodes[1];
                        documentType = documentTypes[2];
                        number = expectedNum;
                        break;

                    case 'CAK':
                        documentTypeCode = documentTypeCodes[2];
                        documentType = documentTypes[3];
                        number = '';
                        break;

                    default:
                        documentTypeCode = 'document type code are not valid.'
                        assert.fail;
                };
                expect(documentTypeCode).to.equal(act_documentTypeCode);
                console.log("\n Validated the 'doc_type_code' is " + documentTypeCodes[0]);

                if (act_documentTypeCode == 'INV') {
                    var docType = data.result[i].doc_type,
                        flag = false
                    if ((docType == documentTypes[0])) {
                        flag = true
                        documentType = documentTypes[0]
                    }
                    else if (docType == documentTypes[1]) {
                        flag = true
                        documentType = documentTypes[1]
                    }
                    expect(true).to.equal(flag);
                    console.log("\n Validated the 'doc_type_code' is " + documentType);
                }

                expect(data.result[i].amount).to.not.equal(null);
                console.log("\n Validated the 'amount' is " + data.result[i].amount);

                expect(number).to.equal(data.result[i].number);
                console.log("\n Validated the 'number' is empty.");
            }

            expect(documentsLength).to.equal(data.thisCount);
            console.log("\n Validated the number of documents, and thisCount value is same : " + documentsLength);
        }
        tc_title = 'Validated the success message of get job documents of given job id which is having Invoice.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            jobId: existedJob,
            numberOfDocuments: documentsLength
        };

    }).timeout(200000);

    it('Validate the success message of get job documents of given job id which is having Draft.', async () => {

        await testLib.login(username, password);

        let resp = await testLib.listJobs({
            status: expJobStatusFilters[7]
        })
        respInJson = testLib.jsonparse(resp);
        data = testLib.jsonparse(respInJson.data);
        existedJob = data.result.jobs[0].jobId;

        let list_job_documents = await testLib.getJobDocuments({
            action: list_job_doc_action,
            jobId: existedJob
        });

        respInJson = testLib.jsonparse(list_job_documents);
        data = testLib.jsonparse(respInJson.data);
        var documentsLength = (data.result).length,
            i;

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        if (documentsLength > 0) {

            expect(data.result[0]).to.have.haveOwnProperty('doc_id');
            console.log("\n Validated the 'doc_id' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('jobId');
            console.log("\n Validated the 'jobId' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('doc_type_code');
            console.log("\n Validated the 'doc_type_code' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('doc_type');
            console.log("\n Validated the 'doc_type' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('description');
            console.log("\n Validated the 'description' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('amount');
            console.log("\n Validated the 'amount' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('number');
            console.log("\n Validated the 'number' field is displayed.");

            expect(data.result[0]).to.have.haveOwnProperty('operator_code');
            console.log("\n Validated the 'operator_code' field is displayed.");

            /* As this field need to ignore. This will be removing in future....  */
            // expect(data.result[0]).to.have.haveOwnProperty('autodraft_status');
            // console.log("\n Validated the 'autodraft_status' field is displayed.");
            var documentTypeCode = '',
                documentType = '',
                act_documentTypeCode,
                number,
                flag = false
            for (i = 0; i < documentsLength; i++) {
                expect(existedJob).to.equal(data.result[i].jobId);
                console.log("\n Validated the 'jobId' : " + existedJob);
                act_documentTypeCode = data.result[i].doc_type_code

                switch (act_documentTypeCode) {

                    case 'INV':
                        documentTypeCode = documentTypeCodes[0];
                        documentType = documentTypes[1]
                        number = data.result[i].number;
                        if (number == '')
                            flag = true
                        break;

                    case 'PCO':
                        documentTypeCode = documentTypeCodes[1];
                        documentType = documentTypes[2];
                        number = data.result[i].number;
                        if (number != null)
                            flag = true
                        break;

                    case 'CAK':
                        documentTypeCode = documentTypeCodes[2];
                        documentType = documentTypes[3]
                        number = data.result[i].number;
                        if (number == '')
                            flag = true
                        break;

                    default:
                        documentTypeCode = 'document type code is not valid.'
                        documentType = 'document type is not valid.'
                        assert.fail;
                };

                expect(documentTypeCode).to.equal(act_documentTypeCode);
                console.log("\n Validated the 'doc_type_code' : " + documentTypeCode);

                expect(documentType).to.equal(data.result[i].doc_type);
                console.log("\n Validated the 'doc_type_code' : " + documentType);

                expect(data.result[i].amount).to.not.equal(null);
                console.log("\n Validated the 'amount' : " + data.result[i].amount);

                expect(flag).to.equal(true);
                console.log("\n Validated the 'number' : " + number);
            }
        }
        expect(documentsLength).to.equal(data.thisCount);
        console.log("\n Validated the number of documents, and thisCount value is same : " + documentsLength);

        tc_title = 'Validated the success message of get job documents of given job id which is having Draft.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            jobId: existedJob,
            numberOfDocuments: documentsLength
        };

    }).timeout(200000);

    it("Validated the error message with missed action field of 'get job documents'.", async () => {

        await testLib.login(username, password);

        let affiliate_list_job_documents = await testLib.getJobDocuments({
            jobId: existedJob
        });
        respInJson = testLib.jsonparse(affiliate_list_job_documents);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missing_action_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missing_action_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message with missed action field of 'get job documents'.";
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            missed_action_errorMsg: missing_action_errorMsg,
            missed_action_errorCode: errorCode_400
        };
    }).timeout(200000);

    it("Validated the error message with missed JobId field of 'get job documents'.", async () => {

        await testLib.login(username, password);

        let affiliate_list_job_documents = await testLib.getJobDocuments({
            action: list_job_doc_action
        });
        respInJson = testLib.jsonparse(affiliate_list_job_documents);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missed_jobId_errorMsg2).to.equal(data.error);
        console.log("\n Validated the error message : " + missed_jobId_errorMsg2);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message with missed jobId field of 'get job documents'.";
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            missed_jobId_errorMsg: missed_jobId_errorMsg2,
            missed_jobId_errorCode: errorCode_400
        };
    }).timeout(200000);
})