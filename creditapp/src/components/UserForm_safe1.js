import React, { Component } from 'react';
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types';
import axios from 'axios';
//import bcrypt from 'react-native-bcrypt';
//import isaac from 'isaac';

//import encrypt from "react-encrypt";
//import { encrypt, decrypt } from "react-native-simple-encryption";

//components
import ApplicantMainDetails from "./ApplicantMain";
import ApplicantIncomeDetails from "./ApplicantIncome";
import CoApplicantMainDetails from "./CoApplicantMain";
import CoApplicantIncome from "./CoApplicantIncome";
import Confirm from "./ConfirmAll";
import Success from "./Success";

//other assets

import globalVars from '../globals';

//import SignaturePad from "./SignaturePad";

var CryptoJS = require("crypto-js");
var unlockAll = "sst-orbit-lynchpin"

export class UserForm extends Component {

    constructor(props) {
        super(props);

        this.testStateData = this.testStateData.bind(this);
        this.submitApplication = this.submitApplication.bind(this);
        this.logEncryptValues = this.logEncryptValues.bind(this);
        this.fullEncryptTest = this.fullEncryptTest.bind(this);

        this.state = {
            userAlias: 'demouser',
            step: 1,
            app_key: uuidv4(),
            createdBy: 'demouser',
            lastupdatedBy: 'demouser',
            pri_firstName: '',
            pri_lastName: '',
            pri_middleName: '',
            pri_ssn: '',
            pri_birthDate: '',
            pri_driverLicense: '',
            pri_dl_DateIssued: '', 
            pri_dl_DateExpires: '',
            pri_address: '',
            pri_city: '',
            pri_state: '',
            pri_zip: '',
            pri_homePhone: '',
            pri_cellPhone: '',
            pri_email: '', 
            pri_employerName: '',
            pri_occupation: '',
            pri_employerPhone: '',
            pri_employerTenure: '',
            pri_employerAddress: '',
            pri_grossIncome: '',
            pri_otherSource: '',
            pri_otherIncome: '',
            pri_signature: '',
            sec_firstName: '',
            sec_lastName: '',
            sec_middleName: '',
            sec_ssn: '',
            sec_birthDate: '',
            sec_driverLicense: '',
            sec_dl_DateIssued: '', 
            sec_dl_DateExpires: '',
            sec_address: '',
            sec_city: '',
            sec_state: '',
            sec_zip: '',
            sec_homePhone: '',
            sec_cellPhone: '',
            sec_email: '',
            sec_employerName: '',
            sec_occupation: '',
            sec_employerPhone: '',
            sec_employerTenure: '',
            sec_employerAddress: '',
            sec_grossIncome: '',
            sec_otherSource: '',
            sec_otherIncome: '',
            sec_signature: '',
            ownRent: '',
            timeResidence: '',
            monthlyPayment: '',
            previousAddress: ''

        }
    }


    componentDidMount() {
        console.log("current app");
        console.log(this.props.match.params.aid);
        /*
        if(typeof this.props.application !== 'undefined' ) {
            this.state = application
        }
        */
    }

    //Proceed to the next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }

    //Return to the previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }

    //Handle fields change
    handleChange = input => e => {
        if(e.target.value === "") {
            e.target.error = true;
        } else {
            this.setState({
                [input]: e.target.value
            })
        }
        
    }

    logEncryptValues() {
        console.log("encrypt attempt");
        //pri_ssn
        console.log(this.state.pri_ssn);
        /*
        var salt = bcrypt.hashSync('popular', 10);
        console.log(salt);
        var unsalt = bcrypt.compareSync('popular', salt);
        console.log(unsalt);
        */
    }


