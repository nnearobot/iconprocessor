import { Router } from 'express';
import jobController from '../controllers/jobController';

const jobRouter = Router();


// fetching a job list
jobRouter.get('/', jobController.getJobList);


// fetching a status of particular job
jobRouter.get('/:id', jobController.getJobStatus);
  

// remove the job
jobRouter.delete('/:id', jobController.removeJob);



export default jobRouter;