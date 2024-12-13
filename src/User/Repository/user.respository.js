import CrudRepository from "../../../utils/crudClass.js";
import {UserWorkerModel} from "../../databaseRelations.js";

class UserRepository extends CrudRepository{
   constructor(){
    super(UserWorkerModel)
   }

}

export default UserRepository;