import BaseModel from "./base.model";
import { get } from "./httpRequest";
import { v4 as uuidv4 } from 'uuid';
import EmailSender from './email.helper'
import Flutterwave from "./Flutterwave";
const flw = new Flutterwave();
const mailer = new EmailSender()

export default class Model extends BaseModel {

    makeResponse(status: number, message: string, data: any = null) {
        return {
            status,
            message,
            data: data !== null ? data : undefined
        };
    }

    getRandomString() {
        const uuid = uuidv4();
        return uuid.replace(/-/g, '');
    }





    async convertUsdToCurrency(usdAmount: any, targetCurrency: any) {
        console.log("SWAPPER", usdAmount, targetCurrency)
        const ratesObj = await this.selectDataQuery("rate_cache");
        const rate_object = ratesObj[0]['rate_object']
        const ratesJSON = JSON.parse(rate_object)
        const rates = ratesJSON.rates;
        // console.log("RATESINFO", rates)

        const rate = rates[targetCurrency];
        console.log("SWAPPER==>2", rate)
        let rateAmount = 0;

        if (!rate) {
            console.error("Invalid currency code or rate not available.");
            // return 0;
        } else {
            usdAmount * rate;
        }
        rateAmount = usdAmount * rate;
        console.log("SWAPPER==>3", rateAmount)
        return rateAmount;

    }

    async sendEmail(operation: string, email: string, name = "", otp = "", tableData: any = [], code: string = '') {
        try {
            return true;
            const messageBody = await this.selectDataQuery("notification_templates", `operation = '${operation}'`);
            if (messageBody.length == 0) {
                return this.makeResponse(404, "operation not found");
            }

            // Start of the unordered list
            let listHtml = "<ul>";
            // Assuming tableData is an array of objects
            tableData.forEach((item: any) => {
                listHtml += `<li>${item}</li>`;
            });
            listHtml += "</ul>";

            const message = messageBody[0]['body'];
            const subject = messageBody[0]['title'];

            const new_message = this.constructSMSMessage(message, name, otp, listHtml, code);
            mailer.sendMail(email, subject, subject, new_message);
            this.saveNotification(subject, email, message);
            return true;

        } catch (error) {
            return this.makeResponse(203, "Error fetching company");
        }
    }




