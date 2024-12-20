import { ApiError } from "../../../utils/ApiError.js";
import CrudRepository from "../../../utils/crudClass.js";
import {JobApplication} from '../../databaseRelations.js'




class JobRespository extends CrudRepository {
    constructor(){
        super(JobApplication)
    }

    async checkIfAlreadyApplied(userId, jobId) {
        try {
            const application = await this.model.findOne({
                where: {
                    userId: userId,
                    jobId: jobId,
                }
            });
            return application;  // Returns null if not found
        } catch (error) {
            throw new ApiError(500, 'Error checking application status', error);
        }
    }
}

export default JobRespository;