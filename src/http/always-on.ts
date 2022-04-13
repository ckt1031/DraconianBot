import axios from 'axios';
import schedule from 'node-schedule';

export default () => {
  const port = process.env.PORT;
  schedule.scheduleJob('*/3 * * * *', () => {
    axios.get(`http://localhost:${port}`).catch(() => {});
  });
};
