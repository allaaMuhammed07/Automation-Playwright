import {Reporter} from "@playwright/test/reporter"
import * as fs from 'fs'

class MyReport implements Reporter{
    //at the beginning of test execution we will console log the number of tests that will be executed
    onBegin(config, suite){
        console.log(`Execution of ${suite.allTests().length} tests`);
    }

    //at the end we want to know the status of the executed tests
    onEnd(results) {
        console.log(`Execution finished with status of ${results.status}`);
    }

    onTestBegin(test){
        console.log(`Execution of ${test.title} started`);
    }

    onTestEnd(test, result){
        const exectTime = result.duration;

        const data = {
            test: test.title,
            status: result.status,
            executionTime: exectTime,
            errors: result.errors
        }
        const dataToString = JSON.stringify(data, null, 2);
        console.log(dataToString)

        fs.writeFileSync("tests-results.json", dataToString)
    }
}

export default MyReport