    fullEncryptTest() {
        const payload = {
            app_key: this.state.app_key,
            createdBy: this.state.createdBy,
            lastupdatedBy: this.state.lastupdatedBy,
            pri_firstName: this.state.pri_firstName,
            pri_lastName: this.state.pri_lastName,
            pri_middleName: this.state.pri_middleName,
            pri_ssn: this.state.pri_ssn,
            pri_birthDate: this.state.pri_birthDate,
            pri_driverLicense: this.state.pri_driverLicense,
            pri_dl_DateIssued: this.state.pri_dl_DateIssued, 
            pri_dl_DateExpires: this.state.pri_dl_DateExpires,
            pri_address: this.state.pri_address,
            pri_city: this.state.pri_city,
            pri_state: this.state.pri_state,
            pri_zip: this.state.pri_zip,
            pri_homePhone: this.state.pri_homePhone,
            pri_cellPhone: this.state.pri_cellPhone,
            pri_email: this.state.pri_email, 
            pri_employerName: this.state.pri_employerName,
            pri_occupation: this.state.pri_occupation,
            pri_employerPhone: this.state.pri_employerPhone,
            pri_employerTenure: this.state.pri_employerTenure,
            pri_employerAddress: this.state.pri_employerAddress,
            pri_grossIncome: this.state.pri_grossIncome,
            pri_otherSource: this.state.pri_otherSource,
            pri_otherIncome: this.state.pri_otherIncome,
            pri_signature: this.state.pri_signature,
            sec_firstName: this.state.sec_firstName,
            sec_lastName: this.state.sec_lastName,
            sec_middleName: this.state.sec_middleName,
            sec_ssn: this.state.sec_ssn,
            sec_birthDate: this.state.sec_birthDate,
            sec_driverLicense: this.state.sec_driverLicense,
            sec_dl_DateIssued: this.state.sec_dl_DateIssued, 
            sec_dl_DateExpires: this.state.sec_dl_DateExpires,
            sec_address: this.state.sec_address,
            sec_city: this.state.sec_city,
            sec_state: this.state.sec_state,
            sec_zip: this.state.sec_zip,
            sec_homePhone: this.state.sec_homePhone,
            sec_cellPhone: this.state.sec_cellPhone,
            sec_email: this.state.sec_email,
            sec_employerName: this.state.sec_employerName,
            sec_occupation: this.state.sec_occupation,
            sec_employerPhone: this.state.sec_employerPhone,
            sec_employerTenure: this.state.sec_employerTenure,
            sec_employerAddress: this.state.sec_employerAddress,
            sec_grossIncome: this.state.sec_grossIncome,
            sec_otherSource: this.state.sec_otherSource,
            sec_otherIncome: this.state.sec_otherIncome,
            sec_signature: this.state.sec_signature,
            ownRent: this.state.ownRent,
            timeResidence: this.state.timeResidence,
            monthlyPayment: this.state.monthlyPayment,
            previousAddress: this.state.previousAddress
        }

        //set bcrypt fallback
        /*
        bcrypt.setRandomFallback((len) => {
            const buf = new Uint8Array(len);
        
            return buf.map(() => Math.floor(isaac.random() * 256));
        });
        */
        console.log(payload);

        Object.keys(payload).forEach(key => {
            var d = key.includes("Date");
            var b = key.includes("By");
            var k = key.includes("key");
            var e = payload[key] === '' ? true : false;
            var l = payload[key].length > 55 ? true : false;
            if (!b && !d && !e && !l && !k) {
                //var keyValue = bcrypt.hashSync(payload[key], 6);
                var ciphertext = CryptoJS.AES.encrypt(payload[key], unlockAll).toString();
            } else {
                var ciphertext = payload[key];
            }
            payload[key] = ciphertext;
          });

        console.log(payload);
    }

