import CrudRepository from "../../../utils/crudClass.js";
import UserWorkerModel from "../Models/user.models.js";

class UserRepository extends CrudRepository{
   constructor(){
    super(UserWorkerModel)
   }

}

export default UserRepository;