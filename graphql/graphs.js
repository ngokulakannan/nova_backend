// imports
const graphql = require("graphql");
const db = require("../datastore/database");
db.create_database()

// User graphql user defined type
const UserType = new graphql.GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        email: { type: graphql.GraphQLString },
        company: { type: graphql.GraphQLString }
    }
});

// Company graphql user defined type
const CompanyType = new graphql.GraphQLObjectType({
    name: "Company",
    fields: {
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        website: { type: graphql.GraphQLString },
        number_of_employees: { type: graphql.GraphQLInt },
        funding_stage: { type: graphql.GraphQLString },
        industry: { type: graphql.GraphQLString },
        sum_insured: { type: graphql.GraphQLInt },
        family_covered: { type: graphql.GraphQLBoolean },
        parents_covered: { type: graphql.GraphQLBoolean },
        maternity_covered: { type: graphql.GraphQLBoolean },
        gym_membership: { type: graphql.GraphQLBoolean },
        free_doctor_on_call: { type: graphql.GraphQLBoolean },
        paid_leaves: { type: graphql.GraphQLInt },
        flexible_work_timings: { type: graphql.GraphQLBoolean },
        remote_option: { type: graphql.GraphQLBoolean },


    }
});


// Query graphql user defined type
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        // query to get company list
        companies: {
            type: graphql.GraphQLList(CompanyType),
            resolve: (root, args, context, info) => {
                return new Promise((resolve, reject) => {

                    db.getCompanyList(resolve, reject) // DB call

                });


            }
        },
        // query to get a company dateils
        company: {
            type: graphql.GraphQLList(CompanyType),

            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: (root, { id }, context, info) => {
                return new Promise((resolve, reject) => {

                    db.getCompany(resolve, reject, { id }) // DB call
                });
            }
        },
        // query to get a competitor dateils
        competitors: {
            type: graphql.GraphQLList(CompanyType),
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: (root, { id }, context, info) => {
                return new Promise((resolve, reject) => {

                    db.getCompetitorsList(resolve, reject, { id }) // DB call

                });


            }
        },
        // Query to check if user is present
        checkUser: {
            type: graphql.GraphQLList(UserType),
            args: {
                name: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
            },
            resolve: (root, { name }, context, info) => {
                return new Promise((resolve, reject) => {

                    db.checkUser(resolve, reject, { name }) // DB call

                });
            }
        },
        // Query to check if email is present
        checkEmail: {
            type: graphql.GraphQLList(UserType),
            args: {

                email: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            resolve: (root, { email }, context, info) => {
                return new Promise((resolve, reject) => {

                    db.checkEmail(resolve, reject, { email }) // DB call

                });


            }
        },
        // Query to check if website is present
        checkWebsite: {
            type: graphql.GraphQLList(CompanyType),
            args: {

                website: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            resolve: (root, { website }, context, info) => {
                return new Promise((resolve, reject) => {

                    db.checkWebsite(resolve, reject, { website }) // DB call

                });
            }
        },
        // Query to check if company name is present
        checkCompany: {
            type: graphql.GraphQLList(CompanyType),
            args: {

                name: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
            },
            resolve: (root, { name }, context, info) => {
                return new Promise((resolve, reject) => {

                    db.checkCompany(resolve, reject, { name }) // DB call

                });


            }
        },

    }
});


// Mutation graphql user defined type
var mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {

        // Mutation to create new user
        createUser: {
            type: UserType,
            args: {
                name: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                email: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                company: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            resolve: (root, { name, email, company }) => {
                return new Promise((resolve, reject) => {
                    db.createUser(resolve, reject, { name, email, company }) // DB call

                })
            }
        },

        // Mutation to create new company
        createCompany: {
            type: UserType,
            args: {
                name: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                website: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                number_of_employees: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLInt)
                },
                funding_stage: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                industry: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                sum_insured: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLInt)
                },
                family_covered: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                parents_covered: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                maternity_covered: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                gym_membership: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                free_doctor_on_call: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                paid_leaves: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLInt)
                },
                flexible_work_timings: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                remote_option: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },

            },
            resolve: (root, { name, website, number_of_employees, funding_stage, industry, sum_insured, family_covered, parents_covered, maternity_covered, gym_membership, free_doctor_on_call, paid_leaves, flexible_work_timings, remote_option }) => {
                return new Promise((resolve, reject) => {

                    db.createCompany(resolve, reject, { name, website, number_of_employees, funding_stage, industry, sum_insured, family_covered, parents_covered, maternity_covered, gym_membership, free_doctor_on_call, paid_leaves, flexible_work_timings, remote_option }) // DB call


                })
            }
        },

        // Mutation to update company
        updateCompany: {
            type: graphql.GraphQLString,
            args: {
                name: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },

                number_of_employees: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLInt)
                },
                funding_stage: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                industry: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                sum_insured: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLInt)
                },
                family_covered: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                parents_covered: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                maternity_covered: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                gym_membership: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                free_doctor_on_call: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                paid_leaves: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLInt)
                },
                flexible_work_timings: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                },
                remote_option: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean)
                }
            },
            resolve: (root, { name, number_of_employees, funding_stage, industry, sum_insured, family_covered, parents_covered, maternity_covered, gym_membership, free_doctor_on_call, paid_leaves, flexible_work_timings, remote_option }) => {
                console.log(name)
                return new Promise((resolve, reject) => {
                    console.log(name)
                    db.updateCompany(resolve, reject, { name, number_of_employees, funding_stage, industry, sum_insured, family_covered, parents_covered, maternity_covered, gym_membership, free_doctor_on_call, paid_leaves, flexible_work_timings, remote_option }) // DB call

                })
            }

        },

    }
});

const schema = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

module.exports = schema