    constructSMSMessage(template: string, name: string, otp: string, listHtml: any, code: string): string {
        const data: any = {
            name,
            otp,
            code,
            listHtml
        };

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                template = template.replace(new RegExp(`{${key}}`, 'g'), data[key]);
            }
        }

        return template;
    }


    async fetchCompanyById(companyId: string) {
        return await this.selectDataQuery("company", `company_id = '${companyId}'`);

    }


    generateRandom4DigitNumber() {
        const min = 100000;
        const max = 999999;

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Utility function to validate if the domain is valid
    validateDomain(domain: string) {
        // Regular expression for validating a basic domain format (e.g., example.com)
        // This regex will check for a general pattern like "example.com", without protocols, subdomains, or paths
        const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Clean the domain by removing protocols, www, and paths
        let cleanDomain = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/, '').split('/')[0];

        // Validate the cleaned domain against the regex
        return domainRegex.test(cleanDomain);
    }


    validateAndCleanDomain(domain: string) {
        let cleanDomain = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/, '').split('/')[0];
        return cleanDomain;
    }

    // Utility function to check if the email's domain matches the company's domain
    doesEmailDomainMatch(email: any, domain: any) {
        const emailDomain = email.split('@')[1];
        return emailDomain === domain;
    }
    async getDocumentByCompanyId(companyId: any, docId: string) {
        return await this.callRawQuery(`SELECT * FROM documents where owner_id = '${companyId}' AND doc_type='${docId}' AND doc_status!='expired' `);
    }

    async getUserByEmail(email: string) {
        return await this.callRawQuery(`SELECT * FROM users  where email ='${email}' `);
    }
    async getUserByPhone(email: string) {
        return await this.callRawQuery(`SELECT * FROM users  where   phone ='${email}' `);
    }

    async getUserById(userId: string) {
        return await this.callRawQuery(`SELECT * FROM users where user_id='${userId}' `);
    }

    async getLoggedInUser(staff_id: string, password: string) {
        return await this.callRawQuery(`SELECT * FROM users where user_id = '${staff_id}' AND u.password='${password}' `);
    }

    async getOTP(account_no: string,otpType: string = 'otp') {
        const user: any = await this.selectDataQuery("user_otp", `account_no = '${account_no}'`);
        let otp = this.generateRandom4DigitNumber().toString();

        if (otpType == 'code') {
            otp = this.getRandomString();
        }
        otp = "12345"
        const userInfo = {
            account_no,
            otp
        }
        if (user.length == 0) {
            const insertedUser = await this.insertData('user_otp', userInfo);
        } else {
            await this.updateData('user_otp', `account_no = '${account_no}'`, userInfo);

        }
        return otp
    }


 

    async createWallet(company_id: string, currency: string = 'USD') {
        const walletExists = await this.selectDataQuery("company_wallets", `company_id = '${company_id}'`);
        if (walletExists.length > 0) {
            return walletExists[0]['wallet_id'];
        }

        const wallet_id = this.generateRandom4DigitNumber().toString();
        const userInfo = {
            wallet_id,
            company_id,
            currency,
            running_balance: 0,
        }
        await this.insertData('company_wallets', userInfo);
        return wallet_id
    }



    async updateWalletBalance(drWallet: string, crWallet: string, amount: string, opType: string = 'transfer') {
        // Convert amount to a number for calculations
        const transferAmount = parseFloat(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            return "Invalid transfer amount.";
        }

        let drOldBalance = 0;
        if (opType == 'transfer') {
            // Check if the debit wallet exists and has sufficient balance
            const drWalletExists = await this.selectDataQuery("company_wallets", `wallet_id = '${drWallet}'`);
            if (drWalletExists.length === 0) {
                return "Debit wallet not found.";
            }
            drOldBalance = parseFloat(drWalletExists[0]['running_balance']);
            if (drOldBalance < transferAmount) {
                return "Insufficient funds in debit wallet.";
            }
        }

        // Check if the credit wallet exists
        const crWalletExists = await this.selectDataQuery("company_wallets", `wallet_id = '${crWallet}'`);
        if (crWalletExists.length === 0) {
            return "Credit wallet not found.";
        }
        const crOldBalance = parseFloat(crWalletExists[0]['running_balance']);

        // Calculate new balances
        const crNewBalance = crOldBalance + transferAmount;

        if (opType == 'transfer') {
            const drNewBalance = drOldBalance - transferAmount;
            await this.updateData('company_wallets', `wallet_id = '${drWallet}'`, { running_balance: drNewBalance.toString() });
        }
        await this.updateData('company_wallets', `wallet_id = '${crWallet}'`, { running_balance: crNewBalance.toString() });

        return "success";
    }






    async createPendingTransaction(company_id: any, user_id: string, payment_method_id: any, usd_amount: any, amount: any, currency: string, description: any, reference_id: any) {
        try {




            const name = "UNIFID"
            const email = "info@muda.exchange"
            const phone = ""

            const rsp: any = await flw.InitiateTransactionRequest(reference_id, amount, email, phone, name, currency);
            console.log("FlutterwaveTransactions", rsp)
            const rspData = JSON.parse(rsp);
            let respMessage = rspData['status'];

            if (respMessage == "success") {
                const hosted_link = rspData['data']['link'];
                respMessage = hosted_link;


                const newTransaction = {
                    company_id,
                    payment_link: hosted_link,
                    amount,
                    user_id,
                    currency,
                    usd_amount,
                    status: 'pending',
                    description,
                    reference_id
                };

                const insertedTransaction = await this.insertData('transactions', newTransaction);
                return this.makeResponse(100, "Pending transaction created successfully", newTransaction);

            } else {
                return this.makeResponse(203, "Pending creation Failed",[]);

            }

        } catch (error) {
            console.error("Error in createPendingTransaction:", error);
            return this.makeResponse(203, "Error creating transaction");
        }
    }

    async countries() {
        const rs: any = await this.callQuery(`select * from countries `);
        return rs;
    }
    async getCountryById(id: any) {
        const rs: any = await this.callQuery(`select * from countries where id='${id}' `);
        return rs;
    }




    // Function to update transaction status based on webhook confirmation
    async updateTransactionStatus(transaction_id: string, status: string) {
        try {
            if (!['completed', 'failed'].includes(status)) {
                return this.makeResponse(400, "Invalid status value");
            }

            // Check if transaction_id exists
            const transactionExists = await this.selectDataQuery("transactions", `transaction_id = '${transaction_id}'`);
            if (transactionExists.length === 0) {
                return this.makeResponse(404, "Transaction not found");
            }

            await this.updateData('transactions', `transaction_id = '${transaction_id}'`, { status: status });
            return this.makeResponse(100, "Transaction status updated successfully");
        } catch (error) {
            console.error("Error in updateTransactionStatus:", error);
            return this.makeResponse(203, "Error updating transaction status");
        }


    }


    async saveNotification(title: string, company_id: string, message: any) {
        const newUser = {
            title,
            company_id,
            message
        };
        return await this.insertData('notifications', newUser);
    }

    async getDocVerifiers(c: string) {
        return await this.callQuery(`select * from verifiers where doc_id='${c}'`);
    }



}