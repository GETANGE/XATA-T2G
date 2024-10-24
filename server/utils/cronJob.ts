// implementing cron jobs
import cron from 'node-cron';
import { getXataClient } from './../src/xata';

const xata = getXataClient();

let lastCheckedTime = new Date();

export const setUpcronJobs =() =>{
    cron.schedule('* * * * *', async () => {
        console.log('Checking for new data...');
            
        try {
            // Ensure lastCheckedTime is a Date object
            const lastCheckedTimeDate = lastCheckedTime instanceof Date ? lastCheckedTime : new Date(lastCheckedTime);

            // Fetch records created after the last checked time using filter
            const newData = await xata.db.Teams
                .filter({ 'xata_createdat': { $gt: lastCheckedTimeDate } }) // Use $gt with Date object
                .getMany();

            if (newData.length > 0) {
                console.log('New data found:', newData);
                // push the new data as a notification via firebase push notifications.
            }
        
            // Update the lastCheckedTime to the most recent `createdAt` value from the fetched data
                lastCheckedTime = new Date();
            } catch (error) {
                console.error('Error fetching new data:', error);
            }
        })
}