    submitApplication() {
        const localConn = globalVars.localServPort+'add-app';
        const remoteConn = globalVars.remoteServPort+'add-app';
        //const localConn = globalVars.localServPort+'db/add-app';
        //const remoteConn = globalVars.remoteServPort+'db/add-app';

        //determine which string to use based isLocalConn boolean
        const selectConn = globalVars.isLocalConn ? localConn : remoteConn;
        console.log(selectConn);

        const payload = {
            app_key: this.state.app_key,
            createBy: this.state.createdBy,
            lastupdatedBy: this.state.lastupdatedBy,
            pri_firstName: this.state.pri_firstName,
            pri_lastName: this.state.pri_lastName,
            pri_middleName: this.state.pri_middleName,
            pri_ssn: this.state.pri_ssn,
            pri_birthDate: this.state.pri_birthDate,
            pri_driverLicense: this.state.pri_driverLicense,
            pri_dl_DateIssued: this.state.pri_dl_DateIssued, 
            pri_dl_DateExpires: this.state.pri_dl_DateExpires,
            pri_address: this.state.pri_address,
            pri_city: this.state.pri_city,
            pri_state: this.state.pri_state,
            pri_zip: this.state.pri_zip,
            pri_homePhone: this.state.pri_homePhone,
            pri_cellPhone: this.state.pri_cellPhone,
            pri_email: this.state.pri_email, 
            pri_employerName: this.state.pri_employerName,
            pri_occupation: this.state.pri_occupation,
            pri_employerPhone: this.state.pri_employerPhone,
            pri_employerTenure: this.state.pri_employerTenure,
            pri_employerAddress: this.state.pri_employerAddress,
            pri_grossIncome: this.state.pri_grossIncome,
            pri_otherSource: this.state.pri_otherSource,
            pri_otherIncome: this.state.pri_otherIncome,
            pri_signature: this.state.pri_signature,
            sec_firstName: this.state.sec_firstName,
            sec_lastName: this.state.sec_lastName,
            sec_middleName: this.state.sec_middleName,
            sec_ssn: this.state.sec_ssn,
            sec_birthDate: this.state.sec_birthDate,
            sec_driverLicense: this.state.sec_driverLicense,
            sec_dl_DateIssued: this.state.sec_dl_DateIssued, 
            sec_dl_DateExpires: this.state.sec_dl_DateExpires,
            sec_address: this.state.sec_address,
            sec_city: this.state.sec_city,
            sec_state: this.state.sec_state,
            sec_zip: this.state.sec_zip,
            sec_homePhone: this.state.sec_homePhone,
            sec_cellPhone: this.state.sec_cellPhone,
            sec_email: this.state.sec_email,
            sec_employerName: this.state.sec_employerName,
            sec_occupation: this.state.sec_occupation,
            sec_employerPhone: this.state.sec_employerPhone,
            sec_employerTenure: this.state.sec_employerTenure,
            sec_employerAddress: this.state.sec_employerAddress,
            sec_grossIncome: this.state.sec_grossIncome,
            sec_otherSource: this.state.sec_otherSource,
            sec_otherIncome: this.state.sec_otherIncome,
            sec_signature: this.state.sec_signature,
            ownRent: this.state.ownRent,
            timeResidence: this.state.timeResidence,
            monthlyPayment: this.state.monthlyPayment,
            previousAddress: this.state.previousAddress
        }

        //set bcrypt fallback
        /*
        bcrypt.setRandomFallback((len) => {
            const buf = new Uint8Array(len);
        
            return buf.map(() => Math.floor(isaac.random() * 256));
        });
        */

        Object.keys(payload).forEach(key => {
            var d = key.includes("Date");
            var k = key.includes("key");
            var e = payload[key] === '' ? true : false;
            var l = payload[key].length > 55 ? true : false;
            if (!d && !e && !l && !k) {
                //var keyValue = bcrypt.hashSync(payload[key], 6);
                var ciphertext = CryptoJS.AES.encrypt(payload[key], unlockAll).toString();
            } else {
                var ciphertext = payload[key];
            }
            payload[key] = ciphertext;
          });

        console.log(payload);
        /*
        const test_payload = {
            app_key: "12345",
            pri_firstName: "dumbass",
            pri_lastName: "app"
        }
*/
        axios.post(selectConn, payload)
            .then(res => {
                console.log(res.data)
                this.nextStep();
            })
            .catch(err => {
                console.log(err)
                //console.log(test_payload)
            })
            /*
        this.setState ({
            
        });
        */
        console.log(`Form submitted`);
    }

    testStateData() {
        this.setState({
        pri_firstName: 'Harry',
        pri_lastName: 'Henderson',
        pri_middleName: 'R',
        pri_ssn: '123-45-6789',
        pri_birthDate: '1979-02-30',
        pri_driverLicense: 'H2342342342',
        pri_dl_DateIssued: '2013-09-08', 
        pri_dl_DateExpires: '2021-09-08',
        pri_address: '24324 Rodeo Drive',
        pri_city: 'Beverly Hills',
        pri_state: 'CA',
        pri_zip: '13123',
        pri_homePhone: '234-454-8989',
        pri_cellPhone: '234-454-3354',
        pri_email: 'harry@ca.gov', 
        pri_employerName: 'State of California',
        pri_occupation: 'Tax collector',
        pri_employerPhone: '901-232-3434',
        pri_employerTenure: '2 years',
        pri_employerAddress: '34 Wiltshire Blvd.',
        pri_grossIncome: '123990',
        pri_otherSource: 'Alimony',
        pri_otherIncome: '24000',
        pri_signature: 'Harry Henderson',
        sec_firstName: 'Margaret',
        sec_lastName: 'Henderson',
        sec_middleName: '',
        sec_ssn: '343-67-5665',
        sec_birthDate: '1979-02-30',
        sec_driverLicense: 'H2342342342',
        sec_dl_DateIssued: '2013-09-08', 
        sec_dl_DateExpires: '2022-09-08',
        sec_address: '24324 Rodeo Drive',
        sec_city: 'Beverly Hills',
        sec_state: 'CA',
        sec_zip: '13123',
        sec_homePhone: '234-454-8989',
        sec_cellPhone: '234-454-8989',
        sec_email: 'mhenderson@gmail.com',
        sec_employerName: 'Self-employed',
        sec_occupation: 'Caterer',
        sec_employerPhone: '234-454-8989',
        sec_employerTenure: '234-454-8989',
        sec_employerAddress: '24324 Rodeo Drive',
        sec_grossIncome: '23400',
        sec_otherSource: '',
        sec_otherIncome: '',
        sec_signature: 'Margaret Henderson',
        ownRent: 'Own',
        timeResidence: '2',
        monthlyPayment: '2345',
        previousAddress: ''
        })
    }
    
