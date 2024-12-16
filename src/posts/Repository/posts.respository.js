import CrudRepository from "../../../utils/crudClass.js";
import {JobPostModel} from "../../databaseRelations.js";


class PostsRespository extends CrudRepository {
    constructor(){
        super(JobPostModel)
    }
}

export default PostsRespository;