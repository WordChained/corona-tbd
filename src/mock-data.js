import axios from 'axios'

const getMockData_daily = () => {
    return {
        morbid: {
            serious: {
                critical: 57,
                connectedToEcmo: 6,
                respirated: 50,
                total: 115
            },
            medium: 31,
            light: 223,
            active: {
                total: 18015,
                fromMidnight: -1378, //relative to yesterday
                hospitalized: 352
            }
        },
        confirmed: {
            totalToday: 2107,
            fromMidnight: 409,
            total: 4097175,
        },
        active: {
            fromMidnight: -1378, //relative number to what it was in midnight,
            currentlyInHospital: 352
        },
        vaccinated: {
            shot_1: 6708172,
            shot_2: 6137909,
            shot_3: 4490607,
            shot_4: 806266,
        },
        deceased: {
            total: 10749
        },
        tested: {
            positive_percent: 5.66,
            primaryTestsTotal: 35571,
            total: 40065
        },
        isolated: {
            new: 25815,
            currentlyIsolated: 22579
        },
        hospitalized: {

        }
    }
}
const getMockData_weekly = () => {
    return {
        morbid: {
            serious: {
                totalPast7Days: 57,
                relativeToPast7Days_percent: 36.6 // percent relative to the avg of the past 7 days
            }
        },
        confirmed: {
            totalPast7Days: 15754,
            relativeToPast7Days_percent: 9.6 // percent relative to the avg of the past 7 days
        },
        deceased: {
            totalPast7Days: 3,
            relativeToPast7Days_percent: -87.5 // percent relative to the avg of the past 7 days
        },
        tested: {
            totalPast7Days: 355380,
            relativeToPast7Days_percent: 18.6, // percent relative to the avg of the past 7 days
            positive_percent: 4.4 // the positive results percent out of all the tests
        }
    }
}



//this is the logic of a single person, to be used in the back and in the admin page

// const getMockMorbidPeople = (num) => {
//     const morbidPeople = []
//     for (let i = 0; i < num; i++) {
//         morbidPeople.push(createMockMorbidPerson())
//     }
//     return morbidPeople
// }
// const createMockMorbidPerson = () => {
//     return {

//     }
// }
// const getRandomPerson = async () => {
//     try {
//         const user = await axios.get('https://randomuser.me/api/')
//         return user.data.results[0]
//     } catch (error) {
//         console.log('getRandomPerson Error: ', error)
//     }
// }

export const MOCK_DATA = {
    getMockData_daily,
    getMockData_weekly
}