    render() {
        const {step} = this.state;
        //variables for ApplicantMain
        const {app_key, pri_firstName, pri_lastName, pri_middleName, pri_ssn, pri_birthDate, pri_driverLicense, pri_dl_DateIssued, pri_dl_DateExpires, pri_address, pri_city, pri_state, pri_zip, pri_homePhone, pri_cellPhone, pri_email, 
            pri_employerName, pri_occupation, pri_employerPhone, pri_employerTenure, pri_employerAddress, pri_grossIncome, pri_otherSource, pri_otherIncome, pri_signature,
            sec_firstName, sec_lastName, sec_middleName, sec_ssn, sec_birthDate, sec_driverLicense, sec_dl_DateIssued, sec_dl_DateExpires, sec_address, sec_city, sec_state, sec_zip, sec_homePhone, sec_cellPhone, sec_email, 
            sec_employerName, sec_occupation, sec_employerPhone, sec_employerTenure, sec_employerAddress, sec_grossIncome, sec_otherSource, sec_otherIncome, sec_signature,
            ownRent, timeResidence,monthlyPayment, previousAddress} 
            = this.state;

        const appValues = {app_key, pri_firstName, pri_lastName, pri_middleName, pri_ssn, pri_birthDate, pri_driverLicense, pri_dl_DateIssued, pri_dl_DateExpires, pri_address, pri_city, pri_state, pri_zip, pri_homePhone, pri_cellPhone, pri_email, 
            pri_employerName, pri_occupation, pri_employerPhone, pri_employerTenure, pri_employerAddress, pri_grossIncome, pri_otherSource, pri_otherIncome, pri_signature,
            sec_firstName, sec_lastName, sec_middleName, sec_ssn, sec_birthDate, sec_driverLicense, sec_dl_DateIssued, sec_dl_DateExpires, sec_address, sec_city, sec_state, sec_zip, sec_homePhone, sec_cellPhone, sec_email, 
            sec_employerName, sec_occupation, sec_employerPhone, sec_employerTenure, sec_employerAddress, sec_grossIncome, sec_otherSource, sec_otherIncome, sec_signature,
            ownRent, timeResidence,monthlyPayment, previousAddress};
        //variables for ApplicantIncome

        
        
        switch(step) {
            /*
            case 1:
                return (
                    <SignaturePad
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        values = {appValues}
                    />
                )
            */
            case 1: 
                return (
                    <ApplicantMainDetails
                        nextStep = {this.nextStep}
                        handleChange = {this.handleChange}
                        logEncrypted = {this.fullEncryptTest}
                        values = {appValues}
                    />
                )
            
            case 2:
                return (
                    <ApplicantIncomeDetails
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        values = {appValues}
                    />
                )
            
            case 3: 
                return (
                    <CoApplicantMainDetails
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        values = {appValues}
                    />
                )

            case 4: 
                return (
                    <CoApplicantIncome
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        values = {appValues}
                    />
                )


            case 5:
                    return (
                        <Confirm
                            nextStep = {this.nextStep}
                            prevStep = {this.prevStep}
                            loadTest = {this.testStateData}
                            logEncrypted = {this.fullEncryptTest}
                            submitApp = {this.submitApplication}
                            values = {appValues}
                        />
                    )
            /*
            case 6:
                return (
                    <SignaturePad
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        values = {appValues}
                    />
                )
            */
            case 6:
                return(
                    <Success
                        alias = {this.state.userAlias}
                        sentApp = {this.state.app_key}
                    />
                )
                

            default:
                return(
                    <div>Failure</div>
                )
        }
    }
}

export default UserForm
