// Imports
var mysql = require('mysql');

// Database calss hold all the functionality of database
class Database {

    /**
     * default constructor
     */
    constructor() {
        this.database = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "fdsa@1234",

        });


    }

    /**
     * create the database and tables if not exists into DB
     */
    create_database() {

        this.database.connect((err) => {
            var sql = `
        CREATE DATABASE IF NOT EXISTS nova_db`;
            this.database.query(sql, (err, result) => {
                if (err) throw err;
                this.database.destroy()
                this.database = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "fdsa@1234",
                    database: "nova_db"
                });

                this.database.connect((err) => {
                    if (err) throw err;
                    console.log("Connected!");
                    this.createUserTable();
                    this.createCompanyTable();
                })


            });
        })
    }

    /**
     * create the user tables if not exists into DB
     */
    createUserTable() {
        var sql = `
        CREATE TABLE IF NOT EXISTS User (
        id integer PRIMARY KEY AUTO_INCREMENT,
        name text,
        email varchar(100) UNIQUE,
        company  varchar(100) UNIQUE)`;
        this.database.query(sql, function(err, result) {
            if (err) throw err;
        });

    }

    /**
     * create the company tables if not exists into DB
     */
    createCompanyTable() {

        var sql = `
        CREATE TABLE IF NOT EXISTS Company (
        id integer PRIMARY KEY AUTO_INCREMENT,
        name  varchar(100) UNIQUE,
        website varchar(100) UNIQUE,
        number_of_employees  integer,
        funding_stage text,
        industry text,
        sum_insured integer,
        family_covered boolean,
        parents_covered boolean,
        maternity_covered boolean,
        gym_membership boolean,
        free_doctor_on_call boolean,
        paid_leaves integer, 
        flexible_work_timings boolean,
        remote_option boolean
        
        )`;
        this.database.query(sql, function(err, result) {
            if (err) throw err;
        });

    }

    /**
     * Get the list of companies from DB
     * 
     * @param  {Function} resolve to be resolved 
     * @param  {Function} reject to be rejected if error occurs
     *  
     */
    getCompanyList(resolve, reject) {
        var sql = `SELECT id,name,website FROM Company;`;
        this.database.query(sql, function(err, result) {
            if (err) reject([]);
            resolve(result);
            console.log("Table retrieved");
        });

    }


    /**
     * get the company info of given company id  from DB
     * 
     * @param  {Function} resolve to be resolved 
     * @param  {Function} reject to be rejected if error occurs
     * @param  {Object} parameter object
     */
    getCompany(resolve, reject, { id }) {


        var sql = `SELECT * FROM Company where id=(?);`;
        this.database.query(sql, [id], function(err, result) {
            if (err) reject([]);
            resolve(result);
        });

    }


    /**
     * Get the competitor list of given company id from DB
     * 
     * @param  {Function} resolve to be resolved 
     * @param  {Function} reject to be rejected if error occurs
     * @param  {Object} parameter object
     */
    getCompetitorsList(resolve, reject, { id }) {
        var sql = ` 
    SELECT * FROM nova_db.company where industry = (select industry from nova_db.company where id = (?)) and id != (?) ORDER BY ABS( number_of_employees - (select number_of_employees from nova_db.company where id = (?)) )  limit 3;
     
    `;
        this.database.query(sql, [id, id, id], function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(result);
        });

    }


    /**
     * Update info of given company name into DB
     * 
     * @param  {Function} resolve to be resolved 
     * @param  {Function} reject to be rejected if error occurs
     * @param  {Object} parameter object
     */
    updateCompany(resolve, reject, { name, number_of_employees, funding_stage, industry, sum_insured, family_covered, parents_covered, maternity_covered, gym_membership, free_doctor_on_call, paid_leaves, flexible_work_timings, remote_option }) {

        var sql = 'UPDATE company set   number_of_employees = (?), funding_stage = (?), industry = (?), sum_insured = (?), family_covered = (?), parents_covered = (?), maternity_covered = (?), gym_membership = (?), free_doctor_on_call = (?), paid_leaves = (?), flexible_work_timings = (?), remote_option = (?) where name= (?)  ;'
        this.database.query(sql, [number_of_employees, funding_stage, industry, sum_insured, family_covered, parents_covered, maternity_covered, gym_membership, free_doctor_on_call, paid_leaves, flexible_work_timings, remote_option, name], function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve("true");
        });

    }

    /**
     * create the company  of given company details into DB
     * 
     * @param  {Function} resolve to be resolved 
     * @param  {Function} reject to be rejected if error occurs
     * @param  {Object} parameter object
     */
    createCompany(resolve, reject, { name, website, number_of_employees, funding_stage, industry, sum_insured, family_covered, parents_covered, maternity_covered, gym_membership, free_doctor_on_call, paid_leaves, flexible_work_timings, remote_option }) {

        var sql = 'INSERT INTO company ( name, website, number_of_employees, funding_stage, industry, sum_insured, family_covered, parents_covered, maternity_covered, gym_membership, free_doctor_on_call, paid_leaves, flexible_work_timings, remote_option) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
        this.database.query(sql, [name, website, number_of_employees, funding_stage, industry, sum_insured, family_covered, parents_covered, maternity_covered, gym_membership, free_doctor_on_call, paid_leaves, flexible_work_timings, remote_option], function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(result);
        });

    }

    /**
     * create the user with given user details into DB
     * 
     * @param  {Function} resolve to be resolved 
     * @param  {Function} reject to be rejected if error occurs
     * @param  {Object} parameter object
     */
    createUser(resolve, reject, { name, email, company }) {

        var sql = 'INSERT INTO user (name, email, company) VALUES (?,?,?);'
        this.database.query(sql, [name, email, company], function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(result);
        });

    }

    /**
     * check the user is present in DB
     * 
     * @param  {Function} resolve to be resolved 
     * @param  {Function} reject to be rejected if error occurs
     * @param  {Object} parameter object
     */
    checkUser(resolve, reject, { name }) {

        var sql = 'SELECT * FROM   user where name= (?);'
        this.database.query(sql, [name], function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(result);
        });

    }

    /**
     * check the email  is already present in DB
     * 
     * @param  {Function} resolve to be resolved 
     * @param  {Function} reject to be rejected if error occurs
     * @param  {Object} parameter object
     */
    checkEmail(resolve, reject, { email }) {

        var sql = 'SELECT * FROM   user where email= (?);'
        this.database.query(sql, [email], function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(result);
        });

    }

    /**
     * check the website is already present in DB
     * 
     * @param  {Function} resolve to be resolved 
     * @param  {Function} reject to be rejected if error occurs
     * @param  {Object} parameter object
     */
    checkWebsite(resolve, reject, { website }) {

        var sql = 'SELECT * FROM   company where website= (?);'
        this.database.query(sql, [website], function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(result);
        });

    }

    /**
     * check the company name is already present in DB
     * 
     * @param  {Function} resolve to be resolved 
     * @param  {Function} reject to be rejected if error occurs
     * @param  {Object} parameter object
     */
    checkCompany(resolve, reject, { name }) {
        console.log(name);
        var sql = 'SELECT * FROM   company where name= (?);'
        this.database.query(sql, [name], function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(result);
        });

    }
}


module.exports = new Database();